import mongoose, { Schema } from "mongoose";

const bookImageSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const Book = mongoose.model("Book", bookImageSchema)