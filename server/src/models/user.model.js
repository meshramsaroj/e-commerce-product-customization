import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        select: false // while fetching user data we dont want to send pasword details
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
        required: true,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    lastLoginAt: {
        type: Date
    }


}, { timestamps: true })

export const User = mongoose.model("User", userSchema)