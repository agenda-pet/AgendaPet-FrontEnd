import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarAgendamentos } from '@/pages/api/agendamentoService';

type ListaProps = {
    page?: string;
};

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
}

const Lista = ({ page }: ListaProps) => {

    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    async function listarAgenda() {
        try {
            const listarAgendamento = await listarAgendamentos();
            setAgendamentos(listarAgendamento.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        listarAgenda();
    }, [])
    
    return (
        <>
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
                        </thead>
                        <tbody id={styles.tbody}>
                            {agendamentos?.length > 0 ? agendamentos.map((agendamento) => (
                                <Card
                                    key={agendamento.agendamentoID}
                                    page="listaAgendamento"
                                    agendamento={agendamento}
                                />
                            )) : (
                                <tr>
                                    <td colSpan={7}>Nenhum agendamento encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

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
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                            <Card page="listaPets" />
                        </tbody>
                    </table>
                </section>
            )}

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
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                        </tbody>
                    </table>
                </section>
            )}

            {page === "listaDetalheAgendamento" && (
                <section className={styles.containerDetalhes}>
                    <div className={styles.voltarContainer}>
                        <span className={styles.btnVoltar}>&larr; Voltar</span>
                    </div>

                    <h2 className={styles.tituloSecao}>Agendamentos: (Nome do Cliente)</h2>

                    <div className={styles.cardAgendamentoAtual}>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Cliente</span>
                            <span className={styles.valor}>Allan</span>
                        </div>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Porte</span>
                            <span className={styles.valor}>Pequeno</span>
                        </div>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Pet</span>
                            <span className={styles.valor}>Pingu</span>
                        </div>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Data de Agendamento</span>
                            <span className={styles.valor}>09/02/2026</span>
                        </div>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Horário</span>
                            <span className={styles.valor}>17:30</span>
                        </div>
                        <div className={styles.infoGroup}>
                            <span className={styles.label}>Valor</span>
                            <span className={styles.valor}>R$ 30.00</span>
                        </div>
                    </div>

                    <h3 className={styles.subTituloSecao}>Histórico:</h3>

                    <div className={styles.historicoLista}>
                        <Card page="detalheHistoricoItem" />
                        <Card page="detalheHistoricoItem" />
                    </div>
                </section>
            )}
        </>
    )
}

export default Lista;