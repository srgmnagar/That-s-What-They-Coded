from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Profile, CandidateProfile, RecruiterProfile, Skill, JobCategory,
    JobOpportunity, Test, Question, QuestionChoice, CandidateApplication,
    ApplicationStatusHistory, Answer, TestSession, TestResult, Interview,
    Notification
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        read_only_fields = ['id', 'username']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'user', 'role', 'bio', 'profile_picture', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class RecruiterProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = RecruiterProfile
        fields = ['id', 'profile', 'company', 'company_website', 'company_description', 'industry']
        read_only_fields = ['id']

class CandidateProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        source='skills',
        many=True,
        required=False
    )
    
    class Meta:
        model = CandidateProfile
        fields = ['id', 'profile', 'resume', 'skills', 'skill_ids', 'years_of_experience', 
                  'education', 'current_position', 'linkedin_profile', 'github_profile']
        read_only_fields = ['id']

class JobOpportunitySerializer(serializers.ModelSerializer):
    recruiter = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )
    recruiter_name = serializers.SerializerMethodField()
    required_skills = SkillSerializer(many=True, read_only=True)
    preferred_skills = SkillSerializer(many=True, read_only=True)
    categories = JobCategorySerializer(many=True, read_only=True)
    
    # Write-only fields for related objects
    required_skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        source='required_skills',
        many=True,
        required=False
    )
    preferred_skill_ids = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        write_only=True,
        source='preferred_skills',
        many=True,
        required=False
    )
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=JobCategory.objects.all(),
        write_only=True,
        source='categories',
        many=True,
        required=False
    )
    
    class Meta:
        model = JobOpportunity
        fields = ['id', 'title', 'slug', 'description', 'recruiter', 'recruiter_name', 'company', 
                  'location', 'remote', 'job_type', 'salary_min', 'salary_max',
                  'required_skills', 'required_skill_ids', 'preferred_skills', 'preferred_skill_ids',
                  'experience_years', 'categories', 'category_ids', 'application_deadline',
                  'created_at', 'last_updated_at']
        read_only_fields = ['id', 'created_at', 'last_updated_at']
    
    def get_recruiter_name(self, obj):
        if obj.recruiter:
            return f"{obj.recruiter.first_name} {obj.recruiter.last_name}".strip() or obj.recruiter.username
        return None

class QuestionChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionChoice
        fields = ['id', 'question', 'text', 'is_correct']
        read_only_fields = ['id']
        extra_kwargs = {
            'is_correct': {'write_only': True}  # Hide correct answers from candidates
        }

class QuestionSerializer(serializers.ModelSerializer):
    choices = QuestionChoiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'test', 'question_type', 'text', 'points', 'order', 'created_at', 'choices']
        read_only_fields = ['id', 'created_at']

class TestSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )
    created_by_name = serializers.SerializerMethodField()
    question_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Test
        fields = ['id', 'job', 'created_by', 'created_by_name', 'title', 'description', 
                  'test_type', 'is_auto_generated', 'time_limit_minutes', 'completed_in',
                  'created_at', 'updated_at', 'question_count']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_created_by_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}".strip() or obj.created_by.username
        return None
    
    def get_question_count(self, obj):
        return obj.questions.count()

class CandidateApplicationSerializer(serializers.ModelSerializer):
    candidate = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )
    candidate_name = serializers.SerializerMethodField()
    job_title = serializers.SerializerMethodField()
    status_history = serializers.SerializerMethodField()
    
    class Meta:
        model = CandidateApplication
        fields = ['id', 'candidate', 'candidate_name', 'status', 'job', 'job_title', 
                  'resume', 'applied_at', 'updated_at', 'status_history']
        read_only_fields = ['id', 'applied_at', 'updated_at']
    
    def get_candidate_name(self, obj):
        if obj.candidate:
            return f"{obj.candidate.first_name} {obj.candidate.last_name}".strip() or obj.candidate.username
        return None
    
    def get_job_title(self, obj):
        if obj.job:
            return obj.job.title
        return None
    
    def get_status_history(self, obj):
        history = obj.status_history.all().order_by('-created_at')
        return ApplicationStatusHistorySerializer(history, many=True).data

