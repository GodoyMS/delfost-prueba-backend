import { BACKEND_URL } from "@/config/configEnv";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { toast } from "sonner";
interface IMenuItem {
  id: number;
  title: string;
  link: string;
  icon: IconType;
}

const menuItems: IMenuItem[] = [
  { id: 1, title: "Usuarios", link: "/usuarios", icon: FaUsers },
  { id: 2, title: "Productos", link: "/productos", icon: AiOutlineProduct },
  { id: 3, title: "Pedidos", link: "/pedidos", icon: FiTruck },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/signout`, {
        withCredentials: true,
      });
      toast.success("Deslogueado");
      router.push("/");
    } catch (error) {}
  };
  const [isLogged, setIsLogged] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/check-auth/getAuthData`,
        {
          withCredentials: true,
        }
      );
      setIsLogged(true);
    } catch (error) {
      setIsLogged(false);
    } finally {
      setIsFetched(true);
    }
  };

  useEffect(()=>{
    checkAuth()
  },[])

  return (
    <div className=" min-h-screen bg-gray-900 ">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 flex flex-col justify-between py-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((e) => (
              <li key={e.id}>
                <Link
                  href={e.link}
                  className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <e.icon />
                  <span className="ms-3">{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          {isLogged && isFetched &&  <div>
            <button
              type="button"
              onClick={logout}
              className=" bg-indigo-400 bg-opacity-20 text-indigo-300 w-full justify-center font-bold  text-center flex items-center p-2 rounded-lg  hover:bg-gray-700"
            >
              <p className=" text-center">Salir</p>
            </button>
          </div>}
         
        </div>
      </aside>
      {isLogged && isFetched && (
        <div className="p-4 sm:pl-[270px] w-full ">{children}</div>
      )}
      {!isLogged && isFetched && (
        <div className="p-4 sm:pl-[270px] w-full  flex  justify-center text-white ">
          <Link href={"/"} className=" mt-20 max-w-[200px] bg-indigo-600 px-4 py-3 font-bold rounded-md">
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
