from rest_framework import serializers
from .models import (
    Category, Brand, Product, ContactRequest, RepairBooking,
    Order, OrderItem, Testimonial, BusinessInfo
)


# ═════════════════════════════════════════════════════════════
# CATEGORY SERIALIZER
# ═════════════════════════════════════════════════════════════

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'slug', 'description', 'product_count']
    
    def get_product_count(self, obj):
        return obj.products.filter(is_available=True).count()


# ═════════════════════════════════════════════════════════════
# BRAND SERIALIZER
# ═════════════════════════════════════════════════════════════

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo']


# ═════════════════════════════════════════════════════════════
# PRODUCT SERIALIZER
# ═════════════════════════════════════════════════════════════

class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for product lists"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    discount_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'brand', 'brand_name',
            'price', 'discount_price', 'image', 'warranty', 'stock',
            'is_available', 'featured', 'discount_percentage'
        ]
    
    def get_discount_price(self, obj):
        return str(obj.get_discount_price())


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full product details serializer"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    discount_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'brand', 'brand_name',
            'price', 'discount_price', 'discount_percentage', 'image',
            'description', 'specs', 'warranty', 'features', 'highlights',
            'compatibility', 'extras', 'stock', 'is_available', 'featured',
            'created_at', 'updated_at'
        ]
    
    def get_discount_price(self, obj):
        return str(obj.get_discount_price())


# ═════════════════════════════════════════════════════════════
# CONTACT REQUEST SERIALIZER
# ═════════════════════════════════════════════════════════════

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ['id', 'name', 'email', 'phone', 'service', 'message', 'product']
    
    def create(self, validated_data):
        """Create contact request and send notification"""
        contact = ContactRequest.objects.create(**validated_data)
        # TODO: Send email notification to admin
        # TODO: Send WhatsApp notification
        return contact


# ═════════════════════════════════════════════════════════════
# REPAIR BOOKING SERIALIZER
# ═════════════════════════════════════════════════════════════

class RepairBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairBooking
        fields = [
            'id', 'name', 'email', 'phone', 'device_type',
            'issue_description', 'preferred_date', 'status',
            'estimated_cost', 'actual_cost', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'estimated_cost', 'created_at']
    
    def create(self, validated_data):
        """Create repair booking"""
        booking = RepairBooking.objects.create(**validated_data)
        # TODO: Send confirmation email
        # TODO: Send WhatsApp confirmation
        return booking


# ═════════════════════════════════════════════════════════════
# ORDER ITEM SERIALIZER
# ═════════════════════════════════════════════════════════════

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'price']
    
    def get_product_image(self, obj):
        if obj.product.image:
            return obj.product.image.url
        return None


# ═════════════════════════════════════════════════════════════
# ORDER SERIALIZER
# ═════════════════════════════════════════════════════════════

class OrderListSerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'status', 'total_amount',
            'items_count', 'payment_status', 'created_at'
        ]
    
    def get_items_count(self, obj):
        return obj.items.count()


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'customer_address', 'status', 'total_amount', 'payment_method',
            'payment_status', 'items', 'created_at', 'updated_at'
        ]


class OrderCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating orders"""
    items = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'customer_address', 'total_amount', 'payment_method', 'items'
        ]
    
    def create(self, validated_data):
        order = Order.objects.create(**validated_data)
        # TODO: Send order confirmation email
        # TODO: Send WhatsApp order notification
        return order


# ═════════════════════════════════════════════════════════════
# TESTIMONIAL SERIALIZER
# ═════════════════════════════════════════════════════════════

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'service', 'rating', 'message']


# ═════════════════════════════════════════════════════════════
# BUSINESS INFO SERIALIZER
# ═════════════════════════════════════════════════════════════

class BusinessInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessInfo
        fields = [
            'name', 'phone', 'email', 'whatsapp', 'address', 'city', 'country',
            'about', 'business_hours', 'facebook', 'instagram', 'twitter',
            'linkedin', 'total_repairs', 'satisfaction_rate', 'years_experience'
        ]