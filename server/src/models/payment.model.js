import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: [
        "card",
        "upi",
        "netbanking",
        "wallet",
        "cod",
      ],
      required: true,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true, // Documents without an ID are allowed
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "success",
        "failed",
        "refunded",
      ],
      default: "created",
      index: true,
    },

    paidAt: {
      type: Date,
    },

    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed, // it can store any kind of attribute with different data type
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema)