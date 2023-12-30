"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";

const ProSelectBarem = ({ info, setAddToCart, addToCart }) => {
  const [inputValue, setInputValue] = useState(""); // Input değeri için state
  const [amountStok, setAmountStok] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [totalPriceState, setTotalPriceState] = useState(0);

  function generateUniqueId() {
    return "xxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  const handleAddToCart = () => {
    // Yeni bir ID oluşturabilir veya mevcut bir değeri kullanabilirsiniz
    const newId = generateUniqueId(); // Örnek bir benzersiz ID oluşturma fonksiyonu

    setAddToCart((prev) => ({
      ...prev,
      id: newId, // Yeni ID'yi "addToCart" içindeki "id" özelliğine ata
    }));
  };

  // Input değeri değiştiğinde bu işlev çalışacak
  const handleInputChange = (event) => {
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    // input alanına stok adedinden fazla, rakam dışında ve negatif değer girişini engelle
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

  useEffect(() => {
    function getMaxQuantityLastItem(info) {
      const lastItem = info[info?.length - 1]; // Dizinin son elemanı
      return lastItem.maximumQuantity; // Değeri döndür
    }
    const maxQuantity = getMaxQuantityLastItem(info);
    setAmountStok(maxQuantity); // Durumu güncelle
  }, []);

  useEffect(() => {
    const selectedInfo = info.find(
      (item) =>
        inputValue >= item.minimumQuantity && inputValue <= item.maximumQuantity
    );
    // console.log("selectedInfo", selectedInfo);
    if (selectedInfo) {
      setSelectedPrice(selectedInfo.price);
      setAddToCart((prev) => ({
        ...prev,
        amount: inputValue,
        price: selectedInfo.price,
      }));
    }
  }, [inputValue, info, setAddToCart]);

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

  // console.log("info", info[info.length - 1].maximumQuantity);
  // console.log("amountStok", amountStok);
  // console.log("addToCart", addToCart);
  // console.log("addToCart", addToCart);

  return (
    <div className="container  ml-3 bg-slate-200 items-center p-2">
      <div className="flex justify-start">
        <div className="flex items-center">
          <p className="w-24 text-sm">
            Toptan Fiyat <sub>(Adet)</sub>
          </p>
          <span>:</span>
        </div>
        <div className="flex items-center">
          {info.map((item, index) => (
            <div
              key={index}
              className={`flex items-center border-r-2 border-slate-400 ${
                index === info.length - 1 ? "last:border-0" : "" //? To remove the right border of the last element
              } ${
                inputValue >= item.minimumQuantity &&
                inputValue <= item.maximumQuantity
                  ? "bg-amber-100" // Input değeri, minimum ve maksimum aralığı içeriyorsa sarı arka plan
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

      <div className="flex justify-between  mt-2">
        <div className="flex items-center">
          <label className="text-xs mr-2">Adet:</label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="100"
            max="10"
            className=" rounded p-1 w-16 text-xs text-center border-gray-300 focus:border-gray-400 outline-none px-4 "
          />
          <p className="text-xs ml-2">Adet</p>
        </div>
        <div className="flex items-center shadow-2xl rounded-lg bg-slate-300 text-green-600 p-1">
          <p className="text-xs items-center shadow-2xl font-semibold">
            Stok adedi:{" "}
            <span className="font-bold">{String(amountStok).slice(0, 4)}</span>
          </p>
        </div>
      </div>

      <div className="flex  mt-3 ">
        <div className="mt-1">
          <p className="font-bold text-xs">
            Toplam<span>:</span>
          </p>
        </div>
        <div className=" ">
          <p className="font-bold">{totalPriceState.toFixed(2)} TL</p>
          <p className="text-xs">
            Kargo Ücreti{" "}
            <span className="text-cyan-500 text-xs">Alıcı Öder</span>{" "}
          </p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="button addBasketButton font-bold bg-amber-400 w-40"
          onClick={handleAddToCart}
        >
          SEPETE EKLE
        </button>
      </div>
    </div>
  );
};

export default ProSelectBarem;
