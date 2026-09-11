import { Router } from "express"
import { verifyJWTToken } from "../../middelwares/authVerify.middleware.js";
import { createAddress, getAllAddresses, updateAddress, deleteAddress } from "../../controllers/address.controller.js";


const router = Router()


router.route("/")
	.post(verifyJWTToken, createAddress)
	.get(verifyJWTToken, getAllAddresses)

router.route("/:addressId")
	.patch(verifyJWTToken, updateAddress)
	.delete(verifyJWTToken, deleteAddress)

export default router;

