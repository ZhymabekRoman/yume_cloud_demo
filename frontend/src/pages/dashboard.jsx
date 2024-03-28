import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { ProductList } from "@/components/product-managment";
import { OrderList } from "@/components/order-managment";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductList />
          <Separator className="my-4" />
          <OrderList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;