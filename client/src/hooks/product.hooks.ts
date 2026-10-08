import { useQuery } from "@tanstack/react-query"
import { getProductList } from "../API_Service/productsApi"

export const useProducts = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-list"],
        queryFn: getProductList
    })

    return {
        data, isLoading, isError
    }
}