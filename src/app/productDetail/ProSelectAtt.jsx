"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
// import { handleAddToCart } from "../../services/func";

const ProSelectAtt = ({ title, info, setAddToCart, addToCart, baremList }) => {
  const [mainColor, setMainColor] = useState(info[0].values[0]);
  const [mainSize, setMainSize] = useState(info[1].values[0]);
  const [clickedButtons, setClickedButtons] = useState([]);

  console.log("info", info);
  console.log("addToCart", addToCart);
  //   console.log("mainColor", mainColor);
  // console.log("baremList", baremList);

  const handleAddToCart = (key, value) => {
    setAddToCart((prev) => ({
      ...prev,
      [key]: value,
      product: title,
    }));
  };

  const getMinPrice = () => {
    const minPrice = Math.min(...baremList.map((item) => item.price));
    return minPrice;
  };

  const getMaxPrice = () => {
    const maxPrice = Math.max(...baremList.map((item) => item.price));
    return maxPrice;
  };

  return (
    <div className="container flex flex-col ml-3">
      <h3 className="mb-6 font-bold">{title}</h3>
      <div className="flex ">
        <h5 className="font-bold">{getMinPrice()} TL</h5>
        <span className="mx-1"> - </span>
        <h5 className="font-bold">
          {getMaxPrice()} TL{" "}
          <span className="text-slate-500 text-xs ml-2">/Adet</span>
        </h5>
      </div>
      <span className="text-slate-500 font-xs text-xs mb-5">
        100 Adet(Minumum Sİpariş Adedi)
      </span>

      {info.map((item, index) => (
        <div key={index} className="flex items-center ">
          <p className="w-24 text-sm">{item.name} </p>
          <span>:</span>
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
                disabled={true}
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
