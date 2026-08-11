# 🚀 BeIT Solutions Django Backend Setup Guide

Complete guide to set up the Django REST API backend for your React e-commerce platform.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Database Setup](#database-setup)
4. [Admin Panel Configuration](#admin-panel-configuration)
5. [Running the Server](#running-the-server)
6. [API Testing](#api-testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- Git
- PostgreSQL (optional, for production)

### Check Python Version
```bash
python --version  # Should be 3.8 or higher
```

---

## Installation Steps

### Step 1: Create Project Directory

```bash
# Create project directory
mkdir beit-solutions-api
cd beit-solutions-api

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Django & Dependencies

```bash
# Install requirements
pip install -r requirements.txt

# Or install individually:
pip install Django==4.2.0
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.0.0
pip install python-decouple==3.8
pip install Pillow==10.0.0
```

### Step 3: Create Django Project & App

```bash
# Create Django project
django-admin startproject beit_project .

# Create Django app
python manage.py startapp beit_api

# Or if you already have the app
# Just copy your app folder to the project root
```

### Step 4: Copy Model Files

Copy these files into your `beit_api` folder:
- `models.py` - Database models
- `serializers.py` - DRF serializers
- `views.py` - API views/viewsets
- `urls.py` - URL routing

### Step 5: Update Django Settings

Edit your `beit_project/settings.py`:

```python
# Add to INSTALLED_APPS
INSTALLED_APPS = [
    # ... existing apps ...
    'rest_framework',
    'corsheaders',
    'django_filters',
    'whitenoise.runserver_nostatic',
    'beit_api',  # Your app
]

# Add to MIDDLEWARE (before SessionMiddleware)
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    # ... rest of middleware ...
]

# Add CORS Configuration
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'https://yourdomain.com',  # Your production domain
]

# Add REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# Add Media Files Configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Step 6: Update Project URLs

Edit `beit_project/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('beit_api.urls')),
    path('api-auth/', include('rest_framework.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

## Database Setup

### Step 1: Create Migrations

```bash
# Create migrations for models
python manage.py makemigrations beit_api

# Apply migrations
python manage.py migrate
```

### Step 2: Create Superuser (Admin)

```bash
# Create admin account
python manage.py createsuperuser

# You'll be prompted for:
# - Username: admin
# - Email: your-email@example.com
# - Password: (create a strong password)
```

---

## Admin Panel Configuration

### Register Models in Django Admin

Create `beit_api/admin.py`:

```python
from django.contrib import admin
from .models import (
    Category, Brand, Product, ContactRequest, RepairBooking,
    Order, OrderItem, Testimonial, BusinessInfo
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'brand', 'price', 'stock', 'is_available']
    list_filter = ['category', 'brand', 'is_available', 'featured']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'service', 'is_read', 'created_at']
    list_filter = ['service', 'is_read']
    search_fields = ['name', 'email']
    readonly_fields = ['created_at']

@admin.register(RepairBooking)
class RepairBookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'device_type', 'status', 'preferred_date', 'created_at']
    list_filter = ['status', 'preferred_date']
    search_fields = ['name', 'email']
    readonly_fields = ['created_at']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'status', 'total_amount', 'payment_status']
    list_filter = ['status', 'payment_status']
    search_fields = ['customer_name', 'customer_email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'price']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'rating', 'is_approved']
    list_filter = ['rating', 'is_approved']
    search_fields = ['customer_name']

@admin.register(BusinessInfo)
class BusinessInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email']
```

---

## Running the Server

### Development Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run development server
python manage.py runserver

# Access at: http://localhost:8000
# Admin panel: http://localhost:8000/admin
# API: http://localhost:8000/api/
```

### Test the API

Visit these URLs in your browser:
- `http://localhost:8000/api/products/` - List products
- `http://localhost:8000/api/categories/` - List categories
- `http://localhost:8000/api/business/info/` - Business info

---

## API Testing

### Using cURL

```bash
# List products
curl http://localhost:8000/api/products/

# List categories
curl http://localhost:8000/api/categories/

# Get featured products
curl http://localhost:8000/api/products/featured/

# Submit contact form
curl -X POST http://localhost:8000/api/contacts/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254708636727",
    "service": "buy",
    "message": "I want to buy a laptop"
  }'

# Book a repair
curl -X POST http://localhost:8000/api/repairs/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+254708636727",
    "device_type": "HP EliteBook",
    "issue_description": "Screen not working",
    "preferred_date": "2024-12-20"
  }'
```

### Using Postman

1. Download Postman from https://www.postman.com/downloads/
2. Import collection:
   - Create new requests for each endpoint
   - Set method (GET, POST, PATCH)
   - Add headers: `Content-Type: application/json`
   - Add request body as JSON

---

## React Integration

### Connect React Frontend to Django API

Update your React component to use the API:

```javascript
// src/api/client.js
const API_BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products/`);
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  return response.json();
};

