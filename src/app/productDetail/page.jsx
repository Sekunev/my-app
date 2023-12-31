"use client";
import React, { useEffect, useState } from "react";
import { data } from "../../services/data";
import ProductSlider from "../components/ProductSlider";
import ProSelectAtt from "./ProSelectAtt";
import ProSelectBarem from "./ProSelectBarem";
import { Toaster } from "react-hot-toast";

const ProductDetail = () => {
  const [variant, setVariant] = useState(
    data.productVariants.filter((item) => {
      return (
        item.attributes[1].value.toLocaleLowerCase() ==
        "Siyah".toLocaleLowerCase()
      );
    })
  );
  const [addToCart, setAddToCart] = useState({
    id: "",
    size: "",
    amount: "",
    color: "",
    price: "",
    product: "",
    totalPrice: "",
  });

  useEffect(() => {
    console.log(variant);
  }, [variant]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 mt-2 min-h-screen">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="order-1 md:order-1">
        <ProductSlider
          images={variant[0].images}
          variant={data.productVariants}
        />
      </div>
      <div className="order-2 md:order-2">
        <div className="mx-auto max-w-lg px-4 md:px-0">
          <ProSelectAtt
            data={data}
            title={data.productTitle}
            info={data.selectableAttributes}
            baremList={data.baremList}
            setAddToCart={setAddToCart}
            setVariant={setVariant}
            variant={variant}
          />
          <ProSelectBarem
            info={data.baremList}
            productVariant={data.productVariants[0]}
            setAddToCart={setAddToCart}
            addToCart={addToCart}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
