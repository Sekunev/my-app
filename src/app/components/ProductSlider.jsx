"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Image from "next/image";

const ProductSlider = ({ images }) => {
  //* When the page is first loaded, the 0th element of the photo list will appear as a large photo.
  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <div>
      <div className="container items-center mx-auto h-[70vh] w-2/3">
        <div className="flex justify-center">
          <Image
            src={mainImg}
            alt="product main image"
            width={300}
            height={400}
            className=" h-auto rounded-lg"
            priority={true}
          />
        </div>

        <div className="mt-4 mx-auto grid grid-cols-4 gap-x-1 w-[20rem]">
          {images.map((image, index) => (
            <div key={index}>
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
  );
};

export default ProductSlider;
