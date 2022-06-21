import React, { useEffect, useState } from 'react';

import { MdOutlineClear, MdLogin } from 'react-icons/md';
import { VscArrowLeft } from 'react-icons/vsc';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';
import CartItem from './CartItem';

const Cart = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CARTSHOW,
      cartShow: !cartShow,
    });
  };

  const clearAllItems = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag, cartItems]);
  return (
    <div
      className={`bg-cartBg fixed top-0 right-0 w-full md:w-375  h-screen drop-shadow-md z-[101] flex flex-col transition-all duration-300 ease-in-out ${
        cartShow ? 'visible opacity-100 translate-x-0' : 'invisible opacity-0 translate-x-full'
      }`}
    >
      <div className="px-3 flex items-center justify-between py-3 md:py-0 md:h-16">
        <div className="w-10 h-10 flex items-center justify-center cursor-pointer group" onClick={showCart}>
          <VscArrowLeft className="text-3xl text-white group-hover:-translate-x-2 transition-all duration-100 ease-in-out" />
        </div>
        <p className="text-white font-semibold text-2xl">Cart</p>
        {cartItems.length > 0 ? (
          <div
            className="group flex items-center justify-center cursor-pointer px-2 py-[2px] rounded-2xl bg-white overflow-hidden drop-shadow-2xl"
            onClick={clearAllItems}
          >
            <p className="text-textColor text-sm transition-all duration-100 ease-in-out group-hover:-translate-x-[50px]">
              Clear
            </p>
            <MdOutlineClear className="text-textColor text-base transition-all duration-100 ease-in-out group-hover:-translate-x-full group-hover:scale-150" />
          </div>
        ) : (
          <div className="w-[70px]"></div>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="w-full h-full flex flex-col">
          <div className="w-full px-6 md:py-2 h-[300px] md:h-[305px] overflow-y-scroll scrollbar-none flex flex-col gap-3">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
            ))}
          </div>

          <div className="flex flex-1 md:gap-1 flex-col justify-evenly px-8 py-2 w-full bg-cartTotal rounded-t-[2rem]">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-base md:text-lg">Sub Total</p>
              <p className="text-gray-400 text-base md:text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-base md:text-lg">Delivery</p>
              <p className="text-gray-400 text-base md:text-lg">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-lg md:text-xl font-semibold text-gray-200">Total</p>
              <p className="text-lg md:text-xl font-semibold text-gray-200">$ {tot + 2.5}</p>
            </div>
            <button className="group flex items-center justify-center gap-1 py-2 bg-primary text-base  md:text-lg rounded-3xl text-white font-medium hover:bg-yellow-500">
              Login to check out
              <MdLogin className="text-2xl group-hover:scale-110 group-hover:rotate-[-30deg] transition-all duration-150 ease-in-out" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-evenly">
          <img
            className="w-[300px] h-[300px] object-contain"
            src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2FemptyCart.png?alt=media&token=50b733d4-cdd9-4025-bffe-8efa4066ca24"
            alt=""
          />
          <p className="text-white font-medium text-lg">Add some items to your cart !</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
