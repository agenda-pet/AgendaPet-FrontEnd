import { api } from "./api";


export async function listarTipoUsuarios() {
    try {
        const response = await api.get("TipoUsuario");
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }

}

export async function obterTiposUsuarioId(id: string) {
    try {
        const response = await api.get("TipoUsuario/" + id)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}