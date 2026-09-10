import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },

        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductVariant",
            required: true,
            unique: true,
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        reservedQuantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        reorderLevel: {
            type: Number,
            default: 10,
        },

        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
        },
    },
    {
        timestamps: true,
    }
);

export const Inventory = mongoose.model("Inventory", inventorySchema)