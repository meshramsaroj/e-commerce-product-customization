import  {Router} from "express"
import { createCategory, getAllCetegories } from "../../controllers/category.cotroller.js"
import { upload } from "../../middelwares/multer.middleware.js"
const router = Router()

router.route("/")
.get(getAllCetegories)
.post(upload.single("image"),createCategory)


export default router