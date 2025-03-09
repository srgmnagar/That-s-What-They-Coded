from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

# Enhanced Profile Model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=(
        ("recruiter", "recruiter"),
        ("candidate", "candidate"),
    ))
    # Additional fields
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile ({self.role})"

# Candidate Profile Extensions
class CandidateProfile(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    skills = models.ManyToManyField('Skill', blank=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    education = models.TextField(blank=True)
    current_position = models.CharField(max_length=255, blank=True)
    linkedin_profile = models.URLField(blank=True)
    github_profile = models.URLField(blank=True)
    
    def __str__(self):
        return f"{self.profile.user.username}'s Candidate Profile"

# Recruiter Profile Extensions
class RecruiterProfile(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    company_website = models.URLField(blank=True)
    company_description = models.TextField(blank=True)
    industry = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.profile.user.username}'s Recruiter Profile"

# Skills Model
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

# Job Category Model
class JobCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

# Enhanced Job Opportunity Model
class JobOpportunity(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('closed', 'Closed'),
        ('filled', 'Filled'),
    )
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs_posted")
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    remote = models.BooleanField(default=False)
    job_type = models.CharField(max_length=100, choices=(
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ))
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    required_skills = models.ManyToManyField(Skill, related_name="jobs_requiring_skill")
    preferred_skills = models.ManyToManyField(Skill, related_name="jobs_preferring_skill", blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    categories = models.ManyToManyField(JobCategory, related_name="jobs")
    application_deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    # class Meta:
    #     ordering = ['-created_at']

# Enhanced Test Model
class Test(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assign test to user
    subject = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    num_questions = models.IntegerField()
    
    def __str__(self):
        job_title = self.job.title if self.job else 'Self Assessment'
        return f"{self.title} for {job_title}"




class Question(models.Model):
    test = models.ForeignKey(Test, related_name="questions", on_delete=models.CASCADE)
    question_text = models.TextField()

    
    def __str__(self):
        return f"Question: {self.text[:50]}"
    
    # class Meta:
    #     ordering = ['order']

# Question Choice Model
class QuestionChoice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Choice: {self.text} for {self.question.text[:30]}"

# Enhanced Candidate Application Model
class CandidateApplication(models.Model):
    STATUS_CHOICES = (
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('selected', 'Selected'),
        ('rejected', 'Rejected'),
    )
    
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    job = models.ForeignKey(JobOpportunity, on_delete=models.CASCADE, related_name="applications")
    resume = models.FileField(upload_to='application_resumes/', null=True, blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.candidate.username} applied for {self.job.title}"
    
    class Meta:
        unique_together = ('candidate', 'job')

# Application Status History
class ApplicationStatusHistory(models.Model):
    application = models.ForeignKey(CandidateApplication, on_delete=models.CASCADE, related_name="status_history")
    status = models.CharField(max_length=20, choices=CandidateApplication.STATUS_CHOICES)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.application.candidate.username} - {self.status} - {self.created_at}"

# Enhanced Answer Model
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers")
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    application = models.ForeignKey(CandidateApplication, on_delete=models.CASCADE, null=True, blank=True)
    answer_text = models.TextField(blank=True)
    selected_choices = models.ManyToManyField(QuestionChoice, blank=True)
    score = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Answer by {self.candidate.username} - Q: {self.question.text[:30]}"
    
    class Meta:
        unique_together = ('question', 'candidate', 'application')

# Test Session Model
class TestSession(models.Model):
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    application = models.ForeignKey(CandidateApplication, on_delete=models.CASCADE, null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Test session: {self.candidate.username} - {self.test.title}"

# Enhanced Test Result Model
class TestResult(models.Model):
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    application = models.ForeignKey(CandidateApplication, on_delete=models.CASCADE, null=True, blank=True)
    session = models.OneToOneField(TestSession, on_delete=models.CASCADE)
    score = models.FloatField()
    max_score = models.FloatField()
    percentage = models.FloatField()
    passed = models.BooleanField()
    insights_data = models.JSONField(default=dict)
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Result: {self.candidate.username} - Score: {self.score}/{self.max_score} ({self.percentage}%)"

# Interview Model
class Interview(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
        ('rescheduled', 'Rescheduled'),
    )
    
    application = models.ForeignKey(CandidateApplication, on_delete=models.CASCADE, related_name='interviews')
    interviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conducted_interviews')
    scheduled_at = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField()
    interview_type = models.CharField(max_length=100, choices=(
        ('phone', 'Phone'),
        ('video', 'Video'),
        ('in_person', 'In Person'),
    ))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    meeting_link = models.URLField(blank=True)
    meeting_notes = models.TextField(blank=True)
    feedback = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Interview: {self.application.candidate.username} - {self.scheduled_at}"

# Notification Model
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Notification for {self.user.username}: {self.title}"
    
    class Meta:
        ordering = ['-created_at']
        
class Candidate(models.Model):
    candidate_id = models.AutoField(primary_key=True)
    test_score = models.FloatField()
    total_time = models.FloatField()
    total_easy = models.IntegerField()
    total_medium = models.IntegerField()
    total_hard = models.IntegerField()
    query_group = models.IntegerField()