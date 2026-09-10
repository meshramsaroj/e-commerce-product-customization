import mongoose, { Schema } from "mongoose";
const productReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    images: [
      {
        type: String,
      },
    ],

    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductReview = mongoose.model("ProductReview", productReviewSchema)