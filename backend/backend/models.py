from django.db import models
from django.core.exceptions import ValidationError

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order #{self.pk}"

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField()

    def clean(self):
        # Проверка, что продукт не включен в другую аренду в то же время
        overlapping_orders = OrderProduct.objects.filter(
            product=self.product,
            order__start_date__lte=self.order.end_date,
            order__end_date__gte=self.order.start_date
        ).exclude(order=self.order)

        if overlapping_orders.exists():
            raise ValidationError("This product is already included in another order during the same time period.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Вызов метода clean() для проверки условий
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} in Order #{self.order.pk}"