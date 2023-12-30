"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Image from "next/image";

const ProductSlider = ({ images }) => {
  //* When the page is first loaded, the 0th element of the photo list will appear as a large photo.
  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <div>
      <div className="container mx-auto h-[90vh] border-2 border-slate-950 ">
        <div className="flex justify-center">
          <Image
            src={mainImg}
            alt="product main image"
            width={400}
            height={400}
            className=" h-auto rounded-lg"
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-x-1 border border-red-500 w-[20rem]">
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt="product alt image"
                width={80}
                height={100}
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
