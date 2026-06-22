import { api } from "./api";

type PetFormulario = {
    nome: string;
    tipoAnimalID: string;
    comportamentoID: string;
    racaID: string;
    porteID: string;
    usuarioID: string;
}

type FormPetAtualizar = {
    nome: string,
    comportamentoID: string,
    porteID: string,
    usuarioID: string
}

export async function listarPets() {
    try {
        const response = await api.get("Pet");

        console.log(response.data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export async function obterPetPorID(id: string) {
    try {
        const response = await api.get("Pet/" + id);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}

export async function cadastrarPets(pet: PetFormulario) {
    try {
        await api.post("Pet", {
            nome: pet.nome,
            tipoAnimalID: pet.tipoAnimalID,
            comportamentoID: pet.comportamentoID,
            racaID: pet.racaID,
            porteID: pet.porteID,
            usuarioID: pet.usuarioID,
        });

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}
export async function atualizarPet(id: string, dados: FormPetAtualizar) {
    try {
        console.log(dados)
        await api.put(`Pet/${id}`, {
            nome: dados.nome,
            comportamentoID: dados.comportamentoID,
            porteID: dados.porteID,
            usuarioID: dados.usuarioID,
        });
        alert("Pet atualizado com sucesso!")
    } catch (error: any) {
        alert("Selecione todos os campos!!!")
    }
}
