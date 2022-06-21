import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { BsChevronRight } from 'react-icons/bs';
import delivery from '../assets/images/delivery.png';

import { Items, MenuItems } from '../assets/fakeData/Data';
import Product from '../components/Product';

const Home = () => {
  const [filter, setFilter] = useState('buger01');

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Items.filter((e) => e.itemId === filter));
  }, [filter]);
  return (
    <div className="mt-16 py-3 px-2 md:mt-16 md:py-3 md:px-8">
      {/* Banner */}
      <div className="w-full bg-banner bg-no-repeat bg-center rounded-xl bg-cover flex items-center justify-between">
        <div className="p-3 md:p-6 flex flex-col items-start justify-center gap-2 md:gap-3">
          <h3 className="text-xl md:text-2xl font-medium text-textColor">Hello Jeremy,</h3>
          <p className="text-gray-400 text-xs md:text-sm font-normal w-40 md:w-fit leading-5">
            Get free discount for every <span className="text-primary">$20</span> purchase
          </p>
          <Link to="/">
            <button className="rounded-full bg-primary hover:opacity-85 font-medium md:font-semibold hover:shadow-lg py-1 px-3 md:py-2 md:px-4 text-white text-sm md:text-base">
              Learn More
            </button>
          </Link>
        </div>
        <div className="flex items-center">
          <img className="object-cover w-36 h-36 md:w-44 md:h-44" src={delivery} alt="delivery" />
        </div>
      </div>

      {/* Main */}
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-base md:text-lg font-medium text-textColor">Menu Food</h3>
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <span className="text-primary text-sm">View All</span>
            <div className="flex items-center justify-center w-4 h-4 md:h-5 md:w-5 rounded-md bg-primary">
              <BsChevronRight className="text-white text-xs" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-scroll scrollbar-none md:gap-10 my-2 md:m-2 md:p-2">
          {MenuItems &&
            MenuItems.map((item) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                transition={{ duration: 0.07 }}
                key={item?.id}
                className={`group ${
                  filter === item.itemId ? 'bg-primary' : 'bg-white'
                } w-[90px] min-w-[80px] h-[95px] md:h-[105px] gap-1 md:gap-2 cursor-pointer hover:bg-primary rounded-lg flex items-center justify-center flex-col transition-all duration-150 ease-in-out `}
                onClick={() => setFilter(item.itemId)}
              >
                <div className="w-10 h-10 flex items-center justify-center min-h-10 min-w-10 rounded-full bg-white">
                  <img
                    className="object-cover w-3/4 group-hover:scale-125 scale-100 transition-all duration-150 ease-in-out"
                    src={item?.imgSrc}
                    alt={item?.name}
                  />
                </div>
                <h3
                  className={`text-sm font-semibold group-hover:text-white  ${
                    filter === item.itemId ? 'text-white' : 'text-primary'
                  }`}
                >
                  {item?.name}
                </h3>
                <div
                  className={`w-[18px] h-[18px] group-hover:bg-white rounded-md flex items-center justify-center ${
                    filter === item.itemId ? 'bg-white' : 'bg-primary'
                  }`}
                >
                  <BsChevronRight
                    className={` group-hover:text-primary text-[10px] ${
                      filter === item.itemId ? 'text-primary' : 'text-white'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
        </div>

        <div className=" flex items-center justify-center gap-4 flex-wrap">
          {data.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
