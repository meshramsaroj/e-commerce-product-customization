import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../API_Service/categoriesApi";

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
