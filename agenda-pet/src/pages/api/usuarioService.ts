import { api } from "./api";


export async function listarUsuarios() {
    try {
        const response = await api.get("Usuario");

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}



export async function obterPetUsuairo(petId: string) {
    try {
        const response = await api.get("Usuario")
    } catch (error : any) {
        throw new Error(error.response.data)
    }
}