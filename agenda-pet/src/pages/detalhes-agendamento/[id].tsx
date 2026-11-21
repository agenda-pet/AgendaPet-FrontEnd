import Header from "@/components/header/header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listarAgendamentosPorId, listarLogsPorAgendamentoID } from "../api/agendamentoService";
import styles from "./detalhe.module.css";
import Link from "next/link";
import Card from "@/components/card/card";
import Lista from "@/components/lista/lista";

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
    nomePet: string,
    valorTotal: number,
}

export interface LogAgendamento {
    logAgendamentoID: string;
    dataModificacao: string;         
    dataAnteriorAgendameto: string;  
    statusAgendamentoAnterior: string;
    servicosPorAgendamento: string;   
    agendamentoID: string;           
}


const DetalhesAgendamentos = () => {

    const [agendamento, setAgendamento] = useState<Agendamento>();

    const params = useParams();

    const [logs, setLogs] = useState<LogAgendamento[]>([]);

    const id = params?.id;

    async function carregarDadosDaTela() {
            try {
                // 1. Busca os dados do agendamento atual
                const resAgendamento = await listarAgendamentosPorId(String(id));
                setAgendamento(resAgendamento.data || resAgendamento);

                // 2. Busca o histórico de logs deste agendamento
                const dadosLogs = await listarLogsPorAgendamentoID(String(id));
                setLogs(dadosLogs);
            } catch (error) {
                console.error("Erro ao carregar dados da tela:", error);
            }
        }

    async function listarAgendamento() {
        try {
            const response = await listarAgendamentosPorId(String(id));
            setAgendamento(response.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (!id) return;

        listarAgendamento();
    }, [id]);

    return (
        <>
            <Header />
            <main className={styles.main}>

                <section className={styles.section}>
                    <div className={styles.containerDetalhes}>
                        <div className={styles.voltarContainer}>
                            <Link href="/agendamentos" id={styles.voltar}><span className={styles.btnVoltar}>&larr; Voltar</span></Link>
                        </div>

                        <h2 className={styles.tituloSecao}>Agendamentos: (Nome do Cliente)</h2>

                        <div className={styles.cardAgendamentoAtual}>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Cliente</span>
                                <span className={styles.valor}>{agendamento?.nomeTutor}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Porte</span>
                                <span className={styles.valor}>{agendamento?.nomePorte}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Pet</span>
                                <span className={styles.valor}>{agendamento?.nomePet}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Data de Agendamento</span>
                                <span className={styles.valor}>{agendamento?.dataAgendamento}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Horário</span>
                                <span className={styles.valor}>{agendamento?.horaAgendamento}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Valor</span>
                                <span className={styles.valor}>R${agendamento?.valorTotal}</span>
                            </div>
                        </div>

                        <h3 className={styles.subTituloSecao}>Histórico de Alterações:</h3>

                        <div className={styles.historicoLista}>
                            <Lista
                                page="listaHistoricoLogs"
                                agendamentoId={agendamento?.agendamentoID}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default DetalhesAgendamentos;