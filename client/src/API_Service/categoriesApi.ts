import axiosInstance from "./axiosInstance"

export const getCategories = () => {
    return axiosInstance.get("/categories").then(res => res?.data).catch(error => error)
}

export const getCategoryIds = () => {
    return axiosInstance.get("/categories/ids").then(res => res.data).catch(error => error)
}

export const updateCategory =(id, payload) => {
    return axiosInstance.patch(`/categories/${id}`, payload).then(res=> res.data).catch(error=> error)
}