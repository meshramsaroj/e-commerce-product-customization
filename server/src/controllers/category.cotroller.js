import { Category } from "../models/category.model.js"
import { getImageUrl, isRequireDataMissing } from "../utils/common.utils.js"

const createCategory = async (req, res) => {
	const { name, slug } = req.body
	let imageUrlResponse

	if (isRequireDataMissing([name, slug])) {
		throw new Error("Required fields are missing")
	}

	const existingCategory = await Category.findOne({ $or: [{ slug }, { name }] })
	if (existingCategory) {
		return res.status(409).json({
			message: "Category already existed"
		})
	}

	if (req.file) {
		imageUrlResponse = await getImageUrl(req.file, res)
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

const updateCategory = async (req, res) => {
	const { id } = req.params
	let imageUrlResponse = null

	if (req.file) {
		imageUrlResponse = await getImageUrl(req.file, res)
	}

	const updatedCategory = await Category.findByIdAndUpdate(
		{
			_id: id
		},
		{
			$set: {
				...req.body,
				slug: req?.slug?.trim().toLowerCase(),
				image: imageUrlResponse?.url
			}
		}
	)

	if (!updatedCategory) {
		return res.status(404).json({
			message: "Category not found"
		})
	}

	return res.status(200).json({
		message: "Category updated successfully"
	})

}

const deleteCategory = async (req, res) => {
	const { id } = req.params

	const deletedCategory = await Category.findByIdAndDelete(id)

	if (!deletedCategory) {
		return res.status(404).json({
			message: "Category not found"
		})
	}

	return res.status(200).json({
		message: "Category deleted successfully"
	})

}

const getCategoryDetails = async (req, res) => {
	const { id } = req.params

	const category = await Category.findById(id)

	if (!category) {
		return res.status(404).json({
			message: "Category not found"
		})
	}

	return res.status(200).json({
		message: "Category details found",
		data: category
	})
}

const getAllCetegories = async (_, res) => {
	const categoryList = await Category.find().sort({ createdAt: -1 })

	return res.status(200).json({
		message: "Category list",
		data: {
			categories: categoryList,
			total: categoryList.length
		}
	})
}

export {
	createCategory,
	updateCategory,
	deleteCategory,
	getAllCetegories,
	getCategoryDetails
}