from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create router for viewsets
router = DefaultRouter()

# Register viewsets
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'brands', views.BrandViewSet, basename='brand')
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'contacts', views.ContactRequestViewSet, basename='contact')
router.register(r'repairs', views.RepairBookingViewSet, basename='repair')
router.register(r'orders', views.OrderViewSet, basename='order')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'business', views.BusinessInfoViewSet, basename='business')

app_name = 'api'

urlpatterns = [
    # API Router
    path('', include(router.urls)),
    
    # Custom endpoints
    path('auth/', include('rest_framework.urls')),
]

"""
╔══════════════════════════════════════════════════════════════════╗
║                     API ENDPOINTS REFERENCE                      ║
╚══════════════════════════════════════════════════════════════════╝

CATEGORIES
──────────
GET    /api/categories/                    - List all categories
GET    /api/categories/{slug}/             - Get category details
GET    /api/categories/{slug}/products/    - Get products in category

BRANDS
──────
GET    /api/brands/                        - List all brands
GET    /api/brands/{id}/                   - Get brand details

PRODUCTS
────────
GET    /api/products/                      - List all products
  Query params: ?category=1&brand=2&search=Dell&ordering=-price
GET    /api/products/{id}/                 - Get product details
GET    /api/products/featured/             - Get featured products
GET    /api/products/by_category/          - Get products by category (?slug=laptops)
GET    /api/products/by_brand/             - Get products by brand (?name=HP)
GET    /api/products/price_range/          - Get products in price range (?min=10000&max=50000)

CONTACTS
────────
POST   /api/contacts/                      - Submit contact form
  Data: {name, email, phone, service, message, product(optional)}
GET    /api/contacts/                      - List contacts (admin only)

REPAIRS
───────
POST   /api/repairs/                       - Book a repair
  Data: {name, email, phone, device_type, issue_description, preferred_date}
GET    /api/repairs/                       - List repairs (?email=user@example.com)
GET    /api/repairs/{id}/                  - Get repair details
PATCH  /api/repairs/{id}/update_status/    - Update repair status (admin only)
  Data: {status: 'pending|confirmed|in_progress|completed|cancelled'}

ORDERS
──────
POST   /api/orders/                        - Create order
  Data: {customer_name, customer_email, customer_phone, customer_address, total_amount, payment_method}
GET    /api/orders/                        - List orders (admin only)
GET    /api/orders/{id}/                   - Get order details
PATCH  /api/orders/{id}/update_status/     - Update order status (admin only)
  Data: {status: 'pending|confirmed|shipped|delivered|cancelled'}

TESTIMONIALS
────────────
POST   /api/testimonials/                  - Submit testimonial
  Data: {customer_name, service, rating, message}
GET    /api/testimonials/                  - List approved testimonials

BUSINESS INFO
──────────────
GET    /api/business/info/                 - Get business information
GET    /api/business/contact/              - Get contact information

╔══════════════════════════════════════════════════════════════════╗
║                        USAGE EXAMPLES                            ║
╚══════════════════════════════════════════════════════════════════╝

1. Get all laptops:
   GET /api/products/?category=1

2. Search for HP products:
   GET /api/products/?search=HP

3. Get laptops in price range:
   GET /api/products/price_range/?min=10000&max=50000

4. Submit contact form:
   POST /api/contacts/
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "+254708636727",
     "service": "buy",
     "message": "I'm interested in HP laptops"
   }

5. Book a repair:
   POST /api/repairs/
   {
     "name": "Jane Doe",
     "email": "jane@example.com",
     "phone": "+254708636727",
     "device_type": "HP EliteBook 840",
     "issue_description": "Screen not working",
     "preferred_date": "2024-12-20"
   }

6. Get featured products:
   GET /api/products/featured/

7. Get business contact info:
   GET /api/business/contact/
