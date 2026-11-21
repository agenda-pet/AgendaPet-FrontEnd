import { api } from "./api";


export async function listarServicos() {
    try {
        const response = await api.get("Servico")

        return response.data;
    } catch (error: any){
        throw new Error(error.response.data)
    }
}