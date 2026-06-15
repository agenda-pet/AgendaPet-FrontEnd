import { api } from "./api";


export async function listarTipoUsuarios() {
    try {
        const response = await api.get("TipoUsuario");

        return response;
    } catch (error: any) {
        throw new Error(error.response.data);
    }

}