// "use client"; // This is a client component 👈🏽
// import React, { useEffect, useState } from "react";

// const AddToCart = ({ info, addToCart, setAddToCart }) => {
//   // console.log("info", info);
//   const [totalPriceState, setTotalPriceState] = useState(0);

//   // Herhangi bir değişiklik olduğunda totalPriceState'i güncelle
//   // useEffect(() => {
//   //   // Güncel totalPrice'i hesapla ve durumu güncelle
//   //   const calculateTotalPrice = () => {
//   //     const price = addToCart.price || 0;
//   //     const amount = addToCart.amount || 0;
//   //     const totalPrice = price * amount;
//   //     setTotalPriceState(totalPrice);
//   //   };

//   //   calculateTotalPrice(); // totalPrice'i hesapla
//   // }, [addToCart]);
//   useEffect(() => {
//     // inputValue boşsa totalPrice'ı sıfırla
//     if (inputValue === "") {
//       setTotalPriceState(0);
//     } else {
//       // Değilse, totalPrice'ı hesapla
//       const calculateTotalPrice = () => {
//         const price = addToCart.price || 0;
//         const amount = addToCart.amount || 0;
//         const totalPrice = price * amount;
//         setTotalPriceState(totalPrice);
//       };

//       calculateTotalPrice();
//     }
//   }, [addToCart, inputValue]);
//   console.log("addToCart", addToCart);

//   return (
//     <div className="container  ml-3 bg-slate-300 items-center p-2">
//       <div className="flex">
//         <div className="flex">
//           <p>Toplam</p>
//           <span>:</span>
//         </div>
//         <div>{totalPriceState}</div>
//       </div>
//     </div>
//   );
// };

// export default AddToCart;
