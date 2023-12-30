"use client"; // This is a client component 👈🏽
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProSelectBarem = ({ info, setAddToCart, addToCart, productVariant }) => {
  const [inputValue, setInputValue] = useState("");
  const [amountStok, setAmountStok] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [totalPriceState, setTotalPriceState] = useState(0);

  //? isAllDataFilled Checks whether all the data to be added to the cart is filled or not
  const isAllDataFilled =
    addToCart.size !== "" &&
    addToCart.amount !== "" &&
    addToCart.color !== "" &&
    addToCart.price !== "" &&
    addToCart.product !== "" &&
    addToCart.totalPrice !== "";

  //? Assign id to addToCart when adding to cart
  const handleAddToCart = () => {
    setAddToCart((prev) => ({
      ...prev,
      id: productVariant.id, // Yeni ID'yi "addToCart" içindeki "id" özelliğine ata
    }));
  };

  // Prevent the entry of more than the stock quantity, other than numbers, and negative values into the input field
  const handleInputChange = (event) => {
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);

    if (
      !isNaN(parsedValue) &&
      parsedValue >= 0 &&
      parsedValue <= info[info.length - 1].maximumQuantity
    ) {
      setInputValue(parsedValue);
    } else {
      setInputValue("");
    }
  };

  // Assign the maximum Quantity value of the last element of the array to Amount Stock state
  useEffect(() => {
    function getMaxQuantityLastItem(info) {
      const lastItem = info[info?.length - 1]; // Dizinin son elemanı
      return lastItem.maximumQuantity; // Değeri döndür
    }
    const maxQuantity = getMaxQuantityLastItem(info);
    setAmountStok(maxQuantity); // Durumu güncelle
  }, []);

  //? Assign the relevant object in baremList to selectedInfo according to the value entered into input. Fill in the items to add to the cart
  useEffect(() => {
    const selectedInfo = info.find(
      (item) =>
        inputValue >= item.minimumQuantity && inputValue <= item.maximumQuantity
    );

    // console.log("selectedInfo", selectedInfo);>> {minimumQuantity: 120, maximumQuantity: 599, price: 9.5}

    if (selectedInfo) {
      setSelectedPrice(selectedInfo.price);
      setAddToCart((prev) => ({
        ...prev,
        amount: inputValue,
        price: selectedInfo.price,
      }));
    }
  }, [inputValue, info, setAddToCart]);

  //? Perform the necessary mathematical operation for totalPrice.
  useEffect(() => {
    // inputValue boşsa totalPrice'ı sıfırla
    if (inputValue === "") {
      setTotalPriceState(0);
      setAddToCart((prev) => ({
        ...prev,
        totalPrice: 0,
      }));
    } else {
      // Değilse, totalPrice'ı hesapla
      const calculateTotalPrice = () => {
        const price = selectedPrice || 0;
        const amount = inputValue || 0;
        const totalPrice = amount < 100 ? 0 : price * amount;
        setTotalPriceState(totalPrice);
        setAddToCart((prev) => ({
          ...prev,
          totalPrice,
        }));
      };

      calculateTotalPrice();
    }
  }, [inputValue, selectedPrice, setAddToCart]);
  console.log("addToCart", addToCart);
  return (
    <div className="container mt-3">
      <div className="bg-slate-200 p-2 w-2/3">
        {/*section Toptan Fiyat */}
        <div className="flex justify-start">
          <div className="flex items-center">
            <p className="w-24 text-sm">
              Toptan Fiyat <sub>(Adet)</sub>
            </p>
            <span>:</span>
          </div>
          <div className="flex items-center ml-1">
            {info.map((item, index) => (
              <div
                key={index}
                className={`flex items-center border-r-2 border-slate-400 rounded-sm ${
                  index === info.length - 1 ? "last:border-0" : "" //? To remove the right border of the last element
                } ${
                  inputValue >= item.minimumQuantity &&
                  inputValue <= item.maximumQuantity
                    ? "bg-amber-100" // Amber background if the input value contains the minimum and maximum rangeplan
                    : ""
                }`}
              >
                <div className="flex flex-col  items-center">
                  <p className="m-3 text-xs">
                    {index === info.length - 1
                      ? `${item.minimumQuantity} +`
                      : `${item.minimumQuantity}-${item.maximumQuantity}`}
                  </p>
                  <p className="text-xs">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*section İnput & Stok adedi. */}
        <div className="flex justify-between  mt-5">
          <div className="flex items-center ">
            <label className=" w-24 text-sm">Adet</label>
            <span>:</span>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              min="100"
              max="10"
              className=" ml-1 rounded p-1 w-16 text-xs text-center border-gray-300 focus:border-gray-400 outline-none px-4 "
            />
            <p className="text-xs ml-2">Adet</p>
          </div>
          <div className="flex items-center shadow-2xl rounded-lg bg-slate-50 text-green-600 p-2 mr-5">
            <p className="text-xs items-center shadow-2xl font-medium">
              Stok adedi:{" "}
              <span className="font-bold">
                {String(amountStok).slice(0, 4)}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/*section Toplam & Stok adedi. */}
      <div className="flex mt-3 ml-2">
        <div className="flex">
          <p className="font-bold w-24 text-sm">Toplam</p>
          <span>:</span>
        </div>
        <div className="">
          <div className="flex items-center">
            <p className="font-bold ml-1">
              {totalPriceState.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              TL
            </p>
          </div>
          <div className="flex m-1">
            <Image
              src="/cargo.svg"
              alt="Cargo Icon"
              width={15}
              height={15}
              className=" mr-1"
              priority={true}
            />
            <p className="text-xs ml-1">
              Kargo Ücreti{" "}
              <span className="text-cyan-500 text-xs">Alıcı Öder</span>{" "}
            </p>
          </div>
        </div>
      </div>
      {/*section SEPETE EKLE */}
      <div className="ml-[6.8rem] mt-2">
        <button
          type="button"
          className="button addBasketButton font-bold text-white bg-amber-400 w-40"
          onClick={() => {
            // handleAddToCart();
            // toast.success("Sepete Eklendi!");
            if (!isAllDataFilled) {
              toast.error("Sepet!");
              return;
            }
            handleAddToCart();
            toast.success("Sepete Eklendi!");
          }}
          // disabled={!isAllDataFilled}
        >
          SEPETE EKLE
        </button>
        <span className="text-cyan-500 text-xs ml-2">Ödeme Seçenekleri</span>
      </div>
    </div>
  );
};

export default ProSelectBarem;
