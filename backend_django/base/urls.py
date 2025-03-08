from django.urls import path, include
from .views import *

urlpatterns = [
    path("auth/", include("base.oauth.urls")),
    path("get_user_profile/", get_user_profile, name="get_user_profile"),
    path("profile_detail/", profile_detail, name="profile_detail"),
    path("candidate_profile_detail/", candidate_profile_detail, name="candidate_profile_detail"),
    path("recruiter_profile_detail/", recruiter_profile_detail, name="recruiter_profile_detail"),
    path("skill_list/", skill_list, name="skill_list"),
    path("skill_detail/", skill_detail, name="skill_detail"),
    path("job_category_list/", job_category_list, name="job_category_list"),
    path("job_category_detail/", job_category_detail, name="job_category_detail"),
    path("job_opportunity_list/", job_opportunity_list, name="job_opportunity_list"),
    path("job_opportunity_detail/", job_opportunity_detail, name="job_opportunity_detail"),
    path("candidate_application_list/", candidate_application_list, name="candidate_application_list"),
    path("candidate_application_detail/", candidate_application_detail, name="candidate_application_detail"),
    path("test_list/", test_list, name="test_list"),
    path("test_detail/", test_detail, name="test_detail"),
    path("question_list/", question_list, name="question_list"),
    path("question_detail/", question_detail, name="question_detail"),
    path("start_test_session/", start_test_session, name="start_test_session"),
    path("complete_test_session/", complete_test_session, name="complete_test_session"),
    path("submit_answer/", submit_answer, name="submit_answer"),
    path("interview_list/", interview_list, name="interview_list"),
    path("interview_detail/", interview_detail, name="interview_detail"),
    path("notification_list/", notification_list, name="notification_list"),
    path("mark_notification_read/", mark_notification_read, name="mark_notification_read"),
    path("delete_notification/", delete_notification, name="delete_notification"),

    path('extract_resume_skills/', extract_resume_skills, name='extract_resume_skills'),
    path('generate-mcq/', generate_mcq, name='generate_mcq'),
    path("rank/", rank_candidates, name="rank_candidates"),
]
