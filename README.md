# Ar-Re Women's Fitness

Full-stack website for a women's fitness studio.

## Stack
- **Backend:** Django + Django REST Framework + Django Admin
- **Frontend:** Next.js + React + TypeScript



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

