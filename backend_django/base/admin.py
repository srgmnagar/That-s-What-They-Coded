from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Profile)
admin.site.register(CandidateProfile)
admin.site.register(RecruiterProfile)
admin.site.register(Skill)
admin.site.register(JobCategory)
admin.site.register(JobOpportunity)
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(QuestionChoice)
admin.site.register(CandidateApplication)
admin.site.register(ApplicationStatusHistory)
admin.site.register(Answer)
admin.site.register(TestSession)
admin.site.register(TestResult)
admin.site.register(Interview)