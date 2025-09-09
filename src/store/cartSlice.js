import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        state.cart = state.cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cart.push({ ...product, qty: 1 });
      }
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cart = state.cart
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
