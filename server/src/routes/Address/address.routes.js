import { Router } from "express"
import { verifyJWTToken } from "../../middelwares/authVerify.middleware.js";
import { createAddress, getAllMyAddresses, updateAddress, deleteAddress, getAddress } from "../../controllers/address.controller.js";

const router = Router()

router.route("/")
	.post(verifyJWTToken, createAddress)
	.get(verifyJWTToken, getAllMyAddresses)

router.route("/:addressId")
	.get(verifyJWTToken, getAddress)
	.patch(verifyJWTToken, updateAddress)
	.delete(verifyJWTToken, deleteAddress)

export default router;

