"use client";
import React, { useState } from "react";

const ProSelectButton = ({ value, innerIndex, index, baremList }) => {
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
  console.log(value, value);
  return (
    <button
      type="button"
      onClick={() => {
        index === 0
          ? (setMainColor(value), handleAddToCart("color", value))
          : (setMainSize(value), handleAddToCart("size", value));
        setVariant(
          data.productVariants.filter((item) => {
            return (
              item.attributes[1].value.toLocaleLowerCase() ==
              value.toLocaleLowerCase()
            );
          })
        );
      }}
      className={`button ${
        (index === 0 && mainColor === value) ||
        (index === 1 && mainSize === value)
          ? "bg-slate-300"
          : ""
      }`}
    >
      {value}
    </button>
  );
};

export default ProSelectButton;
