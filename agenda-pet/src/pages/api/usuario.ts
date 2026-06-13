import { api } from "./api";

export async function listarUsuarios() {
    try {
        const response = await api.get("Usuario");

        console.log(response.data);
        return response;
        
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}