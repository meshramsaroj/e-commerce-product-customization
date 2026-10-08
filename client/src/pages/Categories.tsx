import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../API_Service/categoriesApi";
import CategoryHeader from "../component/Category/CategoryHeader";
import CategoryRowItem from "../component/Category/CategoryRowItem";


const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["category-list"],
    queryFn: getCategories
  })

  const categories = data?.data?.categories

  console.log(data)
  return (
    <div>
      <h2>Categories</h2>
      {isLoading ?
        <p>Loading...</p>
        : categories?.length ?
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <CategoryHeader />
              <tbody>

                {categories.map(categoryItem => (
                  <CategoryRowItem category={categoryItem} />
                ))}
              </tbody>
            </table>
          </div>
          :
          <div>
            No categories found

          </div>}
    </div>
  );
};

export default Categories;