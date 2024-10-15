import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { Button, TextField } from '@mui/material';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg">{item.title}</h3>
                <p>${item.price}</p>
              </div>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                }
                size="small"
                inputProps={{ min: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(removeFromCart(item))}
              >
                Remove
              </Button>
            </div>
          ))}
          <h3 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
