import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/services/orderService"; // Ensure this function is implemented
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddOrder = () => {
  const navigate = useNavigate();
  const form = useForm();

  const handleSubmit = async (data) => {
    try {
      await createOrder(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="start_date">Start Date:</Label>
        <Input
          id="start_date"
          {...form.register("start_date")}
          type="date"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="end_date">End Date:</Label>
        <Input
          id="end_date"
          {...form.register("end_date")}
          type="date"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="total_cost">Total Cost:</Label>
        <Input
          id="total_cost"
          {...form.register("total_cost")}
          type="number"
          step="0.01"
        />
      </div>
      <Button type="submit">Add Order</Button>
    </form>
  );
};

export default AddOrder;