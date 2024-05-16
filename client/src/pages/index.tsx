import { BACKEND_URL } from "@/config/configEnv";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { toast } from "sonner";

interface ILogin {
  email: string;
  password: any;
}

export default function Login() {
  const [formValues, setFormValues] = useState<ILogin>({
    email: "",
    password: "",
  });
  const router= useRouter()
  const[isFormLoading,setIsFormLoading]=useState(false)
  const { setUser, setToken } = useUserStore();
  const login = async (e: FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true)
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/signin`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true }
      );

      if (response.data) {
        setUser({
          id: response.data.user.id as string,
          job: response.data.user.job as string,
          name: response.data.user.name as string,
        });
        setToken(response.data.token)
      }

      toast.success("Logueado");
      router.push("/usuarios")
    } catch (error) {
      toast.error("Contraseña incorrecta");
    }finally{
      setIsFormLoading(false)
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresar
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={login} className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isFormLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isFormLoading ? <LuLoader className=" w-6 h-6 animate-spin"/> : "Ingresar" }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
