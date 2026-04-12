from django.db import models
from django.utils.text import slugify
from django.urls import reverse


class SiteContent(models.Model):
    studio_name = models.CharField(max_length=200, default="Ar-Re Women's Fitness")
    hero_title = models.CharField(max_length=255, default='Strong Women. Supportive Space. Real Results.')
    hero_image = models.ImageField(
        upload_to='hero/', 
        blank=True, 
        null=True,
        help_text="Main hero image for the homepage"
    )
    hero_subtitle = models.TextField(default='A welcoming fitness studio designed for women who want to move confidently, feel healthier, and build lasting strength.')
    hero_image = models.ImageField(upload_to='site/', null=True, blank=True)
    home_intro = models.TextField(default='At Ar-Re Women\'s Fitness, we focus on strength, mobility, community, and sustainable routines that fit real life.')
    about_title = models.CharField(max_length=255, default='About Ar-Re')
    about_body = models.TextField(default='Ar-Re Women\'s Fitness is a modern fitness studio built for women of all experience levels. We believe movement should feel empowering, accessible, and personal.')
    contact_email = models.EmailField(default='ar.re.fitness@gmail.com')
    contact_phone = models.CharField(max_length=50, default='+389 71 742 874')
    contact_address = models.CharField(max_length=255, default='Rr. Kiro Kistoski DRNC nr. 39, Tetovo')
    opening_hours = models.CharField(max_length=255, default='Mon-Fri: 10:00 - 22:00 | Sat: 10:00 - 16:00')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Content'
        verbose_name_plural = 'Site Content'

    def __str__(self):
        return self.studio_name


class Feature(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class ClassOffering(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    schedule = models.CharField(max_length=150, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.subject}'

class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)   # ← This line was missing or removed

    category = models.ForeignKey(
        BlogCategory, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='posts'
    )
    
    excerpt = models.TextField(help_text="Short summary shown on blog listing")
    content = models.TextField(help_text="Full blog post content")
    
    image = models.ImageField(upload_to='blog/images/', blank=True, null=True)
    
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.is_published and not self.published_at:
            from django.utils import timezone
            self.published_at = timezone.now()
        super().save(*args, **kwargs)