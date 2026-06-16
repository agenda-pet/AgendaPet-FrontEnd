import { api } from "./api";


export async function listarUsuarios () {
    try {
        const response = await api.get("Usuario");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}