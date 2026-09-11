import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  },
  refreshToken: {
    type: String,
    unique: true,
    sparse: true
  }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next

  this.password = await bcrypt.hash(this.password, Number(process.env.PASSWORD_HASH))
  next
})


userSchema.methods.isPasswordCorrect = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ id: this._id, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )

  return accessToken
}

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ id: this._id, email: this.email, role: this.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )

  return refreshToken
}

export const User = mongoose.model("User", userSchema)