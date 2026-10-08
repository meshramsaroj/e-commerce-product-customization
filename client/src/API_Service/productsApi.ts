import axiosInstance from "./axiosInstance"

export const getProductList = () => {
    return axiosInstance.get("/products").then(res => res.data).catch(error => error)
}

export const createProduct = (categoryId: string, formData: FormData) => {
    return axiosInstance.post(`/products/${categoryId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}

export const updateProduct = (id: string, formData: FormData) => {
    return axiosInstance.patch(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}

export const deleteProduct = (id: string) => {
    return axiosInstance.delete(`/products/${id}`).then(res => res.data)
}