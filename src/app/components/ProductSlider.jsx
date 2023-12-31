// "use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ProductSlider = ({ images }) => {
  //* When the page is first loaded, the 0th element of the photo list will appear as a large photo.
  const [mainImg, setMainImg] = useState(images[0]);

  //* Update mainImg when images coming as probs change.
  useEffect(() => {
    setMainImg(images[0]);
  }, [images]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center ">
        <div className="w-full md:w-2/3">
          <div className="flex justify-center">
            <Image
              src={mainImg}
              alt="product main image"
              width={400}
              height={550}
              className="h-auto rounded-lg"
              priority={true}
            />
          </div>

          <div className=" mt-4 mx-auto grid grid-cols-4 md:grid-cols-none sm:flex sm:justify-center sm:gap-4  max-w-lg">
            {images.map((image, index) => (
              <div key={index} className="mb-2 md:mb-0 mx-auto">
                <Image
                  src={image}
                  alt="product alt image"
                  width={70}
                  height={80}
                  onClick={() => setMainImg(images[index])}
                  //* Let the selected photo be opacity-50
                  className={`cursor-pointer rounded-lg ${
                    mainImg === image ? "opacity-50" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
