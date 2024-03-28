from rest_framework import viewsets
from .models import Order, Product, OrderProduct
from .serializers import OrderSerializer, ProductSerializer, OrderProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer

    def perform_create(self, serializer):
        order_pk = self.kwargs.get('order_pk')
        serializer.save(order_id=order_pk)