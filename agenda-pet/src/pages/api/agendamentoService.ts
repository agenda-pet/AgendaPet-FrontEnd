import { api } from "./api";

type AgendamentoFormulario = {
    dataAgendamento: string;
    horaAgendamento: string;
    funcionarioID: string;
    petID: string;
    servicosIds: string[];
}



export async function listarAgendamentos() {
    try {
        const response = await api.get("Agendamento")

        console.log(response.data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}

export async function cadastrarAgendamento(agendamento: AgendamentoFormulario) {
    try {
        await api.post("Agendamento", {
            dataAgendamento: agendamento.dataAgendamento,
            horaAgendamento: agendamento.horaAgendamento,
            funcionarioID: agendamento.funcionarioID,
            petID: agendamento.petID,
            servicoIds: agendamento.servicosIds.forEach(servico => servico.toString)
        });

    } catch (error: any) {
        throw new Error(error.response.data)
    }
}