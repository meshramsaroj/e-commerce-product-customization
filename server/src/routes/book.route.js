import { Router } from "express";
import { upload } from "../middelwares/multer.middleware.js";
import { createBook, getBooks } from "../controllers/book.controller.js";

const router = Router()

router.route("/").get(getBooks)
router.route("/create").post(upload.single("image"), createBook)



export default router