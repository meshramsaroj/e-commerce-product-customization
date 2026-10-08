import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../API_Service/categoriesApi"

export const useCategories = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["category-list"],
        queryFn: getCategories
    })

    return {
        data, isLoading, isError
    }
}