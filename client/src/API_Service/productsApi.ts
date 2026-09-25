import axiosInstance from "./axiosInstance"

export const getProductList = () => {
    return axiosInstance.get("/products").then(res => res).catch(error => error)
}