import { Category } from "../models/category.model.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.utils.js"
import { isRequireDataMissing } from "../utils/common.utils.js"

const createCategory = async (req, res) => {
	const { name, slug } = req.body

	if (isRequireDataMissing([name, slug])) {
		throw new Error("Required fields are missing")
	}

	const existingCategory = await Category.findOne({ $or: [{ slug }, { name }] })
	if (existingCategory) {
		return res.status(409).json({
			message: "Category already existed"
		})
	}

	if (!req.file) {
		return res.status(400).json({ message: "Image file is required" });
	}

	const imageUrlResponse = await uploadFileOnCloudinary(req.file.path)

	if (!imageUrlResponse) {
		return res.status(400).json({ message: "File upload failed" });
	}

	const newCategory = await Category.create({
		...req.body,
		slug: slug.trim().toLowerCase(),
		image: imageUrlResponse?.url,
	})

	if (!newCategory) {
		return res.status(404).json({
			message: "Something wrong while creating category"
		})
	}

	return res.status(201).json({
		message: "Category created succcessfully",
		data: newCategory
	})



}

const getAllCetegories = async (req, res) => {

}

export {
	createCategory,
	getAllCetegories
}