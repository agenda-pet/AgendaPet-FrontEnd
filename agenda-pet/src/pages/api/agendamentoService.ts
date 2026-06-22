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
    } catch (error: any) {
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

export async function listarLogsPorAgendamentoID(agendamentoId: string) {
    try {
        // Faz a chamada para o endpoint de logs
        const resposta = await api.get(`LogAgendamento`);

        // Como o endpoint traz todos os logs, filtramos no front pelo agendamentoID atual
        // (Nota: Se o seu back aceitar /api/LogAgendamento/{id}, mude a rota acima para incluir o ID)
        const todosOsLogs = resposta.data || [];
        return todosOsLogs.filter((log: any) => log.agendamentoID === agendamentoId);
    } catch (error) {
        console.error("Erro ao buscar logs:", error);
        return [];
    }
}