import { memo } from "react";
import ProductImages from "./ProductImages";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

const formatPrice = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(val)
}
const ProductItemCard = ({ product }) => {

  const price = product.basePrice - product.discountPrice
  const discountPercentage =
    Math.round(((product.discountPrice) / product.basePrice) * 100);
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <ProductImages id={product._id} images={product.images} />

      </figure>
      <div className="card-body  flex-col items-start">
        <div className="badge badge-secondary">{product.brand}</div>
        <h2 className="card-title truncate-text ">
          {product.name}
        </h2>
        <Rating id={product._id} rating={product?.rating || 5} />
        <p className="flex-row flex gap-3">
          <strong>{formatPrice(price)}</strong>
          <span className="strickThrough">{formatPrice(product?.basePrice)}</span>
          <span>({discountPercentage}% off)</span>
        </p>
        <div className="card-actions justify-end">
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductItemCard);