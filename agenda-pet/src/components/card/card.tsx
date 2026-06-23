import Link from 'next/link';
import { Check } from "lucide-react";
import styles from './card.module.css';
import ServicosDropdown from '../dropDown/dropDown';
import { useEffect, useState } from 'react';
import { listarAgendamentosPorId } from '@/pages/api/agendamentoService';
import Router from 'next/router';
import { api } from '@/pages/api/api'; // Importação da API mantida para fazer o PATCH interno

type CardProps = {
    page?: "listaAgendamento" | "listaUsuarios" | "listaPets" | "detalheHistoricoItem" | "listaHistorico";
    pet?: Pet;
    usuario?: Usuario;
    agendamento?: Agendamento;
    log?: LogAgendamento;
    // 💡 Note que removemos a obrigatoriedade do onConcluir aqui nas props!
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
    nomeStatus: string,
    valorTotal?: number,
    servicosPrestados?: string;
}

const Card = ({ page, usuario, pet, agendamento, log }: CardProps) => {

    // 💡 Função declarada diretamente DENTRO do Card (Opção 1)
    const handleConcluirInterno = async (id: string) => {
        if (!id) {
            alert("ID do agendamento não encontrado.");
            return;
        }

        if (confirm("Deseja marcar este agendamento como concluído?")) {
            try {
                await api.patch(`Agendamento/AtualizarStatusAgendamento/${id}`, {
                    nomeStatusAgendamento: "Concluido"
                });

                alert("Agendamento concluído com sucesso!");
                window.location.reload(); // 🔄 Recarrega a página para atualizar a lista do Pai
            } catch (error: any) {
                alert(`Erro ao concluir: ${error.message}`);
            }
        }
    };

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
                    style={{ cursor: 'pointer' }}
                >
                    <td>{agendamento?.dataAgendamento}</td>
                    <td>{agendamento?.horaAgendamento}</td>
                    <td>{agendamento?.nomePet}</td>
                    <td>{agendamento?.nomePorte}</td>
                    <td>{agendamento?.nomeTutor}</td>

                    {/* Dropdown de Serviços */}
                    <td
                        id={styles.dropdown_wrapper}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ServicosDropdown servicosString={servicosDoAgendamento} />
                    </td>

                    {/* Coluna Editar */}
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

                    {/* Coluna Concluir */}
                    <td className="w-12 text-center">
                        <button
                            type="button"
                            className="hover:scale-125 text-emerald-600 transition-transform p-2 text-xl"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                const agendamentoID = agendamento?.agendamentoID;

                                if (agendamentoID) {
                                    handleConcluirInterno(agendamentoID);
                                } else {
                                    console.error("ID do agendamento não encontrado para este card.");
                                }
                            }}
                        >
                            <Check className="w-6 h-6 text-[#163923] stroke-[5px]" />
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
                    <td>{agendamento?.nomeTutor}</td>
                    <td>{agendamento?.nomePet}</td>
                    <td>{agendamento?.nomeStatus}</td>
                    <td
                        id={styles.dropdown_wrapper}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ServicosDropdown servicosString={servicosDoAgendamento} />
                    </td>
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
    );
};

export default Card;