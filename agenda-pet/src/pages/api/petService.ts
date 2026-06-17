import { StagedRenderingController } from "next/dist/server/app-render/staged-rendering";
import { api } from "./api";

type PetFormulario = {
    nome: string;
    tipoAnimalID: string;
    comportamentoID: string;
    racaID: string;
    porteID: string;
    usuarioID: string;
}

interface PetRecebido {
    petID: string,
    nome: string,
    nomeTipo: string,
    nomeComportamento: string,
    nomeRaca: string,
    nomePorte: string,
    nomeDono: string,
    agendamentos: []
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

export async function ListarPetsPorTutor(tutorId: string) {
    try {
        const response = await api.get("Pet/TutorId/" + tutorId)
        console.log(response.data)
        return response.data
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
