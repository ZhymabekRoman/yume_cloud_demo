import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders, deleteOrder, addProductToOrder, deleteProductFromOrder } from "@/services/orderService";
import { Button } from "@/components/ui/button";
import {
  LOADING_STATE,
  StateHelper,
  SuccessStateContent,
  ErrorStateContent,
} from "@/components/ui/state-helper";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [ordersLoadingState, setOrdersLoadingState] = useState(
    LOADING_STATE.LOADING
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data.map(order => ({
          ...order,
          products: order.products || [] // Ensure products is an array
        })));
        setOrdersLoadingState(LOADING_STATE.SUCCESS);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrdersLoadingState(LOADING_STATE.ERROR);
      }
    };
    getOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const handleAddProduct = async (orderId) => {
    navigate(`/orders/${orderId}/add-product`);
  };

  const handleDeleteProduct = async (orderId, productId) => {
    try {
      await deleteProductFromOrder(orderId, productId);
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            products: order.products.filter(product => product.id !== productId)
          };
        }
        return order;
      }));
    } catch (error) {
      console.error("Failed to delete product from order:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2 className="text-xl text-bold">Orders</h2>
        <Button
          onClick={() => {
            navigate("/orders/add");
          }}
        >
          Add Order
        </Button>
      </div>
      <StateHelper state={ordersLoadingState}>
        <SuccessStateContent>
          <ul className="space-y-2">
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order.id} className="flex flex-col justify-between items-start">
                  <div className="flex justify-between items-center w-full">
                    <span>
                      ID: {order.id} - Total Cost: ${order.total_cost} - Start Date: {new Date(order.start_date).toLocaleDateString()} - End Date: {new Date(order.end_date).toLocaleDateString()}
                    </span>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete Order
                    </Button>
                  </div>
                  <div>
                    <h3>Products:</h3>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.id}>
                          {product.name} - Quantity: {product.quantity}
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteProduct(order.id, product.id)}
                          >
                            Delete Product
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={() => handleAddProduct(order.id)}>Add Product</Button>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No orders... Please add some orders
              </div>
            )}
          </ul>
        </SuccessStateContent>
        <ErrorStateContent>
          <div className="text-center text-gray-500 text-sm">
            Problem loading orders
          </div>
        </ErrorStateContent>
      </StateHelper>
    </div>
  );
};
