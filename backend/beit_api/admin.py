from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Category, Brand, Product, ContactRequest, RepairBooking,
    Order, OrderItem, Testimonial, BusinessInfo
)


# ═════════════════════════════════════════════════════════════
# CATEGORY ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'slug', 'product_count']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']
    readonly_fields = ['created_at', 'updated_at']
    
    def product_count(self, obj):
        count = obj.products.count()
        return format_html(f'<strong>{count}</strong> products')
    product_count.short_description = 'Products'


# ═════════════════════════════════════════════════════════════
# BRAND ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'product_count']
    search_fields = ['name']
    
    def product_count(self, obj):
        count = obj.product_set.count()
        return format_html(f'<strong>{count}</strong>')
    product_count.short_description = 'Products'


# ═════════════════════════════════════════════════════════════
# PRODUCT ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'brand', 'price_with_discount',
        'stock_status', 'is_available', 'featured', 'created_at'
    ]
    list_filter = ['category', 'brand', 'is_available', 'featured', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'brand', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price', 'discount_percentage')
        }),
        ('Product Details', {
            'fields': ('specs', 'warranty', 'features', 'highlights', 'compatibility', 'extras')
        }),
        ('Image & Availability', {
            'fields': ('image', 'stock', 'is_available', 'featured')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def price_with_discount(self, obj):
        if obj.discount_percentage > 0:
            discount_price = obj.get_discount_price()
            return format_html(
                f'<span style="color: green;"><strong>KSh {discount_price}</strong></span> '
                f'<span style="color: red;"><s>KSh {obj.price}</s></span> '
                f'<span style="color: orange;">-{obj.discount_percentage}%</span>'
            )
        return f'KSh {obj.price}'
    price_with_discount.short_description = 'Price'
    
    def stock_status(self, obj):
        if obj.stock == 0:
            return format_html('<span style="color: red;">❌ Out of Stock</span>')
        elif obj.stock < 5:
            return format_html(f'<span style="color: orange;">⚠️ {obj.stock} Left</span>')
        return format_html(f'<span style="color: green;">✓ {obj.stock} Available</span>')
    stock_status.short_description = 'Stock'


# ═════════════════════════════════════════════════════════════
# CONTACT REQUEST ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'service', 'read_status', 'reply_status', 'created_at']
    list_filter = ['service', 'is_read', 'is_replied', 'created_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['created_at', 'replied_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Request Details', {
            'fields': ('service', 'message', 'product')
        }),
        ('Status', {
            'fields': ('is_read', 'is_replied', 'reply_message')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'replied_at'),
            'classes': ('collapse',)
        }),
    )
    
    def read_status(self, obj):
        if obj.is_read:
            return format_html('<span style="color: green;">✓ Read</span>')
        return format_html('<span style="color: red;">✗ Unread</span>')
    read_status.short_description = 'Status'
    
    def reply_status(self, obj):
        if obj.is_replied:
            return format_html('<span style="color: green;">✓ Replied</span>')
        return format_html('<span style="color: orange;">⏳ Pending</span>')
    reply_status.short_description = 'Reply'
    
    actions = ['mark_as_read', 'mark_as_replied']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected as read"
    
    def mark_as_replied(self, request, queryset):
        queryset.update(is_replied=True)
    mark_as_replied.short_description = "Mark selected as replied"


