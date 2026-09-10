import { User } from "../models/user.model.js"

const generateAccessAndRefreshToken = async (id) => {
	try {
		const user = await User.findById(id)
		const accessToken = user.generateAccessToken()
		const refreshToken = user.generateRefreshToken()

		user.refreshToken = refreshToken
		user.lastLoginAt = Date.now()

		await user.save({ validateBeforeSave: false })

		return { accessToken, refreshToken }
	}
	catch (error) {
		throw ApiError(404, "Access and Refresh token generation is failed");
	}

}

export {
	generateAccessAndRefreshToken
}