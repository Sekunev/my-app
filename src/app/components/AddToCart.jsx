import React from "react";
import toast from "react-hot-toast";

const AddToCart = ({ addToCart, variant, setAddToCart }) => {
  //? isAllDataFilled Checks whether all the data to be added to the cart is filled or not
  const isAllDataFilled =
    addToCart.size !== "" &&
    addToCart.amount !== "" &&
    addToCart.color !== "" &&
    addToCart.price !== "" &&
    addToCart.product !== "" &&
    addToCart.totalPrice !== "";

  //? Find the ID of the selected color and size
  const findItemID = () => {
    const selectedItem = variant.find(
      (variant) =>
        variant.attributes.some(
          (attr) => attr.name === "Renk" && attr.value === addToCart.color
        ) &&
        variant.attributes.some(
          (attr) => attr.name === "Beden" && attr.value === addToCart.size
        )
    );

    if (selectedItem) {
      return selectedItem.id;
    }

    return "Böyle bir ürün bulunamadı.";
  };

  //* Add selected data to Cart
  const handleAddToCart = (key, value) => {
    setAddToCart((prev) => ({
      ...prev,
      [key]: value,
      id: findItemID(),
    }));
  };

  return (
    <div className="md:ml-[6.8rem] mt-2 md:flex md:items-center ">
      <button
        type="button"
        className={`button addBasketButton font-bold text-white bg-amber-400 w-full md:w-40 md:mr-2 ${
          isAllDataFilled || "bg-slate-500"
        } ${isAllDataFilled || "hover:bg-slate-700"}`}
        onClick={() => {
          if (!isAllDataFilled) {
            toast.error("Ürün Sepete Eklenemedi!");
            return;
          }
          handleAddToCart();
          toast.success("Ürün Sepete Eklendi!");
        }}
        disabled={!isAllDataFilled}
      >
        SEPETE EKLE
      </button>
      <span className="text-cyan-500 text-xs mt-2 md:mt-0">
        Ödeme Seçenekleri
      </span>
    </div>
  );
};

export default AddToCart;
