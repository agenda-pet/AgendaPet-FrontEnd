import Link from 'next/link';
import styles from './card.module.css';
import ServicosDropdown from '../dropDown/dropDown';
import { useEffect, useState } from 'react';
import { listarAgendamentosPorId } from '@/pages/api/agendamentoService';
import Router from 'next/router';

type CardProps = {
    page?: "listaAgendamento" | "listaUsuarios" | "listaPets" | "detalheHistoricoItem" | "listaHistorico";
    pet?: Pet;
    usuario?: Usuario;
    agendamento?: Agendamento;
    log?: LogAgendamento;
};

interface Pet {
    petID: string,
    nome: string,
    nomeTipo?: string,
    nomeComportamento?: string,
    nomeRaca: string,
    nomePorte: string,
    nomeDono: string
}

interface LogAgendamento {
    logAgendamentoID: string;
    dataModificacao: string;
    dataAnteriorAgendamento: string;
    statusAgendamentoAnterior: string;
    servicosPorAgendamento: string;
    agendamentoID: string;
}

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
    servicosPrestados?: string;
}

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomePet: string,
    nomeTutor: string,
    valorTotal?: number,
}

const Card = ({ page, usuario, pet, agendamento, log }: CardProps) => {

    const [servicosDoAgendamento, setServicosDoAgendamento] = useState<string>("");

    useEffect(() => {
        if (agendamento?.servicosPrestados) {
            setServicosDoAgendamento(agendamento.servicosPrestados);
            return;
        }

        async function buscarServicosDesteCard() {
            if (!agendamento?.agendamentoID) return;

            try {
                const resposta = await listarAgendamentosPorId(agendamento.agendamentoID);


                const dadosCompletos = resposta?.data || resposta;

                // Captura a string exata exibida no seu Swagger
                const stringServicos = dadosCompletos?.servicosPrestados || "";
                setServicosDoAgendamento(stringServicos);
            } catch (error) {
                console.error("Erro ao buscar serviços do agendamento no card:", error);
                setServicosDoAgendamento("");
            }
        }

        if (page === "listaAgendamento" || page === "listaHistorico") {
            buscarServicosDesteCard();
        }
    }, [agendamento?.agendamentoID, agendamento?.servicosPrestados, page]);
    return (
        <>
            {page === "listaAgendamento" && (
                <tr
                    className={styles.trCard}
                    onClick={() => Router.push(`/detalhes-agendamento/${agendamento?.agendamentoID}`)}
                    style={{ cursor: 'pointer' }} // Deixa o ponteiro do mouse como "mãozinha" em qualquer lugar da linha
                >
                    <td>{agendamento?.dataAgendamento}</td>
                    <td>{agendamento?.horaAgendamento}</td>
                    <td>{agendamento?.nomePet}</td>
                    <td>{agendamento?.nomePorte}</td>
                    <td>{agendamento?.nomeTutor}</td>
                    <td id={styles.dropdown_wrapper}>
                        {/* Passando o estado com a string tratada para o seu dropdown personalizado */}
                        <ServicosDropdown servicosString={servicosDoAgendamento} />
                    </td>
                    <td className="w-12 text-center">
                        <button
                            type="button"
                            className="hover:scale-110 transition-transform p-2"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (agendamento?.agendamentoID) {
                                    Router.push(`/editar-agendamento/${agendamento.agendamentoID}`);
                                } else {
                                    console.error("ID do agendamento sumiu do escopo.");
                                }
                            }}
                        >
                            <img
                                src="../imgs/IconePatinhaEditar.png"
                                alt="Editar"
                                className="pointer-events-none"
                            />
                        </button>
                    </td>
                </tr>
            )}
            {page === "listaHistorico" && (
                <tr
                    className={styles.trCard}
                    onClick={() => Router.push(`/detalhes-agendamento/${agendamento?.agendamentoID}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <td>{agendamento?.dataAgendamento}</td>
                    <td>{agendamento?.horaAgendamento}</td>
                    <td>{agendamento?.nomePet}</td>
                    <td>{agendamento?.nomePorte}</td>
                    <td>{agendamento?.nomeTutor}</td>
                    <td id={styles.dropdown_wrapper}>
                        <ServicosDropdown servicosString={servicosDoAgendamento} />
                    </td>
                    {/* Exibe o preço formatado em vez do botão de edição */}
                    <td className="font-semibold text-[#163923]">
                        {agendamento?.valorTotal ? `R$ ${agendamento.valorTotal},00` : "R$ 0,00"}
                    </td>
                </tr>
            )}
            {page === "listaUsuarios" && (
                <tr className={styles.trCard}>
                    <td>{usuario?.nome}</td>
                    <td>{usuario?.numeroTelefone}</td>
                    <td>{usuario?.email}</td>
                    <td className="w-12 text-center">
                        <button
                            type="button"
                            className="hover:scale-110 transition-transform p-2 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (usuario?.usuarioID) {
                                    Router.push(`/editar-usuario/${usuario.usuarioID}`);
                                } else {
                                    console.error("ID do usuario sumiu do escopo.");
                                }
                            }}
                        >
                            <img
                                src="../imgs/IconePatinhaEditar.png"
                                alt="Editar"
                                className="pointer-events-none"
                            />
                        </button>
                    </td>
                    <td className="w-12 text-center">
                        <button
                            type="button"
                            className="hover:scale-110 transition-transform p-2 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (usuario?.usuarioID) {
                                    Router.push(`/detalhes-usuario/${usuario.usuarioID}`);
                                } else {
                                    console.error("ID do usuario sumiu do escopo.");
                                }
                            }}
                        >
                            <img
                                src="../imgs/IconePatinhaInformacoes.png"
                                alt="Editar"
                                className="pointer-events-none"
                            />
                        </button>
                    </td>


                </tr>
            )}

            {page === "listaPets" && (

                <tr className={styles.trCard}>
                    <td>{pet?.nome}</td>
                    <td>{pet?.nomeComportamento}</td>
                    <td>{pet?.nomeTipo}</td>
                    <td>{pet?.nomeDono}</td>
                    <td>{pet?.nomeRaca}</td>
                    <td>{pet?.nomePorte}</td>
                </tr>
            )}

            {page === "detalheHistoricoItem" && log && (
                <tr className={styles.trCard}>
                    <td>{new Date(log.dataModificacao).toLocaleDateString('pt-BR')}</td>
                    <td>
                        {(() => {
                            console.log("Objeto do Log recebido no Card:", log);

                            if (!log.dataAnteriorAgendamento) return "Não informada";

                            const partes = log.dataAnteriorAgendamento.split("T");
                            const dataParte = partes[0];

                            const [ano, mes, dia] = dataParte.split("-");
                            return `${dia}/${mes}/${ano}`;
                        })()}
                    </td>

                    <td>
                        {(() => {
                            if (!log.dataAnteriorAgendamento) return "Não informado";
                            const partes = log.dataAnteriorAgendamento.split("T");
                            if (partes.length < 2) return "Não informado";

                            const horaParte = partes[1];
                            const [hora, minuto] = horaParte.split(":");
                            return `${hora}:${minuto}`;
                        })()}
                    </td>

                    <td>{agendamento?.nomePet || "Não informado"}</td>
                    <td>{agendamento?.nomeTutor || "Não informado"}</td>

                    <td>
                        <span className={styles.statusBadge}>
                            {log.statusAgendamentoAnterior}
                        </span>
                    </td>

                    <td id={styles.dropdown_wrapper}>
                        <ServicosDropdown servicosString={log.servicosPorAgendamento} />
                    </td>
                </tr>
            )}



        </>
    )
}

export default Card;