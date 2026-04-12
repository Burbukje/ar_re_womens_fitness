from django.contrib import admin
from .models import ClassOffering, ContactMessage, Feature, SiteContent, BlogCategory, BlogPost


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('studio_name', 'contact_email', 'updated_at')


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    ordering = ('order',)


@admin.register(ClassOffering)
class ClassOfferingAdmin(admin.ModelAdmin):
    list_display = ('name', 'schedule', 'order')
    ordering = ('order',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_published', 'published_at']
    list_filter = ['is_published', 'category']
    search_fields = ['title', 'excerpt']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')