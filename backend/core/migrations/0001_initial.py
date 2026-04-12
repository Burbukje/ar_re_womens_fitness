from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ClassOffering',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('schedule', models.CharField(blank=True, max_length=150)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order', 'id']},
        ),
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=200)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ['-created_at']},
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order', 'id']},
        ),
        migrations.CreateModel(
            name='SiteContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('studio_name', models.CharField(default="Ar-Re Women's Fitness", max_length=200)),
                ('hero_title', models.CharField(default='Strong Women. Supportive Space. Real Results.', max_length=255)),
                ('hero_subtitle', models.TextField(default='A welcoming fitness studio designed for women who want to move confidently, feel healthier, and build lasting strength.')),
                ('home_intro', models.TextField(default="At Ar-Re Women's Fitness, we focus on strength, mobility, community, and sustainable routines that fit real life.")),
                ('about_title', models.CharField(default='About Ar-Re', max_length=255)),
                ('about_body', models.TextField(default="Ar-Re Women's Fitness is a modern fitness studio built for women of all experience levels. We believe movement should feel empowering, accessible, and personal.")),
                ('contact_email', models.EmailField(default='hello@arrewomenfitness.com', max_length=254)),
                ('contact_phone', models.CharField(default='+61 400 000 000', max_length=50)),
                ('contact_address', models.CharField(default='123 Wellness Avenue, Perth WA', max_length=255)),
                ('opening_hours', models.CharField(default='Mon-Fri: 6:00 AM - 8:00 PM | Sat: 8:00 AM - 2:00 PM', max_length=255)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={'verbose_name': 'Site Content', 'verbose_name_plural': 'Site Content'},
        ),
    ]
