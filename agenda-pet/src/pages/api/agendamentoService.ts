import { api } from "./api";

type AgendamentoFormulario = {
    dataAgendamento: string;
    horaAgendamento: string;
    statusAgendamentoID: string; 
    petID: string;
    servicosIds: string[]; 
}



export async function listarAgendamentos() {
    try {
        const response = await api.get("Agendamento")

        return response;
    } catch (error: any) {
        throw new Error(error.response.data)
    }
}

export async function listarAgendamentosPorId(id: string) {
    try {
        const response = await api.get("Agendamento/" + id);

        return response;
    } catch(error:any) {
        throw new Error(error.response.data);
    }
}

export async function cadastrarAgendamento(agendamento: AgendamentoFormulario) {
    try {

        await api.post("Agendamento", agendamento);
    } catch (error: any) {
        throw new Error(
            error.response?.data || 
            error.message || 
            "Erro interno ao processar agendamento"
        );
    }
}