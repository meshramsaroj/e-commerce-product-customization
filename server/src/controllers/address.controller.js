import { Address } from "../models/address.model.js"
import { isRequireDataMissing } from "../utils/common.utils.js"

const createAddress = async (req, res) => {
  const {
    fullName, type, phone, addressLine1, addressLine2, city, state, country, postalCode, isDefault
  } = req.body

  if (isRequireDataMissing([fullName, phone, addressLine1, city, state, country, postalCode])) {
    return res.status(404).json({
      message: "Required fields data is missing"
    })
  }

  await Address.create({
    userId: req.user._id,
    type,
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    isDefault
  })

  return res.status(200).json({
    message: "Address is created successfully",
    status: true
  })

}

const getAllAddresses = async (req, res) => {
  const addresses = await Address.find({ userId: req.user._id })

  return res.status(200).json({
    message: "All addresses are fetched for logged in user",
    data: {
      addresses,
      total: addresses.length
    }
  })
}

const updateAddress = async (req, res) => {
  const { addressId } = req.params

  const updatedAddress = await Address.findOneAndUpdate(
    { userId: req.user._id, _id: addressId }, // and filter: if userId and addressId match then update
    {
      $set: req.body
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedAddress) {
    return res.status(404)
      .json({
        success: false,
        message: "Address not found or you are not authorized to update it"
      });
  }

  return res.status(200).json({
    message: "Address updated successfully"
  })
}

const deleteAddress = async (req, res) => {
  const { addressId } = req.params

  const deletedAddress = await Address.findOneAndDelete(
    {
      userId: req.user._id,
      _id: addressId
    }
  )

  if (!deletedAddress) {
    return res.status(404).json({
      message: "Address not found or you are not authorized to delete it"
    })
  }

  return res.status(200).json({
    message: "Address deleted successfully"
  })

}

export {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress
}