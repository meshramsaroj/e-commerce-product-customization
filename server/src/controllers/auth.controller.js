import { cookieOptions } from "../config/constants.js"
import { User } from "../models/user.model.js"
import { generateAccessAndRefreshToken } from "../service/generateToken.service.js"

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone, role, isActive } = req.body

  if (
    [firstName, lastName, email, password, role].some(field => field.trim() === "")
  ) {
    throw new Error("Required fields are missing")
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(409).json({
      message: `User is already exist with email: ${email} `
    })
  }

  await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role: role ?? "customer",
    isActive
  })

  res.status(200).json({
    message: "User created successfully",
    data: {
      email
    }
  });
}


const loginUser = async (req, res) => {
  const { email, password } = req.body

  // check user is existed
  const existingUser = await User.findOne({ email }).select("+password")
  if (!existingUser) {
    return res.status(401).json({
      message: `User is not found`
    })
  }

  const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password"
    })
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existingUser._id)
  return res.status(200).cookie("refreshToken", refreshToken, cookieOptions).cookie("accessToken", accessToken, cookieOptions).json({
    message: "User logged in successfully",
    data: { accessToken }
  })
}

const handleLogout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1, //this removed the field document
    }
  },
    { new: true }
  )

  return res.status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions).json({
      message: "Logged out successfully",
    })

}

export {
  register,
  loginUser,
  handleLogout
}