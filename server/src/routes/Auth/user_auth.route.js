import { Router } from "express"
import { loginUser, register } from "../../controllers/auth.controller.js"
import { createUserSchema, loginUserSchema } from "../../validator/auth.validator.js"
import { validateSchema } from "../../middelwares/validateSchema.middleware.js"

const router = Router()

router.route("/register").post(validateSchema(createUserSchema), register)
router.route("/login").post(validateSchema(loginUserSchema), loginUser)



export default router
