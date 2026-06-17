import { api } from "./api";


export async function listarPets() {
    try {
        const response = await api.get("Pet")

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}