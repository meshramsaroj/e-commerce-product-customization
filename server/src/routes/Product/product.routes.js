import { Router } from "express"
import { verifyJWTToken } from "../../middelwares/authVerify.middleware.js"
import { verifyAdmin } from "../../middelwares/roleVerify.middlerware.js"
import { addSpecification, createProduct, getProductList, updateProductImages } from "../../controllers/product.controller.js"
import { upload } from "../../middelwares/multer.middleware.js"

const router = Router()

router.route("/")
	.get(verifyJWTToken, getProductList)

router.route("/:categoryId")
	.post(verifyJWTToken, verifyAdmin, upload.array("images"), createProduct)

router.route("/:id")
	.patch(verifyJWTToken, verifyAdmin, addSpecification)
	.patch(verifyJWTToken ,verifyAdmin, updateProductImages)



export default router