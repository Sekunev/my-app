"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useState } from "react";

const ProSelectAtt = ({
  title,
  info,
  setAddToCart,
  baremList,
  setVariant,
  data,
  variant,
}) => {
  const [mainColor, setMainColor] = useState(info[0].values[0]); //? Selected product color
  const [mainSize, setMainSize] = useState(info[1].values[0]); //? Selected product size

  //* lowest price
  const getMinPrice = () => {
    const minPrice = Math.min(...baremList.map((item) => item.price));
    return minPrice;
  };

  //* highest price
  const getMaxPrice = () => {
    const maxPrice = Math.max(...baremList.map((item) => item.price));
    return maxPrice;
  };

  //* Add selected data to Cart
  const handleAddToCart = (key, value) => {
    setAddToCart((prev) => ({
      ...prev,
      [key]: value,
      product: title,
    }));
  };

  //* What happens when you click on the color selection button
  const handleClickColorButton = (value) => {
    setMainColor(value);
    setMainSize("");
    handleAddToCart("color", value);
    setVariant(
      data.productVariants.filter((item) => {
        return (
          item.attributes[1].value.toLocaleLowerCase() ===
          value.toLocaleLowerCase()
        );
      })
    );
  };

  //* What happens when you click on the size selection button
  const handleClickSizeButton = (value) => {
    setMainSize(value), handleAddToCart("size", value);
  };

  return (
    <div className="container flex flex-col p-2">
      {/* Section title and stars */}
      <h3 className="text-xl font-sans">{title}</h3>
      <div className="flex mb-4 mt-2 items-center">
        {/* Create 5 stars */}
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
        <p className="text-cyan-500 text-xs ml-2">23 Yorum</p>
      </div>

      {/* Section Prices */}
      <div className="flex flex-col ">
        <div className="flex items-center">
          <h5 className="font-bold">{getMinPrice()} TL</h5>
          <span className="mx-1"> - </span>
          <h5 className="font-bold">
            {getMaxPrice()} TL
            <span className="text-slate-500 font-light text-xs ml-2">
              / Adet
            </span>
          </h5>
        </div>
        <span className="text-slate-500 font-xs text-xs mt-2 sm:mt-0 ml-0 ">
          100 Adet(Minimum Sipariş Adedi)
        </span>
      </div>

      {/* Section Select Color and Size */}
      {info.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-center mt-3"
        >
          <p className="w-full sm:w-24 text-sm mb-1 sm:mb-0">
            {item.name}
            <span className="mx-1">:</span>
          </p>

          {/* Section Select Color  */}
          <div className="flex flex-wrap sm:flex-nowrap">
            {info[index].values.map((value, innerIndex) => {
              if (info[index].name == "Renk") {
                return (
                  <button
                    key={innerIndex}
                    type="button"
                    onClick={() => handleClickColorButton(value)}
                    className={`button border-slate-500 ${
                      mainSize === value && "bg-slate-400"
                    } ${mainColor === value && "bg-slate-400"}`}
                  >
                    {value}
                  </button>
                );
              } else if (info[index].name == "Beden") {
                {
                  /* Section Select Size  */
                }
                //* Is there a size in the selected color?
                const isSizeActive =
                  variant.filter((item) => {
                    return item.attributes[0].value == value;
                  }).length > 0;
                return (
                  <button
                    key={innerIndex}
                    type="button"
                    onClick={() => handleClickSizeButton(value)}
                    className={`button ${
                      mainSize === value && "bg-slate-300"
                    } ${mainColor === value && "bg-slate-300"} ${
                      !isSizeActive && "border-red-500"
                    } ${isSizeActive && "border-green-500"}`}
                    disabled={!isSizeActive}
                  >
                    {value}
                  </button>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProSelectAtt;
