from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings

from .models import ClassOffering, ContactMessage, Feature, SiteContent, BlogPost
from .serializers import (
    ClassOfferingSerializer,
    ContactMessageSerializer,
    FeatureSerializer,
    SiteContentSerializer,
    BlogPostSerializer,
)


class SiteContentView(APIView):
    def get(self, request):
        site_content = SiteContent.objects.first()
        # if not site_content:
        #     site_content = SiteContent.objects.create()
        #     Feature.objects.bulk_create([
        #         Feature(title='Small Group Training', description='Build strength and confidence in a supportive group environment.', order=1),
        #         Feature(title='Personal Coaching', description='Get tailored coaching based on your goals, pace, and fitness level.', order=2),
        #         Feature(title='Recovery & Mobility', description='Improve movement quality and feel better inside and outside the studio.', order=3),
        #     ])
        #     ClassOffering.objects.bulk_create([
        #         ClassOffering(name='Strength Foundations', description='A beginner-friendly class focused on technique and total-body strength.', schedule='Mondays & Wednesdays · 6:00 PM', order=1),
        #         ClassOffering(name='Core & Conditioning', description='A low-impact conditioning session to boost energy and endurance.', schedule='Tuesdays · 6:30 PM', order=2),
        #         ClassOffering(name='Mobility Flow', description='Stretch, reset, and improve flexibility with guided mobility work.', schedule='Saturdays · 9:00 AM', order=3),
        #     ])
        serializer = SiteContentSerializer(site_content)
        return Response(serializer.data)


class FeatureListView(generics.ListAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer


class ClassOfferingListView(generics.ListAPIView):
    queryset = ClassOffering.objects.all()
    serializer_class = ClassOfferingSerializer


class ContactMessageCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_message = serializer.save()

        # Send email to your Gmail address
        try:
            send_mail(
                subject=f"New Contact Form Submission: {contact_message.subject}",
                message=f"""
You received a new message from the Ar-Re website contact form:

Name: {contact_message.name}
Email: {contact_message.email}
Subject: {contact_message.subject}

Message:
{contact_message.message}

---
Sent at: {contact_message.created_at}
                """.strip(),
                from_email=settings.DEFAULT_FROM_EMAIL,   
                recipient_list=["ar.re.fitness@gmail.com"],  
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Failed to send email: {e}")

        return Response(
            {'message': 'Thanks for reaching out. We will get back to you soon.'},
            status=status.HTTP_201_CREATED,
        )

class BlogPostList(generics.ListAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer

class BlogPostDetail(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'