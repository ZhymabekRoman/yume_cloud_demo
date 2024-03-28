import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addProductToOrder } from "@/services/orderService";
import { fetchProducts } from "@/services/productService"; // Import fetchProducts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Select
import { Label } from "@/components/ui/label";

const AddProductToOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const form = useForm();
  const [products, setProducts] = useState([]); // State to store products

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts.data); // Assume the API response structure
    };
    loadProducts();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await addProductToOrder(orderId, data);
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error("Failed to add product to order:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="product">Product ID:</Label>
        <Input id="product" {...form.register("product")} type="number" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="price">Price:</Label>
        <Input id="price" {...form.register("price")} type="number" step="0.01" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="duration">Duration:</Label>
        <Input id="duration" {...form.register("duration")} type="number" />
      </div>
      <Button type="submit">Add Product to Order</Button>
    </form>
  );
};

export default AddProductToOrder;