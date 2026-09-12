import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    index: true,
  },

  brand: {
    type: String,
    trim: true,
    index: true,
  },

  images: [
    {
      type: String,
    },
  ],

  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },

  discountPrice: {
    type: Number,
    min: 0
  },

  specifications: {
    type: Map, // it can have diffrenet attribute, which will be type of string
    of: String,
    default: null
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },


}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)