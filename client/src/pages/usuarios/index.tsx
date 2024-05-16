import HeaderTitle from "@/components/header/HeaderTitle";
import Pagination from "@/components/ui/Pagination";
import { BACKEND_URL } from "@/config/configEnv";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IUsersResponse {
  users: any[];
  total: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}
const index = () => {
  const { token } = useUserStore();
  const [pagination, setPagination] = useState(1);
  const [rol, setRol] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [usersValue, setUsersValue] = useState<IUsersResponse>({
    users: [],
    total: 0,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 1,
  });
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/users/read?page=${pagination}&limit=${10}${
          rol !== "" ? `&rol=${rol}` : ""
        }`,
        { withCredentials: true }
      );
      if (response) {
        setIsFetched(true);
        setUsersValue({
          users: response.data.users,
          total: response.data.total,
          hasPrevPage: response.data.hasPrevPage,
          hasNextPage: response.data.hasNextPage,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [pagination, rol]);

  return (
    <div className=" w-full ">
      <HeaderTitle title="Usuarios"/>
      <div className="max-w-sm mb-6">
        <label
          htmlFor="users"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Filtrar por rol
        </label>
        <select
          id="users"
           onChange={(e)=>setRol(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Todos</option>
          <option value="Encargado">Encargado</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Delivery">Delivery</option>
          <option value="Repartidor">Repartidor</option>
        </select>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3">
                Puesto
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {usersValue.users.map((e) => (
              <tr key={e._id} className=" border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {e.name}
                </th>
                <td className="px-6 py-4">{e.email}</td>
                <td className="px-6 py-4">{e.phone}</td>
                <td className="px-6 py-4">{e.job}</td>
                <td className="px-6 py-4">{e.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={pagination}
        hasNextPage={usersValue.hasNextPage}
        hasPrevPage={usersValue.hasPrevPage}
        totalPages={usersValue.totalPages}
        setPage={setPagination}
      />
    </div>
  );
};

export default index;
