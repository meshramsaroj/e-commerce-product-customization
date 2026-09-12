import { Product } from "../models/product.model.js"
import { getImageUrl } from "../utils/common.utils.js"

const getProductList = async (_, res) => {
  const products = await Product.find().sort({ createdAt: 1 })
  if (!products) {
    return res.status(404).json({
      message: "Products not found"
    })
  }

  return res.status(200).json({
    message: "Products data",
    data: {
      products,
      total: products.length
    }
  })
}

const createProduct = async (req, res) => {
  const { basePrice, discountPrice } = req.body
  const { categoryId } = req.params


  try {
    // check catgoryId preset
    if (!categoryId) {
      return res.status(404).json({
        message: "Category id is missing"
      })
    }

    // discountPrice should not be greater than basePrice
    if (discountPrice && discountPrice > basePrice) {
      return res.status(400).json({
        message: "Discount price should not be greater than base price"
      })
    }

    const imageUrls = await Promise.all(req.files.map(async file => {
      const urlResponse = await getImageUrl(file, res)
      return urlResponse.url
    }))

    const product = await Product.create({
      ...req.body,
      images: imageUrls,
      categoryId
    })

    if (!product) {
      return res.status(404).json({
        message: "Error while creating product"
      })
    }

    return res.status(201).json({
      message: "Product created successfully",
      data: {
        id: product._id
      }
    })
  } catch (error) {
    throw new Error(error.message || "Error while creating product")
  }
}

const addSpecification = async (req, res) => {
  const { id } = req.params

  const product = await Product.findByIdAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        specifications: req.body?.specifications
      }
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

  return res.status(201).json({
    message: "Specification is added successfully"
  })
}

const updateProductImages = async (req, res) => {
  const { id } = req.params

  const imageUrls = await Promise.all(req.files?.map(async file => {
    const urlResponse = await getImageUrl(file)
    return urlResponse?.url
  }))

  const updatedImages = await Product.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        images: {
          $each: imageUrls
        }
      }
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedImages) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

  return res.status(200).json({
    message: "Product images are succefully updated",
    data: {
      imageUrls
    }
  })
}


export {
  getProductList,
  createProduct,
  addSpecification,
  updateProductImages
}