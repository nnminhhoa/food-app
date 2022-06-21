import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const CartItem = ({ item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(item.qty);
  const cartDispatch = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch(items);
    } else {
      if (qty === 1) {
        let items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch(items);
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch(items);
      }
    }
  };

  useEffect(() => {
    setQty(item.qty);
    setItems(cartItems);
  }, [cartItems, item]);
  return (
    <div className="flex rounded-lg bg-cartItem gap-2 w-full p-1 px-2">
      <img className="w-20 h-20 rounded-full max-w-[60px] object-contain" src={item?.imgSrc} alt={item?.name} />
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="text-base text-gray-50 ">{item?.name}</p>
        <p className="text-gray-50 font-semibold text-sm">$ {item?.price}</p>
      </div>
      <div className="flex gap-2 ml-auto items-center">
        <motion.div whileTap={{ scale: 0.75 }} className="cursor-pointer" onClick={() => updateQty('remove', item?.id)}>
          <BiMinus className="text-white text-lg" />
        </motion.div>
        <p className="text-white text-base rounded-sm w-5 h-5 bg-cartBg flex items-center justify-center">{qty}</p>
        <motion.div whileTap={{ scale: 0.75 }} className="cursor-pointer" onClick={() => updateQty('add', item?.id)}>
          <BiPlus className="text-white text-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
