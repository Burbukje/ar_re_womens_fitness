from django.urls import path
from .views import ClassOfferingListView, ContactMessageCreateView, FeatureListView, SiteContentView, BlogPostList, BlogPostDetail

urlpatterns = [
    path('site-content/', SiteContentView.as_view(), name='site-content'),
    path('features/', FeatureListView.as_view(), name='features'),
    path('classes/', ClassOfferingListView.as_view(), name='classes'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
    path('posts/', BlogPostList.as_view(), name='blog-list'),
    path('posts/<slug:slug>/', BlogPostDetail.as_view(), name='blog-detail'),
]
