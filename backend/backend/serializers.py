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
    products = serializers.SerializerMethodField()

    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'price', 'duration', 'products']
        extra_kwargs = {'order': {'write_only': True}}

    def get_products(self, obj):
        # Retrieve the related products for the order
        products = Product.objects.filter(orderproduct__order=obj)
        return ProductSerializer(products, many=True).data
