import React from "react";
import toast from "react-hot-toast";

const AddToCart = ({ addToCart, variant, setAddToCart, inputValue }) => {
  //? isAllDataFilled Checks whether all data to be added to the cart complies with the rules
  const isAllDataFilled =
    addToCart.size !== "" &&
    addToCart.amount !== "" &&
    parseInt(addToCart.amount) >= 120 &&
    inputValue >= 120 &&
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
  console.log("addToCart", addToCart);

  return (
    <div className="md:ml-[6.8rem] mt-2 md:flex md:items-center ">
      <button
        type="button"
        className={`button addBasketButton font-bold bg-amber-500 w-full md:w-40 md:mr-2 ${
          isAllDataFilled
            ? "text-white hover:bg-amber-600"
            : "text-gray-600 bg-yellow-300 "
        } `}
        // ${isAllDataFilled || "hover:bg-amber-100 "}
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
