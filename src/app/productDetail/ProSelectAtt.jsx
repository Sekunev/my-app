"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useState } from "react";
import ProSelectButton from "./ProSelectButton";

const ProSelectAtt = ({
  title,
  info,
  setAddToCart,
  baremList,
  setVariant,
  data,
}) => {
  const [mainColor, setMainColor] = useState(info[0].values[0]);
  const [mainSize, setMainSize] = useState(info[1].values[0]);
  const [State, setState] = useState();

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

  // Kullanıcı seçimi üzerine tüm seçenekleri kontrol etme
  const updateSelectableAttributes = (selectedColor) => {
    const selectedColorVariants = data.productVariants.filter((variant) =>
      variant.attributes.find(
        (attr) => attr.name === "Renk" && attr.value === selectedColor
      )
    );

    const availableSizes = new Set();
    selectedColorVariants.forEach((variant) => {
      const sizeAttr = variant.attributes.find((attr) => attr.name === "Beden");
      if (sizeAttr && sizeAttr.selectable) {
        availableSizes.add(sizeAttr.value);
      }
    });

    const updatedSelectableAttributes = data.selectableAttributes.map(
      (attr) => {
        if (attr.name === "Beden") {
          const updatedValues = attr.values.map((value) => ({
            value,
            selectable: availableSizes.has(value),
          }));
          return { ...attr, values: updatedValues };
        }
        return attr;
      }
    );

    // Güncellenmiş seçilebilir özellikleri set etme
    setState(updatedSelectableAttributes);
  };

  return (
    <div className="container flex flex-col p-2">
      {/* Section title and stars */}
      <h3 className="text-xl font-sans">{title}</h3>
      <div className="flex mb-4 mt-2 items-center">
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
      <div className="flex flex-col sm:flex-row">
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
        <span className="text-slate-500 font-xs text-xs mt-2 sm:mt-0 ml-0 sm:ml-2">
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

          <div className="flex flex-wrap sm:flex-nowrap">
            {info[index].values.map((value, innerIndex, array) => {
              console.log(array);
              <ProSelectButton
                key={innerIndex}
                value={value}
                innerIndex={innerIndex}
                index={index}
                baremList={baremList}
                setVariant={setVariant}
              />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProSelectAtt;
