from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import (
    Category, Brand, Product, ContactRequest, RepairBooking,
    Order, OrderItem, Testimonial, BusinessInfo
)
from .serializers import (
    CategorySerializer, BrandSerializer, ProductListSerializer,
    ProductDetailSerializer, ContactRequestSerializer, RepairBookingSerializer,
    OrderDetailSerializer, OrderCreateSerializer, OrderListSerializer,
    TestimonialSerializer, BusinessInfoSerializer
)


# ═════════════════════════════════════════════════════════════
# CATEGORY VIEWSET
# ═════════════════════════════════════════════════════════════

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for product categories
    GET /api/categories/ - List all categories
    GET /api/categories/{id}/ - Get category details
    GET /api/categories/{id}/products/ - Get products in category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        """Get all products in a category"""
        category = self.get_object()
        products = category.products.filter(is_available=True)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


# ═════════════════════════════════════════════════════════════
# BRAND VIEWSET
# ═════════════════════════════════════════════════════════════

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for brands
    GET /api/brands/ - List all brands
    GET /api/brands/{id}/ - Get brand details
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]


# ═════════════════════════════════════════════════════════════
# PRODUCT VIEWSET
# ═════════════════════════════════════════════════════════════

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for products
    GET /api/products/ - List all products (with filtering & search)
    GET /api/products/{id}/ - Get product details
    GET /api/products/featured/ - Get featured/trending products
    """
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'brand', 'is_available', 'featured']
    search_fields = ['name', 'description', 'brand__name']
    ordering_fields = ['price', 'created_at', '-price']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """Filter available products"""
        return Product.objects.filter(is_available=True)
    
    def get_serializer_class(self):
        """Use different serializers for list vs detail"""
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured/trending products"""
        products = Product.objects.filter(is_available=True, featured=True)[:6]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get products by category"""
        category_slug = request.query_params.get('slug')
        if not category_slug:
            return Response(
                {'error': 'Category slug required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        category = get_object_or_404(Category, slug=category_slug)
        products = category.products.filter(is_available=True)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_brand(self, request):
        """Get products by brand"""
        brand_name = request.query_params.get('name')
        if not brand_name:
            return Response(
                {'error': 'Brand name required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        products = Product.objects.filter(is_available=True, brand__name=brand_name)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def price_range(self, request):
        """Get products in price range"""
        min_price = request.query_params.get('min')
        max_price = request.query_params.get('max')
        
        queryset = Product.objects.filter(is_available=True)
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)


# ═════════════════════════════════════════════════════════════
# CONTACT REQUEST VIEWSET
# ═════════════════════════════════════════════════════════════

class ContactRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint for contact form submissions
    POST /api/contacts/ - Submit contact form
    GET /api/contacts/ - List all contacts (admin only)
    """
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        """Allow anyone to create, but only admins to view list"""
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        """Override create to handle file uploads and send notifications"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(
            {
                'message': 'Thank you! We received your request. We will contact you soon.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )


# ═════════════════════════════════════════════════════════════
# REPAIR BOOKING VIEWSET
# ═════════════════════════════════════════════════════════════

class RepairBookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for repair bookings
    POST /api/repairs/ - Book a repair
    GET /api/repairs/ - List bookings (user's own or admin)
    GET /api/repairs/{id}/ - Get booking details
    PATCH /api/repairs/{id}/ - Update booking status (admin only)
    """
    serializer_class = RepairBookingSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Users see only their repairs, admins see all"""
        if self.request.user and self.request.user.is_staff:
            return RepairBooking.objects.all()
        # Filter by email if not admin
        email = self.request.query_params.get('email')
        if email:
            return RepairBooking.objects.filter(email=email)
        return RepairBooking.objects.none()
    
    def create(self, request, *args, **kwargs):
        """Create repair booking with confirmation"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(
            {
                'message': 'Repair booking confirmed! We will contact you shortly.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):
        """Update repair booking status (admin only)"""
        if not request.user.is_staff:
            return Response(
                {'error': 'Admin access required'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        repair = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(RepairBooking.STATUS_CHOICES):
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        repair.status = new_status
        repair.save()
        
        serializer = self.get_serializer(repair)
        return Response(serializer.data)


# ═════════════════════════════════════════════════════════════
# ORDER VIEWSET
# ═════════════════════════════════════════════════════════════

class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint for orders
    POST /api/orders/ - Create order
    GET /api/orders/ - List orders (user's own or admin)
    GET /api/orders/{id}/ - Get order details
    PATCH /api/orders/{id}/ - Update order status (admin only)
    """
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Users see only their orders, admins see all"""
        if self.request.user and self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.none()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        elif self.action == 'retrieve':
            return OrderDetailSerializer
        return OrderListSerializer
    
    def create(self, request, *args, **kwargs):
        """Create order from cart"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = self.perform_create(serializer)
        
        return Response(
            {
                'message': 'Order created! Please complete payment via WhatsApp.',
                'order_id': order.id,
                'data': OrderDetailSerializer(order).data
            },
            status=status.HTTP_201_CREATED
        )
    
    def perform_create(self, serializer):
        return serializer.save()
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):
        """Update order status (admin only)"""
        if not request.user.is_staff:
            return Response(
                {'error': 'Admin access required'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = new_status
        order.save()
        
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)


# ═════════════════════════════════════════════════════════════
# TESTIMONIAL VIEWSET
# ═════════════════════════════════════════════════════════════

class TestimonialViewSet(viewsets.ModelViewSet):
    """
    API endpoint for testimonials
    POST /api/testimonials/ - Submit testimonial
    GET /api/testimonials/ - List approved testimonials
    """
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Only show approved testimonials to public"""
        if self.request.user and self.request.user.is_staff:
            return Testimonial.objects.all()
        return Testimonial.objects.filter(is_approved=True)


# ═════════════════════════════════════════════════════════════
# BUSINESS INFO VIEWSET
# ═════════════════════════════════════════════════════════════

class BusinessInfoViewSet(viewsets.ViewSet):
    """
    API endpoint for business information
    GET /api/business-info/ - Get business details
    """
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def info(self, request):
        """Get business information"""
        try:
            business = BusinessInfo.objects.first()
            if business:
                serializer = BusinessInfoSerializer(business)
                return Response(serializer.data)
        except:
            pass
        
        return Response({
            'name': 'BeIT Solutions',
            'error': 'Business info not configured'
        })
    
    @action(detail=False, methods=['get'])
    def contact(self, request):
        """Get contact information only"""
        try:
            business = BusinessInfo.objects.first()
            if business:
                return Response({
                    'phone': business.phone,
                    'email': business.email,
                    'whatsapp': business.whatsapp,
                    'address': business.address,
                    'city': business.city
                })
        except:
            pass
        
        return Response({'error': 'Contact info not available'})