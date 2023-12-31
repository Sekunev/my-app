import { setAddToCart } from "../app/productDetail/page";
import { variant } from "../app/productDetail/page";

const useHook = () => {
  const handleAddToCart = (key, value) => {
    //   setAddToCart((prev) => ({
    //     ...prev,
    //     [key]: value,
    //   }));
    console.log(111);
  };
  const findItemID = () => {
    console.log("variant", variant);
    //   const selectedItem = variant.find(
    //     (variant) =>
    //       variant.attributes.some(
    //         (attr) => attr.name === "Renk" && attr.value === mainColor
    //       ) &&
    //       variant.attributes.some(
    //         (attr) => attr.name === "Beden" && attr.value === mainSize
    //       )
    //   );

    //   if (selectedItem) {
    //     return selectedItem.id;
    //   }

    //   return "Böyle bir ürün bulunamadı.";
  };
  return { handleAddToCart, findItemID };
};

export default useHook;
