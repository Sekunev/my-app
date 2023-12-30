"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import { data } from "../../services/data";
import ProductSlider from "../components/ProductSlider";
import ProSelectAtt from "./ProSelectAtt";
import ProSelectBarem from "./ProSelectBarem";
import AddToCart from "./AddToCart";

const ProductDetail = () => {
  const [addToCart, setAddToCart] = useState({
    id: "",
    size: "",
    amount: "",
    color: "",
    price: "",
    product: "",
    totalPrice: "",
  });
  // console.log("data", data);
  return (
    <main className=" grid grid-cols-2 min-h-screen items-center ">
      <ProductSlider images={data.productVariants[0].images} />
      <div>
        <ProSelectAtt
          title={data.productTitle}
          info={data.selectableAttributes}
          baremList={data.baremList}
          setAddToCart={setAddToCart}
          addToCart={addToCart}
        />
        <ProSelectBarem
          info={data.baremList}
          setAddToCart={setAddToCart}
          addToCart={addToCart}
        />
      </div>
    </main>
  );
};

export default ProductDetail;
