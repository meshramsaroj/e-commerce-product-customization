import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String
  },
  parentCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    index: true,
  },
  
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },


}, { timestamps: true })

export const Category = mongoose.model("Category", categorySchema)