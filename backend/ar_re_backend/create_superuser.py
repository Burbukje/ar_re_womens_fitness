import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ar_re_backend.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

if username and password:
    user, created = User.objects.get_or_create(
        username=username,
        defaults={"email": email or ""}
    )

    user.email = email or user.email
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()

    print(f"Superuser ready: {username} (created={created})")
else:
    print("Missing DJANGO_SUPERUSER_USERNAME or DJANGO_SUPERUSER_PASSWORD")