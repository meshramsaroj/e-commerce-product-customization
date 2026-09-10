import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		index: true
	},
	type: {
		type: String,
		enum: ["Home", "Work", "Other"],
		default: "Home",
	},
	fullName: {
		type: String,
		required: true,
		trim: true,
	},

	phone: {
		type: String,
		required: true,
		trim: true,
	},

	addressLine1: {
		type: String,
		required: true,
		trim: true,
	},
	addressLine2: {
		type: String,
		trim: true,
	},

	city: {
		type: String,
		required: true,
	},

	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
		default: "India",
	},

	postalCode: {
		type: String,
		required: true,
	},

	isDefault: {
		type: Boolean,
		default: false,
	},
	

}, { timestamps: true })


export const Address = mongoose.model("Address", addressSchema)