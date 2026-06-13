import { api } from "./api";


export async function listarPets() {
    try {
        const response = await api.get("Pet");

        console.log(response.data); 
        return response.data;   
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}