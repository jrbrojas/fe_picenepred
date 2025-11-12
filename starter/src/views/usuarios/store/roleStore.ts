import { create } from "zustand";
import { Role } from "../types";

interface RolesStore {
  rolesData: Role[]  // Estructura de los roles
  setRolesData: (data: Role[]) => void  // Función para actualizar los roles
}

export const useRolesStore = create<RolesStore>((set) => ({
  rolesData: [],
  setRolesData: (data) => set({ rolesData: data })
}))