class ApplicationStatusHistorySerializer(serializers.ModelSerializer):
    updated_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = ApplicationStatusHistory
        fields = ['id', 'application', 'status', 'updated_by', 'updated_by_name', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_updated_by_name(self, obj):
        if obj.updated_by:
            return f"{obj.updated_by.first_name} {obj.updated_by.last_name}".strip() or obj.updated_by.username
        return None

class TestSessionSerializer(serializers.ModelSerializer):
    test_title = serializers.SerializerMethodField()
    
    class Meta:
        model = TestSession
        fields = ['id', 'candidate', 'test', 'test_title', 'application', 
                  'started_at', 'completed_at', 'is_completed']
        read_only_fields = ['id', 'started_at']
    
    def get_test_title(self, obj):
        if obj.test:
            return obj.test.title
        return None

class AnswerSerializer(serializers.ModelSerializer):
    selected_choices_ids = serializers.PrimaryKeyRelatedField(
        queryset=QuestionChoice.objects.all(),
        write_only=True,
        source='selected_choices',
        many=True,
        required=False
    )
    
    class Meta:
        model = Answer
        fields = ['id', 'question', 'candidate', 'application', 'answer_text',
                  'selected_choices', 'selected_choices_ids', 'score', 'feedback', 'submitted_at']
        read_only_fields = ['id', 'submitted_at', 'score', 'feedback']
        
    def to_representation(self, instance):
        # Handle permissions - don't show score and feedback to candidates until test is completed
        data = super().to_representation(instance)
        request = self.context.get('request')
        
        if request and request.user:
            # If user is the candidate and the test session is not completed
            if instance.candidate == request.user:
                test_session = TestSession.objects.filter(
                    candidate=request.user,
                    test=instance.question.test
                ).first()
                
                if test_session and not test_session.is_completed:
                    data.pop('score', None)
                    data.pop('feedback', None)
                    
        return data

class TestResultSerializer(serializers.ModelSerializer):
    test_title = serializers.SerializerMethodField()
    candidate_name = serializers.SerializerMethodField()
    
    class Meta:
        model = TestResult
        fields = ['id', 'candidate', 'candidate_name', 'test', 'test_title', 'application', 
                  'session', 'score', 'max_score', 'percentage', 'passed', 
                  'insights_data', 'feedback', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_test_title(self, obj):
        if obj.test:
            return obj.test.title
        return None
    
    def get_candidate_name(self, obj):
        if obj.candidate:
            return f"{obj.candidate.first_name} {obj.candidate.last_name}".strip() or obj.candidate.username
        return None

class InterviewSerializer(serializers.ModelSerializer):
    interviewer = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False
    )
    interviewer_name = serializers.SerializerMethodField()
    candidate_name = serializers.SerializerMethodField()
    job_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Interview
        fields = ['id', 'application', 'interviewer', 'interviewer_name', 'candidate_name',
                  'job_title', 'scheduled_at', 'duration_minutes', 'interview_type',
                  'status', 'meeting_link', 'meeting_notes', 'feedback', 'rating',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_interviewer_name(self, obj):
        if obj.interviewer:
            return f"{obj.interviewer.first_name} {obj.interviewer.last_name}".strip() or obj.interviewer.username
        return None
    
    def get_candidate_name(self, obj):
        if obj.application and obj.application.candidate:
            candidate = obj.application.candidate
            return f"{candidate.first_name} {candidate.last_name}".strip() or candidate.username
        return None
    
    def get_job_title(self, obj):
        if obj.application and obj.application.job:
            return obj.application.job.title
        return None
    
    def to_representation(self, instance):
        # Handle permissions - candidates shouldn't see feedback and rating
        data = super().to_representation(instance)
        request = self.context.get('request')
        
        if request and request.user:
            # If user is the candidate
            if instance.application.candidate == request.user:
                data.pop('feedback', None)
                data.pop('rating', None)
                
        return data

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'title', 'message', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']



class ResumeUploadSerializer(serializers.Serializer):
    resume_image = serializers.ImageField(required=True)
    
    def validate_resume_image(self, value):
        """
        Validate that the uploaded file is an image and within size limits
        """
        # Check file size (limit to 5MB)
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Image file too large (max 5MB)")
            
        # Check file type
        allowed_types = ['image/jpeg', 'image/png', 'image/tiff', 'image/bmp']
        if value.content_type not in allowed_types:
            raise serializers.ValidationError(
                f"Unsupported file type. Allowed types: {', '.join(allowed_types)}"
            )
            
        return value
        
class ExtractedSkillsSerializer(serializers.Serializer):
    """Serializer for the response from the skill extraction endpoint"""
    message = serializers.CharField()
    new_skills = serializers.ListField(child=serializers.CharField())
    current_skills = serializers.ListField(child=serializers.CharField())