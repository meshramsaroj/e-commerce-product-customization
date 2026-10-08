import axiosInstance from "./axiosInstance"

export const getCategories = () => {
    return axiosInstance.get("/categories").then(res => res?.data).catch(error => error)
}

export const getCategoryIds = () => {
    return axiosInstance.get("/categories/ids").then(res => res.data).catch(error => error)
}

export const createCategory = (formData: FormData) => {
    return axiosInstance.post("/categories", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}

export const updateCategory = (id: string, formData: FormData) => {
    return axiosInstance.patch(`/categories/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}