# ═════════════════════════════════════════════════════════════
# REPAIR BOOKING ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(RepairBooking)
class RepairBookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'name', 'device_type', 'status_badge', 'preferred_date', 'created_at']
    list_filter = ['status', 'preferred_date', 'created_at']
    search_fields = ['name', 'email', 'device_type', 'issue_description']
    readonly_fields = ['created_at', 'confirmed_at', 'completed_at']
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Device & Issue', {
            'fields': ('device_type', 'issue_description', 'preferred_date')
        }),
        ('Service Details', {
            'fields': ('status', 'estimated_cost', 'actual_cost')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'confirmed_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )
    
    def booking_id(self, obj):
        return f'#{obj.id}'
    booking_id.short_description = 'Booking ID'
    
    def status_badge(self, obj):
        colors = {
            'pending': 'orange',
            'confirmed': 'blue',
            'in_progress': 'purple',
            'completed': 'green',
            'cancelled': 'red'
        }
        color = colors.get(obj.status, 'gray')
        return format_html(
            f'<span style="background-color: {color}; color: white; '
            f'padding: 3px 10px; border-radius: 3px;">{obj.get_status_display()}</span>'
        )
    status_badge.short_description = 'Status'
    
    actions = ['confirm_booking', 'mark_as_completed']
    
    def confirm_booking(self, request, queryset):
        from django.utils import timezone
        queryset.update(status='confirmed', confirmed_at=timezone.now())
    confirm_booking.short_description = "Confirm selected bookings"
    
    def mark_as_completed(self, request, queryset):
        from django.utils import timezone
        queryset.update(status='completed', completed_at=timezone.now())
    mark_as_completed.short_description = "Mark as completed"


# ═════════════════════════════════════════════════════════════
# ORDER ITEM INLINE
# ═════════════════════════════════════════════════════════════

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    fields = ['product', 'quantity', 'price']
    readonly_fields = ['price']


# ═════════════════════════════════════════════════════════════
# ORDER ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'customer_name', 'status_badge', 'payment_status_badge', 'total_amount', 'created_at']
    list_filter = ['status', 'payment_status', 'payment_method', 'created_at']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    readonly_fields = ['created_at', 'updated_at', 'total_amount']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('customer_name', 'customer_email', 'customer_phone', 'customer_address')
        }),
        ('Order Status', {
            'fields': ('status', 'total_amount')
        }),
        ('Payment Information', {
            'fields': ('payment_method', 'payment_status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def order_number(self, obj):
        return f'Order #{obj.id}'
    order_number.short_description = 'Order #'
    
    def status_badge(self, obj):
        colors = {
            'pending': 'orange',
            'confirmed': 'blue',
            'shipped': 'purple',
            'delivered': 'green',
            'cancelled': 'red'
        }
        color = colors.get(obj.status, 'gray')
        return format_html(
            f'<span style="background-color: {color}; color: white; '
            f'padding: 3px 10px; border-radius: 3px;">{obj.get_status_display()}</span>'
        )
    status_badge.short_description = 'Order Status'
    
    def payment_status_badge(self, obj):
        colors = {
            'pending': 'orange',
            'completed': 'green',
            'failed': 'red'
        }
        color = colors.get(obj.payment_status, 'gray')
        return format_html(
            f'<span style="background-color: {color}; color: white; '
            f'padding: 3px 10px; border-radius: 3px;">{obj.payment_status.capitalize()}</span>'
        )
    payment_status_badge.short_description = 'Payment'
    
    actions = ['confirm_order', 'mark_as_shipped', 'mark_as_delivered']
    
    def confirm_order(self, request, queryset):
        queryset.update(status='confirmed')
    confirm_order.short_description = "Confirm selected orders"
    
    def mark_as_shipped(self, request, queryset):
        queryset.update(status='shipped')
    mark_as_shipped.short_description = "Mark as shipped"
    
    def mark_as_delivered(self, request, queryset):
        queryset.update(status='delivered')
    mark_as_delivered.short_description = "Mark as delivered"


# ═════════════════════════════════════════════════════════════
# TESTIMONIAL ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'service', 'rating_stars', 'is_approved', 'created_at']
    list_filter = ['rating', 'is_approved', 'created_at']
    search_fields = ['customer_name', 'service', 'message']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('customer_name', 'service')
        }),
        ('Testimonial', {
            'fields': ('rating', 'message')
        }),
        ('Moderation', {
            'fields': ('is_approved',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def rating_stars(self, obj):
        stars = '⭐' * obj.rating
        return format_html(f'{stars}')
    rating_stars.short_description = 'Rating'
    
    actions = ['approve_testimonials']
    
    def approve_testimonials(self, request, queryset):
        queryset.update(is_approved=True)
    approve_testimonials.short_description = "Approve selected testimonials"


# ═════════════════════════════════════════════════════════════
# BUSINESS INFO ADMIN
# ═════════════════════════════════════════════════════════════

@admin.register(BusinessInfo)
class BusinessInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'city']
    
    fieldsets = (
        ('Business Information', {
            'fields': ('name', 'about', 'business_hours')
        }),
        ('Contact Information', {
            'fields': ('phone', 'email', 'whatsapp', 'address', 'city', 'country')
        }),
        ('Social Media', {
            'fields': ('facebook', 'instagram', 'twitter', 'linkedin')
        }),
        ('Statistics', {
            'fields': ('total_repairs', 'satisfaction_rate', 'years_experience')
        }),
        ('Last Updated', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['updated_at']
    
    def has_add_permission(self, request):
        # Only allow one instance of BusinessInfo
        return not BusinessInfo.objects.exists()


# ═════════════════════════════════════════════════════════════
# ADMIN SITE CUSTOMIZATION
# ═════════════════════════════════════════════════════════════

admin.site.site_header = "BeIT Solutions Admin"
admin.site.site_title = "BeIT Solutions"
admin.site.index_title = "Welcome to BeIT Solutions Admin"