import { api } from "./api";


export async function listarPorte () {
    try {
        const response = await api.get("PortePet");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}