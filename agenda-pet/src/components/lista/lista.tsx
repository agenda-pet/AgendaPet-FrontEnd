import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarUsuarios } from '@/pages/api/usuarioService';
import { listarPets, ListarPetsPorTutor } from '@/pages/api/petService';
import { listarAgendamentos, listarAgendamentosPorId, listarLogsPorAgendamentoID } from '@/pages/api/agendamentoService';

type ListaProps = {
    page?: string;
    usuarioId?: string;
    agendamentoId?: string;
};

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}

interface LogAgendamento {
    logAgendamentoID: string;
    dataModificacao: string;
    dataAnteriorAgendamento: string;
    statusAgendamentoAnterior: string;
    servicosPorAgendamento: string;
    agendamentoID: string;
}

interface Pet {
    petID: string,
    nome: string,
    tipoAnimal: string,
    comportamento: string,
    raca: string,
    porte: string,
    nomeDono: string
}

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
    nomePet: string,
    nomeStatus: string,
}

const Lista = ({ page, usuarioId, agendamentoId }: ListaProps) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [logs, setLogs] = useState<LogAgendamento[]>([]);
    const [agendamentoPai, setAgendamentoPai] = useState<Agendamento>();

    // 💡 O loading agora monitora o estado de requisição de forma correta
    const [loading, setLoading] = useState<boolean>(true);

    async function listarUsu() {
        try {
            setLoading(true);
            const listarUsuario = await listarUsuarios();
            setUsuarios(listarUsuario.data || listarUsuario);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function carregarPets() {
        try {
            setLoading(true);
            if (usuarioId) {
                const dadosPetsTutor = await ListarPetsPorTutor(usuarioId);
                setPets(dadosPetsTutor);
            } else {
                const listarAnimal = await listarPets();
                setPets(listarAnimal);
            }
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function listarAgenda() {
        try {
            setLoading(true);
            const listarAgendamento = await listarAgendamentos();
            setAgendamentos(listarAgendamento.data || listarAgendamento);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function carregarLogs() {
        try {
            setLoading(true);
            const resAgendamento = await listarAgendamentosPorId(String(agendamentoId));
            setAgendamentoPai(resAgendamento.data || resAgendamento);

            const dadosLogs = await listarLogsPorAgendamentoID(String(agendamentoId));
            setLogs(dadosLogs);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    // 💡 ESTRUTURA CORRIGIDA: Executa apenas a busca da lista correspondente à prop 'page' atual
    useEffect(() => {
        if (!page) return;

        if (page === "listaHistoricoLogs" && agendamentoId) {
            carregarLogs();
        } else if (page === "listaUsuarios") {
            listarUsu();
        } else if (page === "listaPets") {
            carregarPets();
        } else if (page === "listaAgendamento" || page === "listaHistorico") {
            listarAgenda();
        }

    }, [page, usuarioId, agendamentoId]);

    // Ouvinte para recarregar pets em eventos globais
    useEffect(() => {
        window.addEventListener("pet-cadastrado", carregarPets);
        return () => {
            window.removeEventListener("pet-cadastrado", carregarPets);
        };
    }, [usuarioId]);

    return (
        <>
            {/* --- LISTA DE AGENDAMENTOS PENDENTES --- */}
            {page === "listaAgendamento" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Raça</th>
                                <th>Porte</th>
                                <th>Pets</th>
                                <th>Serviços</th>
                                <th>Editar</th>
                            </tr>
                         Lucas</thead>
                        <tbody id={styles.tbody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>Carregando agendamentos...</td>
                                </tr>
                            ) : agendamentos && agendamentos.filter((a) => a.nomeStatus === "Pendente").length > 0 ? (
                                agendamentos
                                    .filter((agendamento) => agendamento.nomeStatus === "Pendente")
                                    .map((agendamento) => (
                                        <Card
                                            key={agendamento.agendamentoID}
                                            page="listaAgendamento"
                                            agendamento={agendamento}
                                        />
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>Nenhum agendamento pendente encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            {/* --- LISTA DE PETS --- */}
            {page === "listaPets" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Nome</th>
                                <th>Comportamento</th>
                                <th>Tipo</th>
                                <th>Cliente</th>
                                <th>Raça</th>
                                <th>Porte</th>
                            </tr>
                        </thead>
                        <tbody id={styles.tbody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={6}>Carregando pets...</td>
                                </tr>
                            ) : pets && pets.length > 0 ? (
                                pets.map((pet: any) => (
                                    <Card
                                        key={pet.petID}
                                        page="listaPets"
                                        pet={{
                                            petID: pet.petID,
                                            nome: pet.nome,
                                            nomeDono: pet.nomeDono,
                                            nomeTipo: pet.nomeTipo,
                                            nomeComportamento: pet.nomeComportamento,
                                            nomeRaca: pet.nomeRaca,
                                            nomePorte: pet.nomePorte
                                        }}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>Nenhum pet encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            {/* --- LISTA DE USUÁRIOS --- */}
            {page === "listaUsuarios" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Nome</th>
                                <th>Número</th>
                                <th>Email</th>
                                <th>Editar</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody id={styles.tbody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={5}>Carregando usuários...</td>
                                </tr>
                            ) : usuarios && usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <Card
                                        key={usuario.usuarioID}
                                        page="listaUsuarios"
                                        usuario={usuario}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>Nenhum usuário encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            {/* --- HISTÓRICO DE LOGS --- */}
            {page === "listaHistoricoLogs" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Data Alteração</th>
                                <th>Data Agendada</th>
                                <th>Horário</th>
                                <th>Pet</th>
                                <th>Tutor</th>
                                <th>Status</th>
                                <th>Serviços</th>
                            </tr>
                        </thead>
                        <tbody id={styles.tbody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>Carregando logs de alteração...</td>
                                </tr>
                            ) : logs && logs.length > 0 ? (
                                logs.map((logItem) => (
                                    <Card
                                        key={logItem.logAgendamentoID}
                                        page="detalheHistoricoItem"
                                        log={logItem}
                                        agendamento={agendamentoPai}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>Nenhum registro de alteração encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            {/* --- HISTÓRICO DE AGENDAMENTOS (CONCLUÍDOS/CANCELADOS) --- */}
            {page === "listaHistorico" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Raça</th>
                                <th>Porte</th>
                                <th>Pets</th>
                                <th>Serviços</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody id={styles.tbody}>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>Carregando histórico...</td>
                                </tr>
                            ) : agendamentos && agendamentos.filter((a) => a.nomeStatus === "Concluído" || a.nomeStatus === "Cancelado").length > 0 ? (
                                agendamentos
                                    .filter((agendamento) => agendamento.nomeStatus === "Concluído" || agendamento.nomeStatus === "Cancelado")
                                    .map((agendamento) => (
                                        <Card
                                            key={agendamento.agendamentoID}
                                            page="listaHistorico"
                                            agendamento={agendamento}
                                        />
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>Nenhum histórico de agendamento encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
};

export default Lista;