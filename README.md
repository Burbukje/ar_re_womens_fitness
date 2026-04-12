# Ar-Re Women's Fitness

A starter full-stack website for a women's fitness studio.

## Stack
- **Backend:** Django + Django REST Framework + Django Admin
- **Frontend:** Next.js + React + TypeScript

## Features
- Public pages: **Home**, **About**, **Contact**
- Scrollable home page sections
- Studio styling using:
  - Background: `#8FAF9A`
  - Divider: `#2F4F4F`
- Django Admin for updating content and reviewing contact messages
- Contact form posting to Django backend API

## Project structure
```text
ar_re_womens_fitness/
  backend/
  frontend/
```

## Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs on `http://127.0.0.1:8000`
Admin runs on `http://127.0.0.1:8000/admin`

## Frontend setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`

## First-time admin content flow
1. Start the Django backend.
2. Visit `http://127.0.0.1:8000/api/site-content/` once or load the frontend home page.
3. Default site content, features, and classes will be created automatically.
4. Log into Django Admin and edit:
   - Site Content
   - Features
   - Class Offerings
   - Contact Messages

## Suggested next upgrades
- Add membership plans and pricing
- Add class booking and user accounts
- Add trainer profiles
- Add gallery and testimonials
- Add image uploads for hero banners
- Deploy Django to Render/Fly.io and Next.js to Vercel
