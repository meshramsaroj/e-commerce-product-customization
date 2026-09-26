import axiosInstance from "./axiosInstance"

export const getProductList = () => {
    return axiosInstance.get("/products").then(res => res.data).catch(error => error)
}