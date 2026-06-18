import { api } from "./api";


export async function listarRaca () {
    try {
        const response = await api.get("RacaPet");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}