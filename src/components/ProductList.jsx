import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';
import { useEffect } from 'react';
import { CircularProgress, Button } from '@mui/material';

const ProductList = () => {
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <p>Error loading products.</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow-md">
            <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p>${product.price}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
