from rest_framework import serializers
from .models import ClassOffering, ContactMessage, Feature, SiteContent, BlogPost, BlogCategory


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'order']


class ClassOfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassOffering
        fields = ['id', 'name', 'description', 'schedule', 'order']


class SiteContentSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True, source='feature_set')
    classes = ClassOfferingSerializer(many=True, read_only=True, source='classoffering_set')

    class Meta:
        model = SiteContent
        fields = [
            'studio_name',
            'hero_title',
            'hero_subtitle',
            'home_intro',
            'about_title',
            'about_body',
            'contact_email',
            'contact_phone',
            'contact_address',
            'opening_hours',
            'features',
            'classes',
            'hero_image',
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug']

class BlogPostSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'image',
                  'is_published', 'published_at', 'category']