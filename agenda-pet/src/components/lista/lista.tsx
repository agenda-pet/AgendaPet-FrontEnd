import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarAgendamentos } from '@/pages/api/agendamentoService';
import Link from 'next/link';

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
    nomePet: string,
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

          
        </>
    )
}

export default Lista;