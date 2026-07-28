from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.utils import timezone

# ═════════════════════════════════════════════════════════════
# CATEGORY MODEL
# ═════════════════════════════════════════════════════════════

class Category(models.Model):
    """Product categories (Laptops, Monitors, Accessories, etc.)"""
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, default="📦")  # Emoji or icon name
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


# ═════════════════════════════════════════════════════════════
# BRAND MODEL
# ═════════════════════════════════════════════════════════════

class Brand(models.Model):
    """Laptop brands (HP, Dell, Lenovo, Apple, etc.)"""
    name = models.CharField(max_length=100, unique=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


# ═════════════════════════════════════════════════════════════
# PRODUCT MODEL
# ═════════════════════════════════════════════════════════════

class Product(models.Model):
    """Main product model for Laptops, Monitors, and Accessories"""
    
    # Basic Info
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    
    # Stock & Availability
    stock = models.IntegerField(default=1, validators=[MinValueValidator(0)])
    is_available = models.BooleanField(default=True)
    
    # Specifications (JSON for flexibility)
    specs = models.JSONField(default=dict, blank=True)
    
    # Additional Details
    warranty = models.CharField(max_length=100, default="90 days")
    features = models.TextField(blank=True)  # Key features
    highlights = models.TextField(blank=True)  # Why choose this
    compatibility = models.CharField(max_length=255, blank=True)
    extras = models.CharField(max_length=255, blank=True)  # Free items
    
    # Pricing (for sales/discounts)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False)  # Show in trending section
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'is_available']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f"{self.name} - KSh {self.price}"
    
    def get_discount_price(self):
        """Calculate discounted price"""
        if self.discount_percentage > 0:
            discount = (self.price * self.discount_percentage) / 100
            return self.price - discount
        return self.price


# ═════════════════════════════════════════════════════════════
# CONTACT/QUOTE REQUEST MODEL
# ═════════════════════════════════════════════════════════════

class ContactRequest(models.Model):
    """Customer contact form submissions and quote requests"""
    
    SERVICE_CHOICES = [
        ('repair', 'Laptop Repair'),
        ('buy', 'Buy Laptop'),
        ('upgrade', 'Upgrade/Maintenance'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    service = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    message = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Status
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    reply_message = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    replied_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Contact from {self.name} - {self.get_service_display()}"


# ═════════════════════════════════════════════════════════════
# REPAIR BOOKING MODEL
# ═════════════════════════════════════════════════════════════

class RepairBooking(models.Model):
    """Repair service bookings"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    device_type = models.CharField(max_length=100)  # Dell, HP, Apple, etc.
    issue_description = models.TextField()
    preferred_date = models.DateField()
    
    # Status & Tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    actual_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Repair #{self.id} - {self.name} ({self.get_status_display()})"


# ═════════════════════════════════════════════════════════════
# ORDER MODEL
# ═════════════════════════════════════════════════════════════

class Order(models.Model):
    """Customer orders"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    customer_address = models.TextField()
    
    # Order Details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='whatsapp')  # whatsapp, mpesa, bank transfer
    payment_status = models.CharField(max_length=20, default='pending')  # pending, completed, failed
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


# ═════════════════════════════════════════════════════════════
# ORDER ITEM MODEL
# ═════════════════════════════════════════════════════════════

class OrderItem(models.Model):
    """Individual items in an order"""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of order
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


# ═════════════════════════════════════════════════════════════
# TESTIMONIAL MODEL
# ═════════════════════════════════════════════════════════════

class Testimonial(models.Model):
    """Customer testimonials and reviews"""
    
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]
    
    customer_name = models.CharField(max_length=255)
    service = models.CharField(max_length=255)  # e.g., "HP ProBook 640 G4 Purchase"
    rating = models.IntegerField(choices=RATING_CHOICES, default=5)
    message = models.TextField()
    is_approved = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-rating', '-created_at']

    def __str__(self):
        return f"{customer_name} - {rating}⭐"


# ═════════════════════════════════════════════════════════════
# BUSINESS INFO MODEL
# ═════════════════════════════════════════════════════════════

class BusinessInfo(models.Model):
    """Store business information (singleton)"""
    
    name = models.CharField(max_length=255, default="BeIT Solutions")
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100, default="Nairobi")
    country = models.CharField(max_length=100, default="Kenya")
    
    about = models.TextField(blank=True)
    business_hours = models.TextField(blank=True)  # Store hours
    
    # Social Media
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    
    # Stats
    total_repairs = models.IntegerField(default=100)
    satisfaction_rate = models.IntegerField(default=98)  # percentage
    years_experience = models.IntegerField(default=4)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Business Info"

    def __str__(self):
        return self.name