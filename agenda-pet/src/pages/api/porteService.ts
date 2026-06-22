import { api } from "./api";


export async function listarPorte () {
    try {
        const response = await api.get("PortePet");

        return response.data
    } catch (error: any) {
        const message = error?.response?.data ?? error?.message ?? String(error);
        throw new Error(message);
    }
}