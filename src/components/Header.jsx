import React from 'react';
import { Link } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';
import { BiShoppingBag } from 'react-icons/bi';
import { CgMenuLeft } from 'react-icons/cg';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const Header = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const showCart = () => {
    dispatch({
      type: actionType.SET_CARTSHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="shadow-lg fixed top-0 left-0 w-screen h-16 flex items-center justify-between px-4 py-2 bg-white z-50">
      <Link to="/" className="logo w-14 h-14 cursor-pointer">
        <img src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-3 bg-white rounded-full overflow-hidden px-4 py-[9px] md:py-[10px] w-[120px] md:w-[60%] drop-shadow-md">
        <BsSearch className="text-base text-gray-800" />
        <input
          type="text"
          placeholder="Search"
          className=" outline-none border-none text-sm md:text-lg h-5 w-full placeholder:text-sm md:placeholder:text-base placeholder:text-gray-500 text-gray-600 font-['Poppins']"
        />
      </div>
      <div className="relative cursor-pointer" onClick={showCart}>
        <BiShoppingBag className="text-2xl" />
        <span className="absolute -top-2 -right-3 w-[18px] h-[18px] bg-primary flex items-center justify-center text-white text-xs font-bold rounded-full">
          {cartItems.length}
        </span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <img
          className="w-10 h-10 cursor-pointer rounded-full overflow-hidden object-contain"
          src={avatar}
          alt="avatar"
        />
        {/* <p className="hidden lg:block md:text-base md:font-medium">Mixi Gameming</p> */}
      </div>
      <div className="w-8 h-8 flex items-center justify-center">
        <CgMenuLeft className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
