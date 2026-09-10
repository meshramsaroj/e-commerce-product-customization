import mongoose, { Schema } from "mongoose";

const productVariantSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true,
  },

  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },

  /*
   attributes: {
    color: "Red",
    size: "M"
  },
  */
  attributes: {
    type: Map,
    of: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  discountPrice: {
    type: Number,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  images: [
    {
      type: String,
    }
  ],

  isActive: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true })

export const ProductVariant = mongoose.model("ProductVariant", productVariantSchema)