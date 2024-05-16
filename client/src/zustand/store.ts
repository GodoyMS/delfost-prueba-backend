import { create } from 'zustand'

type Store = {
  user: IUser | null
  setUser: (user:IUser) => void,
  setToken: (user:string) => void,

  token:string;
}

interface IUser{
    id:string;
    name:string;
    job:string;
}

export const useUserStore = create<Store>()((set) => ({
  user:null,
  token:"",
  setToken:(val:string)=>{
    set(()=>({token:val}))
  },
  setUser:(user: IUser) => {
    set(() => ({ user }));
  }
}))

