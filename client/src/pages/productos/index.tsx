import HeaderTitle from "@/components/header/HeaderTitle";
import Pagination from "@/components/ui/Pagination";
import { BACKEND_URL } from "@/config/configEnv";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface IProductsResponse {
  products: any[];
  total: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}
const index = () => {
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [productsValue, setProductsValue] = useState<IProductsResponse>({
    products: [],
    total: 0,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 1,
  });
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/products/read?page=${pagination}&limit=${10}${
          search !== "" ? `&search=${search}` : ""
        }`,
        { withCredentials: true }
      );
      if (response) {
        setIsFetched(true);
        setProductsValue({
          products: response.data.products,
          total: response.data.total,
          hasPrevPage: response.data.hasPrevPage,
          hasNextPage: response.data.hasNextPage,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {}
  };

  const submitSearch = async(e: FormEvent) => {
    e.preventDefault();
    setPagination(1);
    await getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [pagination]);

  return (
    <div className=" w-full ">
      <HeaderTitle title="Productos" />

      <form onSubmit={submitSearch} className="max-w-md mb-6 ">
        <label
          htmlFor="search-sku-name"
          className="mb-2 text-sm font-medium  sr-only text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch               className="w-4 h-4  text-gray-400"
/>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            id="search-sku-name"
            className="block w-full p-4 ps-10 text-sm  border  rounded-lg    bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Buscar por SKU o nombre"
            
          />
          <button
            type="submit"
            className=" absolute end-2.5 text-white bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                SKU
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Etiquetas
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {productsValue.products.map((e) => (
              <tr key={e._id} className=" border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {e.name}
                </th>
                <td className="px-6 py-4">{e.sku}</td>
                <td className="px-6 py-4">{e.type}</td>
                <td className="px-6 py-4">{e.tag}</td>
                <td className="px-6 py-4">
                  {e.price} {e.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={pagination}
        hasNextPage={productsValue.hasNextPage}
        hasPrevPage={productsValue.hasPrevPage}
        totalPages={productsValue.totalPages}
        setPage={setPagination}
      />
    </div>
  );
};

export default index;
