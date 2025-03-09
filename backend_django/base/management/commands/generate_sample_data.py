from django.core.management.base import BaseCommand
from base.models import Job, Course

class Command(BaseCommand):
    help = 'Generate sample jobs and courses'

    def handle(self, *args, **kwargs):
        Job.objects.create(title="Data Analyst", description="Analyze company data trends.")
        Job.objects.create(title="ML Engineer", description="Build machine learning models.")
        Job.objects.create(title="Business Engineer", description="Bridge business and tech.")

        Course.objects.create(title="Web Development", description="Learn HTML, CSS, JS", level="Beginner")
        Course.objects.create(title="Marketing Strategies", description="Improve your marketing skills", level="Beginner")
        Course.objects.create(title="Data Structures", description="Learn algorithms and DS", level="Beginner")

        self.stdout.write(self.style.SUCCESS('Sample data created!'))
