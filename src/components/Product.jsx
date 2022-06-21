import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { MdAddShoppingCart } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const Product = ({ item }) => {
  const [favourite, setFavourite] = useState(false);
  const [valueStar, setValueStar] = useState(Math.floor(item.ratings));
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...ProductExist,
                qty: ProductExist.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  useEffect(() => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const handleStar = (value) => {
    setValueStar(value);
  };
  return (
    <div className="mt-10 group relative flex items-center justify-end flex-col w-[184px] h-48">
      <div className="w-[100px] h-[100px] flex items-center justify-center absolute -top-8 z-10 group-hover:scale-[1.15] transition-all duration-300 ease-in-out">
        <img className="w-full h-full object-contain" src={item?.imgSrc} alt={item?.name} />
      </div>
      <div
        className={`absolute top-16 z-10 right-3 cursor-pointer ${
          favourite ? 'drop-shadow-[0px_0px_8px_#ff0000]' : ''
        }`}
        onClick={() => setFavourite(!favourite)}
      >
        <FcLike className="text-lg" />
      </div>
      <div className="flex gap-2 flex-col p-2 pt-14 w-full h-[150px] bg-white rounded-2xl drop-shadow-[0px_0px_20px_rgb(0,0,0,0.15)]">
        <h3 className="text-lg font-semibold text-textColor">{item?.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2 flex-col">
            <div className="flex items-center justify-center gap-1">
              {Array.apply(null, { length: 5 }).map((e, i) => (
                <i key={i} onClick={() => handleStar(i + 1)}>
                  <AiFillStar
                    className={`text-sm cursor-pointer ${valueStar > i ? 'text-primary' : 'text-gray-600'}`}
                  />
                </i>
              ))}
            </div>
            <div>
              <h3 className="flex gap-1 items-center text-base font-semibold text-textColor">
                <span className="text-primary text-sm">$</span>
                {item?.price}
              </h3>
            </div>
          </div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="flex items-center justify-center w-8 h-8 bg-primary rounded-full cursor-pointer"
            onClick={() => addtocart(item)}
          >
            <MdAddShoppingCart className="text-white text-base font-bold" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product;
