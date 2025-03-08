from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


# User Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get the authenticated user's profile"""
    try:
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

# Profile Views
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    """Get or update the authenticated user's profile"""
    try:
        profile = Profile.objects.get(user=request.user)
        
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

# CandidateProfile Views
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def candidate_profile_detail(request):
    """Get or update the candidate profile for the authenticated user"""
    try:
        profile = Profile.objects.get(user=request.user)
        candidate_profile, created = CandidateProfile.objects.get_or_create(profile=profile)
        
        if request.method == 'GET':
            serializer = CandidateProfileSerializer(candidate_profile)
            return Response(serializer.data)
        
        elif request.method == 'PUT':
            serializer = CandidateProfileSerializer(candidate_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

# RecruiterProfile Views
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def recruiter_profile_detail(request):
    """Get or update the recruiter profile for the authenticated user"""
    try:
        profile = Profile.objects.get(user=request.user)
        recruiter_profile, created = RecruiterProfile.objects.get_or_create(profile=profile)
        
        if request.method == 'GET':
            serializer = RecruiterProfileSerializer(recruiter_profile)
            return Response(serializer.data)
        
        elif request.method == 'PUT':
            serializer = RecruiterProfileSerializer(recruiter_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

# Skill Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def skill_list(request):
    """List all skills or create a new skill"""
    if request.method == 'GET':
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def skill_detail(request, pk):
    """Retrieve, update or delete a skill"""
    skill = get_object_or_404(Skill, pk=pk)
    
    if request.method == 'GET':
        serializer = SkillSerializer(skill)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SkillSerializer(skill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# JobCategory Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def job_category_list(request):
    """List all job categories or create a new job category"""
    if request.method == 'GET':
        categories = JobCategory.objects.all()
        serializer = JobCategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = JobCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def job_category_detail(request, pk):
    """Retrieve, update or delete a job category"""
    category = get_object_or_404(JobCategory, pk=pk)
    
    if request.method == 'GET':
        serializer = JobCategorySerializer(category)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = JobCategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# JobOpportunity Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def job_opportunity_list(request):
    """List all job opportunities or create a new job opportunity"""
    if request.method == 'GET':
        # Filter by recruiter if the user is a recruiter
        try:
            profile = Profile.objects.get(user=request.user)
            if profile.role == 'recruiter':
                jobs = JobOpportunity.objects.filter(recruiter=request.user)
            else:
                # For candidates, show all published jobs
                jobs = JobOpportunity.objects.filter(status='published')
        except Profile.DoesNotExist:
            jobs = JobOpportunity.objects.filter(status='published')
            
        serializer = JobOpportunitySerializer(jobs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Ensure the authenticated user is set as the recruiter
        data = request.data.copy()
        data['recruiter'] = request.user.id
        
        serializer = JobOpportunitySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import JobOpportunity
from .serializers import JobOpportunitySerializer

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def job_opportunity_detail(request, job_id):
    """Retrieve, update, or delete a job opportunity"""

    # Fetch job with the given ID
    job = get_object_or_404(JobOpportunity, id=job_id)

    # Check if the user is the recruiter who created the job (before modifying)
    if request.method in ['PUT', 'DELETE'] and job.recruiter != request.user:
        return Response({'error': 'You do not have permission to perform this action'},
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        serializer = JobOpportunitySerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        serializer = JobOpportunitySerializer(job)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# CandidateApplication Views
from django.db.models import Count

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def candidate_application_list(request):
    """List all applications for the authenticated user or create a new application"""
    if request.method == 'GET':
        try:
            profile = Profile.objects.get(user=request.user)
            if profile.role == 'recruiter':
                # Get jobs posted by this recruiter
                recruiter_jobs = JobOpportunity.objects.filter(recruiter=request.user).values_list('id', flat=True)
                applications = CandidateApplication.objects.filter(job_id__in=recruiter_jobs)
            else:
                # For candidates, show their own applications
                applications = CandidateApplication.objects.filter(candidate=request.user)
                
            serializer = CandidateApplicationSerializer(applications, many=True)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        # Ensure the authenticated user is set as the candidate
        data = request.data.copy()
        data['candidate'] = request.user.id
        
        serializer = CandidateApplicationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            
            # Create initial status history entry
            ApplicationStatusHistory.objects.create(
                application_id=serializer.data['id'],
                status='applied',
                updated_by=request.user
            )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def candidate_application_detail(request, pk):
    """Retrieve, update or delete an application"""
    application = get_object_or_404(CandidateApplication, pk=pk)
    
    # Check permissions
    if request.method in ['PUT', 'DELETE']:
        if application.candidate != request.user and application.job.recruiter != request.user:
            return Response({'error': 'You do not have permission to perform this action'},
                            status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        # Check if the user is either the candidate or the recruiter
        if application.candidate != request.user and application.job.recruiter != request.user:
            return Response({'error': 'You do not have permission to view this application'},
                            status=status.HTTP_403_FORBIDDEN)
            
        serializer = CandidateApplicationSerializer(application)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        old_status = application.status
        serializer = CandidateApplicationSerializer(application, data=request.data, partial=True)
        
        if serializer.is_valid():
            application = serializer.save()
            
            # Create status history entry if status changed
            if 'status' in request.data and old_status != application.status:
                ApplicationStatusHistory.objects.create(
                    application=application,
                    status=application.status,
                    updated_by=request.user
                )
                
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Test Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def test_list(request):
    """List all tests or create a new test"""
    if request.method == 'GET':
        # For recruiters, show their created tests
        # For candidates, show tests for jobs they've applied to
        try:
            profile = Profile.objects.get(user=request.user)
            if profile.role == 'recruiter':
                tests = Test.objects.filter(created_by=request.user)
            else:
                # Get jobs the candidate has applied to
                applications = CandidateApplication.objects.filter(candidate=request.user)
                job_ids = applications.values_list('job_id', flat=True)
                tests = Test.objects.filter(job_id__in=job_ids)
                
            serializer = TestSerializer(tests, many=True)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        # Ensure the authenticated user is set as the creator
        data = request.data.copy()
        data['created_by'] = request.user.id
        
        serializer = TestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def test_detail(request, pk):
    """Retrieve, update or delete a test"""
    test = get_object_or_404(Test, pk=pk)
    
    # Check permissions for modifying tests
    if request.method in ['PUT', 'DELETE'] and test.created_by != request.user:
        return Response({'error': 'You do not have permission to perform this action'},
                        status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        # For GET, check if user is creator or a candidate with access
        if test.created_by == request.user:
            serializer = TestSerializer(test)
            return Response(serializer.data)
        
        # Check if test is for a job the candidate has applied to
        if test.job and CandidateApplication.objects.filter(job=test.job, candidate=request.user).exists():
            serializer = TestSerializer(test)
            return Response(serializer.data)
        
        return Response({'error': 'You do not have permission to view this test'},
                        status=status.HTTP_403_FORBIDDEN)
    
    elif request.method == 'PUT':
        serializer = TestSerializer(test, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Question Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def question_list(request, test_id):
    """List all questions for a test or create a new question"""
    test = get_object_or_404(Test, pk=test_id)
    
    if request.method == 'GET':
        # Check permissions
        if test.created_by != request.user:
            # Check if user is a candidate with access to this test
            if not (test.job and CandidateApplication.objects.filter(job=test.job, candidate=request.user).exists()):
                return Response({'error': 'You do not have permission to view these questions'},
                                status=status.HTTP_403_FORBIDDEN)
        
        questions = Question.objects.filter(test=test).order_by('order')
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Only test creator can add questions
        if test.created_by != request.user:
            return Response({'error': 'You do not have permission to add questions to this test'},
                            status=status.HTTP_403_FORBIDDEN)
        
        # Add test_id to the request data
        data = request.data.copy()
        data['test'] = test_id
        
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def question_detail(request, test_id, pk):
    """Retrieve, update or delete a question"""
    test = get_object_or_404(Test, pk=test_id)
    question = get_object_or_404(Question, pk=pk, test=test)
    
    # Check permissions for modifying questions
    if request.method in ['PUT', 'DELETE'] and test.created_by != request.user:
        return Response({'error': 'You do not have permission to perform this action'},
                        status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        # For GET, check if user is creator or a candidate with access
        if test.created_by == request.user:
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        
        # Check if test is for a job the candidate has applied to
        if test.job and CandidateApplication.objects.filter(job=test.job, candidate=request.user).exists():
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        
        return Response({'error': 'You do not have permission to view this question'},
                        status=status.HTTP_403_FORBIDDEN)
    
    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TestSession Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_test_session(request, test_id):
    """Start a new test session for a candidate"""
    test = get_object_or_404(Test, pk=test_id)
    
    # Check if candidate has applied to the job (if job-related test)
    if test.job:
        application = get_object_or_404(CandidateApplication, job=test.job, candidate=request.user)
        
        # Create a new test session
        session = TestSession.objects.create(
            candidate=request.user,
            test=test,
            application=application
        )
    else:
        # For self-assessment tests
        session = TestSession.objects.create(
            candidate=request.user,
            test=test
        )
    
    serializer = TestSessionSerializer(session)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def complete_test_session(request, session_id):
    """Mark a test session as completed"""
    session = get_object_or_404(TestSession, pk=session_id, candidate=request.user)
    
    if session.is_completed:
        return Response({'error': 'This test session is already completed'},
                        status=status.HTTP_400_BAD_REQUEST)
    
    session.is_completed = True
    session.completed_at = timezone.now()
    session.save()
    
    serializer = TestSessionSerializer(session)
    return Response(serializer.data)

# Answer Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_answer(request):
    """Submit an answer for a question"""
    # Ensure the authenticated user is set as the candidate
    data = request.data.copy()
    data['candidate'] = request.user.id
    
    # Check if the session exists and belongs to the user
    session_id = request.data.get('session_id')
    if not session_id:
        return Response({'error': 'Session ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    session = get_object_or_404(TestSession, pk=session_id, candidate=request.user)
    
    # Get the question
    question_id = request.data.get('question')
    if not question_id:
        return Response({'error': 'Question ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    question = get_object_or_404(Question, pk=question_id, test=session.test)
    
    # Create or update the answer
    try:
        answer = Answer.objects.get(question=question, candidate=request.user, application=session.application)
        serializer = AnswerSerializer(answer, data=data, partial=True)
    except Answer.DoesNotExist:
        serializer = AnswerSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Interview Views
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def interview_list(request):
    """List interviews or create a new interview"""
    if request.method == 'GET':
        try:
            profile = Profile.objects.get(user=request.user)
            if profile.role == 'recruiter':
                # Get interviews where the recruiter is the interviewer
                interviews = Interview.objects.filter(interviewer=request.user)
            else:
                # For candidates, get interviews for their applications
                applications = CandidateApplication.objects.filter(candidate=request.user)
                interviews = Interview.objects.filter(application__in=applications)
                
            serializer = InterviewSerializer(interviews, many=True)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'POST':
        # Only recruiters can create interviews
        try:
            profile = Profile.objects.get(user=request.user)
            if profile.role != 'recruiter':
                return Response({'error': 'Only recruiters can create interviews'},
                                status=status.HTTP_403_FORBIDDEN)
            
            data = request.data.copy()
            data['interviewer'] = request.user.id
            
            serializer = InterviewSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def interview_detail(request, pk):
    """Retrieve, update or delete an interview"""
    interview = get_object_or_404(Interview, pk=pk)
    
    # Check permissions
    if request.method == 'GET':
        # Check if user is interviewer or candidate
        if interview.interviewer != request.user and interview.application.candidate != request.user:
            return Response({'error': 'You do not have permission to view this interview'},
                            status=status.HTTP_403_FORBIDDEN)
    elif request.method in ['PUT', 'DELETE']:
        # Only interviewer can modify or delete
        if interview.interviewer != request.user:
            return Response({'error': 'You do not have permission to perform this action'},
                            status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        serializer = InterviewSerializer(interview)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = InterviewSerializer(interview, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        interview.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Notification Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification_list(request):
    """List notifications for the authenticated user"""
    notifications = Notification.objects.filter(user=request.user)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, pk):
    """Mark a notification as read"""
    notification = get_object_or_404(Notification, pk=pk, user=request.user)
    notification.is_read = True
    notification.save()
    serializer = NotificationSerializer(notification)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_notification(request, pk):
    """Delete a notification"""
    notification = get_object_or_404(Notification, pk=pk, user=request.user)
    notification.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


from .utils import scan_resume
VALID_SKILLS = {
    "python", "java", "c++", "javascript", "machine learning", "deep learning", 
    "django", "flask", "sql", "data analysis", "data science", "tensorflow",
    "pytorch", "nlp", "opencv", "git", "react", "angular", "docker", "kubernetes"
}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def extract_resume_skills(request):
    """
    Extracts skills, email, and phone from a resume image and adds only valid skills to the candidate's profile.
    """
    try:
        profile = Profile.objects.get(user=request.user)
        if profile.role != 'candidate':
            return Response({'error': 'Only candidates can upload resumes for skill extraction'},
                            status=status.HTTP_403_FORBIDDEN)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        candidate_profile = CandidateProfile.objects.get(profile=profile)
    except CandidateProfile.DoesNotExist:
        return Response({'error': 'Candidate profile not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ResumeUploadSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    resume_image = serializer.validated_data['resume_image']

    try:
        # Call ML function to extract skills, email, and phone
        extracted_data = scan_resume(resume_image)  
        extracted_skills = extracted_data.get("skills", [])
        extracted_email = extracted_data.get("email", "")
        extracted_phone = extracted_data.get("phone", "")

        # Filter extracted skills
        filtered_skills = set()
        for skill in extracted_skills:
            skill = skill.strip().lower()
            if skill in VALID_SKILLS:
                filtered_skills.add(skill)

        # Add new skills to candidate profile
        added_skills = []
        for skill_name in filtered_skills:
            skill, created = Skill.objects.get_or_create(name=skill_name)
            if skill not in candidate_profile.skills.all():
                candidate_profile.skills.add(skill)
                added_skills.append(skill_name)

        candidate_profile.save()

        response_data = {
            'message': 'Successfully processed resume',
            'email': extracted_email,
            'phone': extracted_phone,
            'new_skills': added_skills,
            'current_skills': [skill.name for skill in candidate_profile.skills.all()]
        }

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error processing resume: {str(e)}")
        
        return Response({
            'error': 'Failed to process resume',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
