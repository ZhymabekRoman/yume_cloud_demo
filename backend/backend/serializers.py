from rest_framework import serializers
from .models import Order, Product, OrderProduct

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# class OrderProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderProduct
#         fields = '__all__'

class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'price', 'duration']
        extra_kwargs = {'order': {'write_only': True}}