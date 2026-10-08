import { Router } from "express"
import { createCategory, deleteCategory, getAllCetegories, getCategoryDetails, getCategoryIds, updateCategory } from "../../controllers/category.cotroller.js"
import { upload } from "../../middelwares/multer.middleware.js"
const router = Router()

router.route("/")
	.get(getAllCetegories)
	.post(upload.single("image"), createCategory)

router.route("/ids").get(getCategoryIds)

router.route("/:id")
	.patch(upload.single("image"), updateCategory)
	.delete(deleteCategory)
	.get(getCategoryDetails)


export default router