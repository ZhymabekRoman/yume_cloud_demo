import api from '@/lib/api';

export const fetchOrders = async () => {
  return await api.get('orders/');
};

export const createOrder = async (order) => {
  return await api.post('orders/', order);
};

export const updateOrder = async (id, order) => {
  return await api.put(`orders/${id}/`, order);
};

export const deleteOrder = async (id) => {
  return await api.delete(`orders/${id}/`);
};

export const addProductToOrder = async (orderId, product) => {
  return await api.post(`orders/${orderId}/products/`, product);
};

export const deleteProductFromOrder = async (orderId, productId) => {
  return await api.delete(`orders/${orderId}/products/${productId}/`);
};