import api from '@/lib/api';

export const fetchProducts = async () => {
  return await api.get('products/');
};

export const createProduct = async (product) => {
  return await api.post('products/', product);
};

export const updateProduct = async (id, product) => {
  return await api.put(`products/${id}/`, product);
};

export const deleteProduct = async (id) => {
  return await api.delete(`products/${id}/`);
};