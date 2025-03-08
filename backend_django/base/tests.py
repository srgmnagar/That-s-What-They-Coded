from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from base.models import Candidate  # Replace 'myapp' with your actual app name
from base.serializers import CandidateSerializer  # Adjust as needed
import numpy as np

class RankCandidatesTest(APITestCase):
    def setUp(self):
        """Create test candidates"""
        self.candidates = [
            Candidate.objects.create(test_score=85, total_time=120, total_easy=10, total_medium=5, total_hard=2, query_group=1),
            Candidate.objects.create(test_score=90, total_time=110, total_easy=12, total_medium=6, total_hard=3, query_group=1),
            Candidate.objects.create(test_score=75, total_time=150, total_easy=8, total_medium=4, total_hard=1, query_group=2),
            Candidate.objects.create(test_score=80, total_time=140, total_easy=9, total_medium=5, total_hard=2, query_group=2),
        ]

    def test_rank_candidates(self):
        """Test ranking API"""
        response = self.client.get("/rank/")  # Adjust the URL if needed
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        ranked_candidates = response.data.get("ranked_candidates", [])
        self.assertTrue(len(ranked_candidates) > 0)

        # Ensure candidates are sorted in descending order of test_score
        scores = [c["test_score"] for c in ranked_candidates]
        self.assertTrue(scores == sorted(scores, reverse=True), "Candidates are not ranked correctly")

