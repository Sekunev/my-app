import ProductDetail from "./productDetail/page";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <ProductDetail />
    </>
  );
}
