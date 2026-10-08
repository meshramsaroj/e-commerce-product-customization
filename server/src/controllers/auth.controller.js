import { cookieOptions } from "../config/constants.js"
import { User } from "../models/user.model.js"
import { generateAccessAndRefreshToken } from "../services/generateToken.service.js"
import { isRequireDataMissing } from "../utils/common.utils.js"

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone, role, isActive } = req.body

  if (
    isRequireDataMissing([firstName, lastName, email, password, role])
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
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decodedToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        await User.findByIdAndUpdate(decodedToken._id, {
          $unset: {
            refreshToken: 1,
          },
        });
      } catch (error) {
        throw new Error(error)
        // Refresh token expired/invalid.
        // We can still logout the user.
      }
    }

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        message: "Logged out successfully",
      });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

const handleUserDetails = async (req, res) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized user"
    })
  }

  return res.status(200).json({
    message: "User details fetched successfully",
    data: user
  })
}

const getAllUsers = async (_, res) => {
  const users = await User.find()

  return res.status(200).json({
    message: "All users",
    data: {
      users,
      total: users.length
    }
  })

}

export {
  register,
  loginUser,
  handleLogout,
  handleUserDetails,
  getAllUsers
}