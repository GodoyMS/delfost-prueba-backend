import HeaderTitle from "@/components/header/HeaderTitle";
import DrawerRight from "@/components/ui/DrawerRight";
import Pagination from "@/components/ui/Pagination";
import { BACKEND_URL } from "@/config/configEnv";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaSearch } from "react-icons/fa";

interface IOrdersResponse {
  orders: any[];
  total: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

interface IOrder {
  numberOrder: number;
  productsList: any[];
  orderDate: string;
  receiptDate?: string;
  dispatchDate?: string;
  deliveryDate?: string;
  sellerId: any;
  deliveryManId: any;
  state: string;
}
const index = () => {
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);
  const [numberOrder, setNumberOrder] = useState<number | null>(null);
  const [productsValue, setProductsValue] = useState<IOrdersResponse>({
    orders: [],
    total: 0,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: 1,
  });
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/orders/read?page=${pagination}&limit=${10}${
          numberOrder !== null ? `&numberOrder=${numberOrder}` : ""
        }`,
        { withCredentials: true }
      );
      if (response) {
        setIsFetched(true);
        setProductsValue({
          orders: response.data.orders,
          total: response.data.total,
          hasPrevPage: response.data.hasPrevPage,
          hasNextPage: response.data.hasNextPage,
          totalPages: response.data.totalPages,
        });
      }
    } catch (error) {}
  };

  const submitSearch = async (e: FormEvent) => {
    e.preventDefault();
    setPagination(1);
    await getOrders();
  };

  useEffect(() => {
    getOrders();
  }, [pagination]);

  return (
    <div className=" w-full ">
      <HeaderTitle title="Pedidos" />
      <DrawerRight
        maxWidth={600}
        title="Detalles de pedido"
        open={openedDrawer}
        onClose={() => setOpenedDrawer(false)}
      >
        {currentOrder && (
          <div className=" flex flex-col w-full gap-6">
            <ItemSection
              title="Número de orden"
              value={currentOrder.numberOrder}
            />
            <ItemSection
              title="Fecha de pedido"
              value={currentOrder?.orderDate ? currentOrder?.orderDate : ""}
            />
            <ItemSection
              title="Fecha de recepción"
              value={currentOrder?.receiptDate ? currentOrder?.receiptDate : ""}
            />
            <ItemSection
              title="Fecha de despacho"
              value={
                currentOrder?.dispatchDate ? currentOrder?.dispatchDate : ""
              }
            />
            <ItemSection
              title="Fecha de entrega"
              value={
                currentOrder?.deliveryDate ? currentOrder?.deliveryDate : ""
              }
            />
            <ItemSection
              title="Vendedor solicitante"
              value={
                <div className=" flex flex-col">
                  <div>{currentOrder.sellerId.name}</div>
                  <div className=" text-xs text-indigo-300">
                    {currentOrder.sellerId.job}
                  </div>
                </div>
              }
            />

            <ItemSection
              title="Repartidor"
              value={
                <div className=" flex flex-col">
                  <div>{currentOrder.deliveryManId.name}</div>
                  <div className=" text-xs text-indigo-300">
                    {currentOrder.deliveryManId.job}
                  </div>
                </div>
              }
            />
            <ItemSection
              title="Productos"
              value={
                <div>
                  <div className=" grid grid-cols-3 gap-3">

                    <div className=" text-sm font-bold text-white">
                      SKU
                    </div>
                    <div className=" text-sm font-bold text-white">
                      Nombre
                    </div>
                    <div className=" text-sm font-bold text-white">
                      Precio
                    </div>
                    {currentOrder.productsList.map((e) => (
                      <>
                      <div className=" text-xs text-indigo-300">
                        {e.sku}
                      </div>
                      <div className=" text-xs text-indigo-300">
                        {e.name}
                      </div>
                      <div className=" text-xs text-indigo-300">
                        {e.price}{" "}{e.unit}
                      </div>
                      </>
                    ))}
                  </div>
                </div>
              }
            />

            <div className=" flex justify-center mt-10">
              <div className=" bg-indigo-400 shadow-md text-indigo-200 bg-opacity-15 rounded-md max-w-xs w-full p-3 font-bold text-xl">
               <p className=" text-center">
               {currentOrder.state}
               </p>
              </div>
               
            </div>
          </div>
        )}
      </DrawerRight>
      <form onSubmit={submitSearch} className="max-w-md mb-6 ">
        <label
          htmlFor="search-numberOrder"
          className="mb-2 text-sm font-medium  sr-only text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4  text-gray-400" />
          </div>
          <input
            type="number"
            value={String(numberOrder)}
            onChange={(e) => setNumberOrder(Number(e.target.value))}
            id="search-numberOrder"
            className="block w-full p-4 ps-10 text-sm  border  rounded-lg    bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Buscar por número de órden"
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
                Número de orden
              </th>
              <th scope="col" className="px-6 py-3">
                Número de productos
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de pedido
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de recepción
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de despacho
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de entrega
              </th>
              <th scope="col" className="px-6 py-3">
                Vendedor solicitante
              </th>
              <th scope="col" className="px-6 py-3">
                Repartidor
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {productsValue.orders.map((e) => (
              <tr key={e._id} className=" border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {e.numberOrder}
                </th>
                <td className="px-6 py-4">{e.productsList.length}</td>
                <td className="px-6 py-4">{e.orderDate}</td>
                <td className="px-6 py-4">{e?.receiptDate}</td>
                <td className="px-6 py-4">{e?.dispatchDate}</td>
                <td className="px-6 py-4">{e?.deliveryDate}</td>
                <td className="px-6 py-4">{e.sellerId.name}</td>
                <td className="px-6 py-4">{e.deliveryManId.name}</td>
                <td className="px-6 py-4">{e.state}</td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenedDrawer(true);
                      setCurrentOrder({
                        numberOrder: e.numberOrder,
                        productsList: e.productsList,
                        orderDate: e.orderDate,
                        receiptDate: e?.receiptDate,
                        dispatchDate: e?.dispatchDate,
                        deliveryDate: e?.deliveryDate,
                        sellerId: e?.sellerId,
                        deliveryManId: e.deliveryManId,
                        state: e.state,
                      });
                    }}
                    className=" text-white text-sm flex justify-start gap-2 items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 font-bold"
                  >
                    Detalles
                  </button>
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

interface IItemsSecion {
  title: string;
  icon?: IconType;
  value: string | number | ReactNode;
}
const ItemSection = (props: IItemsSecion) => {
  return (
    <div className=" bg-gray-800 text-gray-100 rounded-md p-2">
      <div className=" font-bold mb-2 flex justify-start gap-2 items-center">
        {props.icon && (
          <div>
            <props.icon />
          </div>
        )}
        <h2 className="">{props.title}</h2>
      </div>
      <div>
        <p className=" text-gray-300 text-sm">{props.value}</p>
      </div>
    </div>
  );
};
