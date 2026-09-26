import { useQuery } from "@tanstack/react-query"
import { getProductList } from "../API_Service/productsApi"
import CardLoader from "../component/CardLoader"
import ProductItemCard from "../component/Product/ProductItemCard"

const ProductList = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-list"],
    queryFn: getProductList
  })

  const products = data?.data?.products

  console.log(products)
  return (
    <div className="container bg-gray-100">
      <div className="mb-5">
        <h2 className="text-title">Products</h2>
        <p>Showing <strong>{products?.length}</strong> products</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {isLoading ? Array.from({ length: 5 }).map((_, i: number) => (
          <CardLoader key={i} />
        ))
          :
          products.length ? products.map(product =>
            <ProductItemCard product={product} />

          )
            : <>No products found</>}
      </div>

    </div >
  )

}

export default ProductList