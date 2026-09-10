import { Router } from "express"
import { handleLogout, loginUser, register, handleUserDetails, getAllUsers } from "../../controllers/auth.controller.js"
import { createUserSchema, loginUserSchema } from "../../validator/auth.validator.js"
import { validateSchema } from "../../middelwares/validateSchema.middleware.js"
import { verifyJWTToken } from "../../middelwares/authVerify.middleware.js"

const router = Router()

router.route("/register").post(validateSchema(createUserSchema), register)
router.route("/login").post(validateSchema(loginUserSchema), loginUser)
router.route("/logout").post(verifyJWTToken, handleLogout)
router.route("/user/me").get(verifyJWTToken, handleUserDetails)
router.route("/users").get(getAllUsers)


export default router
