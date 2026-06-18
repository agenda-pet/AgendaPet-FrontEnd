import { api } from "./api";


export async function listarTipoAnimal () {
    try {
        const response = await api.get("TipoAnimal");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}