export const submitContact = async (data) => {
  const response = await fetch(`${API_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

### Update HomePage to fetch from API

```javascript
// src/pages/HomePage.js
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/client';

function HomePage() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  
  // Use products in your JSX
}
```

---

## Deployment

### Option 1: Heroku (Free)

```bash
# 1. Create Heroku account at https://www.heroku.com
# 2. Install Heroku CLI
pip install heroku

# 3. Login to Heroku
heroku login

# 4. Create Procfile
echo "web: gunicorn beit_project.wsgi" > Procfile

# 5. Create runtime.txt
echo "python-3.11.0" > runtime.txt

# 6. Deploy
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main

# 7. Run migrations on Heroku
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Option 2: DigitalOcean / Linode

1. Create a droplet (Ubuntu 22.04)
2. SSH into server
3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv postgresql nginx
   ```
4. Clone your code and follow the setup steps
5. Configure Nginx as reverse proxy
6. Use Gunicorn as application server

### Option 3: AWS / Google Cloud

Use their App Engine or EC2 services with similar setup.

---

## Environment Variables

Create `.env` file in project root:

```env
# Django
SECRET_KEY=your-super-secret-key-generate-new-one
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=beit_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# WhatsApp API (for notifications)
WHATSAPP_API_KEY=your_whatsapp_api_key
WHATSAPP_PHONE=254708636727
```

Load in `settings.py`:
```python
from decouple import config
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', cast=bool)
```

---

## Troubleshooting

### Problem: CORS Error

**Solution:** Update `CORS_ALLOWED_ORIGINS` in settings.py to include your React app URL

### Problem: Static Files Not Loading

**Solution:** Run `python manage.py collectstatic`

### Problem: Database Locked

**Solution:** Delete `db.sqlite3` and run migrations again:
```bash
rm db.sqlite3
python manage.py migrate
```

### Problem: ModuleNotFoundError

**Solution:** Make sure virtual environment is activated and dependencies installed:
```bash
source venv/bin/activate  # activate venv
pip install -r requirements.txt  # install deps
```

### Problem: Port 8000 Already in Use

**Solution:** Run on different port:
```bash
python manage.py runserver 8001
```

---

## Quick Reference

```bash
# Activate virtual environment
source venv/bin/activate

# Create new migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver

# Open admin panel
# http://localhost:8000/admin

# Collect static files (production)
python manage.py collectstatic --noinput

# Run tests
python manage.py test

# Shell for testing
python manage.py shell
```

---

## Next Steps

1. ✅ Set up Django backend
2. 📱 Connect React frontend to API
3. 🛡️ Add authentication (JWT tokens)
4. 💳 Integrate payment gateway (M-Pesa, Stripe)
5. 📧 Set up email notifications
6. 📱 Add WhatsApp integration
7. 🚀 Deploy to production

---

## Support

For issues or questions:
- Check Django docs: https://docs.djangoproject.com
- Check DRF docs: https://www.django-rest-framework.org
- Stack Overflow with `django` tag

Good luck! 🚀