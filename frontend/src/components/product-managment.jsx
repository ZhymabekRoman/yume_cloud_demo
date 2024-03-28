import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StateHelper,
  ErrorStateContent,
  SuccessStateContent,
  LOADING_STATE,
} from "@/components/ui/state-helper";
import { fetchProducts, deleteProduct } from "@/services/productService";
import { Button } from "@/components/ui/button";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsLoadingState, setProductsLoadingState] = useState(
    LOADING_STATE.LOADING
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
        setProductsLoadingState(LOADING_STATE.SUCCESS);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProductsLoadingState(LOADING_STATE.ERROR);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2 className="text-xl text-bold">Products</h2>
        <Button
          onClick={() => {
            navigate("/products/add");
          }}
        >
          Add Product
        </Button>
      </div>
      <StateHelper state={productsLoadingState}>
        <SuccessStateContent>
          <ul className="space-y-2">
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    ID: {product.id} - {product.name} - ${product.price}
                  </span>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No products... Please add using button above
              </div>
            )}
          </ul>
        </SuccessStateContent>
        <ErrorStateContent>
          <div className="text-center text-gray-500 text-sm">
            Problem loading products
          </div>
        </ErrorStateContent>
      </StateHelper>
    </div>
  );
};

export default ProductList;
