import { api } from "./api";


export async function listarComportamento () {
    try {
        const response = await api.get("ComportamentoPet");
        console.log(response.data)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}