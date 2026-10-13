import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../API_Service/categoriesApi";
import CategoryHeader from "../component/Category/CategoryHeader";
import CategoryRowItem from "../component/Category/CategoryRowItem";

type CategoryItem = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive?: boolean;
};

const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["category-list"],
    queryFn: getCategories,
  });

  const categories = (data?.data?.categories ?? []) as CategoryItem[];

  return (
    <div>
      <h2>Categories</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : categories.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            <CategoryHeader />
            <tbody>
              {categories.map((categoryItem: CategoryItem) => (
                <CategoryRowItem key={categoryItem._id} category={categoryItem} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No categories found</div>
      )}
    </div>
  );
};

export default Categories;