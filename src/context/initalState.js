import { fetchCart } from '../utils/fetchLocalStorage';

const cartItems = fetchCart();

export const initialState = {
  cartItems: cartItems,
  cartShow: false,
};
