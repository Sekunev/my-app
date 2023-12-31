"use client";
import React, { useState } from "react";
import { data } from "../../services/data";
import ProductSlider from "../components/ProductSlider";
import ProSelectAtt from "../components/ProSelectAtt";
import ProSelectBarem from "../components/ProSelectBarem";

const ProductDetail = () => {
  //! variant: State where products of the selected color are stored Objects with black items as the initial value.
  const [variant, setVariant] = useState(
    data.productVariants.filter((item) => {
      return (
        item.attributes[1].value.toLocaleLowerCase() ==
        "Siyah".toLocaleLowerCase()
      );
    })
  );

  //! addToCart: Data added to cart
  const [addToCart, setAddToCart] = useState({
    id: "",
    size: "",
    amount: "",
    color: "",
    price: "",
    product: "",
    totalPrice: "",
  });

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 mt-2 min-h-screen">
      <div className="order-1 md:order-1">
        <ProductSlider images={variant[0].images} />
      </div>
      <div className="order-2 md:order-2">
        <div className="mx-auto max-w-lg px-4 md:px-0">
          <ProSelectAtt
            data={data}
            title={data.productTitle}
            info={data.selectableAttributes} //? Size list by colors
            baremList={data.baremList} //? Quantities and prices
            setAddToCart={setAddToCart}
            setVariant={setVariant}
            variant={variant}
          />
          <ProSelectBarem
            info={data.baremList} //? Quantities and prices
            variant={variant}
            setAddToCart={setAddToCart}
            addToCart={addToCart}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
