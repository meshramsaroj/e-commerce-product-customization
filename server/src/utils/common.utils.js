import { uploadFileOnCloudinary } from "./cloudinary.utils.js";

const isRequireDataMissing = (fields) => {
    return fields.some(field => field.trim() === "")
}

const getImageUrl = async (file, res) => {
    console.log(file)
    if (!file) {
		return res.status(400).json({ message: "Image file is required" });
	}

	const imageUrlResponse = await uploadFileOnCloudinary(file.path)

	if (!imageUrlResponse) {
		return res.status(400).json({ message: "File upload failed" });
	}

    return imageUrlResponse
}

export {
    isRequireDataMissing,
    getImageUrl
}