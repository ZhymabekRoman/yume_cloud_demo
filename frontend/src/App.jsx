import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '@/pages/dashboard';
import NotFound from '@/pages/not-found';

import HeaderPage from '@/components/header';
import AddProduct from '@/pages/add-product';
import AddOrder from '@/pages/add-order';
import AddProductToOrder from '@/pages/add-product-to-order';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <HeaderPage />
          <div className="m-2">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/orders/add" element={<AddOrder />} />
              <Route path="/orders/:orderId/add-product" element={<AddProductToOrder />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
