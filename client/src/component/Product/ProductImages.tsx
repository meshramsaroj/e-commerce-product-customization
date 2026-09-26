import { useState } from "react";

interface ProductImagesProps {
  id: string;
  images: string[];
}

const ProductImages = ({ id, images }: ProductImagesProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col pt-5">

      <div className="w-full h-50 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${selected * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full shrink-0"
            >
              <img
                src={image}
                alt={`Product ${id} image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`Show image ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${selected === index
              ? "w-5 bg-primary"
              : "w-2 bg-base-300"
              }`}
          />
        ))}
      </div>


    </div>
  );
};

export default ProductImages;