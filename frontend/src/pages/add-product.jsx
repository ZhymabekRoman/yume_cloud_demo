import React from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { createProduct } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

// const productSchema = z.object({
//   name: z.string().min(1, { message: "Product name is required" }),
//   price: z.number().min(0, { message: "Price must be a positive number" }),
// });

const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    // resolver: zodResolver(productSchema),
  });

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Product Name:</Label>
        <Input
          id="name"
          {...form.register("name")}
          type="text"
          placeholder="Enter product name"
        />
        {/*<FormMessage name="name" errors={form.formState.errors} />*/}
      </div>
      <div className="space-y-1">
        <Label htmlFor="price">Price:</Label>
        <Input
          id="price"
          {...form.register("price")}
          type="number"
          placeholder="Enter price"
        />
        {/*<FormMessage name="price" errors={form.formState.errors} />*/}
      </div>
      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default AddProduct;