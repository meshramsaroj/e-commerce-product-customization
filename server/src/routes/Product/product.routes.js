import { Router } from "express"
import { verifyJWTToken } from "../../middelwares/authVerify.middleware.js"
import { verifyAdmin } from "../../middelwares/roleVerify.middlerware.js"
import {
	addSpecification,
	createProduct,
	deleteProduct,
	getProductList,
	updateProduct,
	updateProductImages,
} from "../../controllers/product.controller.js"
import { upload } from "../../middelwares/multer.middleware.js"

const router = Router()

router.route("/")
	.get(getProductList)

router.route("/:categoryId")
	.post(verifyJWTToken, verifyAdmin, upload.array("images"), createProduct)

router.route("/:id")
	.patch(verifyJWTToken, verifyAdmin, upload.array("images"), updateProduct)
	.delete(verifyJWTToken, verifyAdmin, deleteProduct)

// this one is working for adding , updating, or delete specification
router.route("/:id/specifications").patch(
	verifyJWTToken,
	verifyAdmin,
	addSpecification
)

// update images
router.route("/:id/images").patch(
	verifyJWTToken,
	verifyAdmin,
	upload.array("images"),
	updateProductImages
)



export default router