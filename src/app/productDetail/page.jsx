"use client"; // This is a client component 👈🏽
// import React, { useState } from "react";
// import { data } from "../../services/data";
// import ProductSlider from "../components/ProductSlider";
// import ProSelectAtt from "./ProSelectAtt";
// import ProSelectBarem from "./ProSelectBarem";
// import { Toaster } from "react-hot-toast";

// const ProductDetail = () => {
//   //! State where the data added to the cart is stored
//   const [addToCart, setAddToCart] = useState({
//     id: "",
//     size: "",
//     amount: "",
//     color: "",
//     price: "",
//     product: "",
//     totalPrice: "",
//   });

//   return (
//     <main className="grid grid-cols-2 min-h-screen items-center">
//       <Toaster toastOptions={{ duration: 3000 }} />
//       {/* The 0th element of productVariants is considered selected. */}
//       <ProductSlider images={data.productVariants[0].images} />
//       <div className="ml-2">
//         <ProSelectAtt
//           title={data.productTitle}
//           info={data.selectableAttributes}
//           baremList={data.baremList}
//           setAddToCart={setAddToCart}
//         />
//         <ProSelectBarem
//           info={data.baremList}
//           productVariant={data.productVariants[0]}
//           setAddToCart={setAddToCart}
//           addToCart={addToCart}
//         />
//       </div>
//     </main>
//   );
// };

// export default ProductDetail;

import React, { useState } from "react";
import { data } from "../../services/data";
import ProductSlider from "../components/ProductSlider";
import ProSelectAtt from "./ProSelectAtt";
import ProSelectBarem from "./ProSelectBarem";
import { Toaster } from "react-hot-toast";

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

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 sm:mt-3 min-h-screen">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="order-1 md:order-1">
        <ProductSlider images={data.productVariants[0].images} />
      </div>
      <div className="order-2 md:order-2">
        <div className="mx-auto max-w-lg px-4 md:px-0">
          <ProSelectAtt
            title={data.productTitle}
            info={data.selectableAttributes}
            baremList={data.baremList}
            setAddToCart={setAddToCart}
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
