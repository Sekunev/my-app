"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useState } from "react";

const ProSelectAtt = ({ title, info, setAddToCart, baremList }) => {
  const [mainColor, setMainColor] = useState(info[0].values[0]);
  const [mainSize, setMainSize] = useState(info[1].values[0]);

  const getMinPrice = () => {
    const minPrice = Math.min(...baremList.map((item) => item.price));
    return minPrice;
  };

  const getMaxPrice = () => {
    const maxPrice = Math.max(...baremList.map((item) => item.price));
    return maxPrice;
  };

  const handleAddToCart = (key, value) => {
    setAddToCart((prev) => ({
      ...prev,
      [key]: value,
      product: title,
    }));
  };

  return (
    <div className="container flex flex-col p-2">
      {/*section title and stars */}
      <h3 className="text-xl font-sans">{title}</h3>
      <div className="flex mb-6 mt-2">
        {Array(5)
          .fill()
          .map((_, index) => (
            <Image
              key={index}
              src="/star.svg"
              alt="Star Icon"
              width={15}
              height={15}
              priority={true}
            />
          ))}
        <p className="text-cyan-500 text-[11px] ml-3">23 Yorum</p>
      </div>
      {/*section Prices */}
      <div className="flex ">
        <h5 className="font-bold">{getMinPrice()} TL</h5>
        <span className="mx-1"> - </span>
        <h5 className="font-bold">
          {getMaxPrice()} TL
          <span className="text-slate-500 font-light text-xs ml-2">/ Adet</span>
        </h5>
      </div>
      <span className="text-slate-500 font-xs text-xs mb-5">
        100 Adet(Minumum Sİpariş Adedi)
      </span>
      {/*section Select Color and Size */}
      {info.map((item, index) => (
        <div key={index} className="flex items-center ">
          <p className="w-24 text-sm">{item.name} </p>
          <span className="">:</span>
          <div>
            {info[index].values.map((value, innerIndex) => (
              <button
                key={innerIndex}
                type="button"
                onClick={() => {
                  index === 0
                    ? (setMainColor(value), handleAddToCart("color", value))
                    : (setMainSize(value), handleAddToCart("size", value));
                }}
                className={`button ${mainSize === value && "bg-slate-300"} ${
                  mainColor === value && "bg-slate-300"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProSelectAtt;