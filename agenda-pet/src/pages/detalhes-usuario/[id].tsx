<<<<<<< HEAD
import Header from "@/components/header/header"
import styles from "@/pages/detalhes/detalhe.module.css"
import Link from "next/link"
import Usuarios from "../usuarios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { listarUsuariosPorId } from "../api/usuarioService"
import Lista from "@/components/lista/lista"

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}
const Detalhes = () => {

    const [usuario, setUsuario] = useState<Usuario>();
=======
import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listarAgendamentosPorId } from "../api/agendamentoService";
import styles from"@/pages/detalhes/detalhes.module.css"
import Link from "next/link";
import Card from "@/components/card/card";

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


const Detalhes = () => {

    const [agendamento, setAgendamento] = useState<Agendamento>();
>>>>>>> feature/listaAgendamentos

    const params = useParams();

    const id = params?.id;

<<<<<<< HEAD
    async function listarUsuario() {
        try {
            const response = await listarUsuariosPorId(String(id));
            console.log(response.data);
            setUsuario(response.data);
        } catch (error: any) {
            console.log(error.message)
=======
    async function listarAgendamento() {
        try {
            const response = await listarAgendamentosPorId(String(id));
            setAgendamento(response.data);
        } catch (error: any) {
            console.log(error.message);
>>>>>>> feature/listaAgendamentos
        }
    }

    useEffect(() => {
<<<<<<< HEAD
        if(!id) return;

        listarUsuario();
    }, [id])
=======
        if (!id) return;

            listarAgendamento();
    }, [id]);
>>>>>>> feature/listaAgendamentos

    return (
        <>
            <Header />
            <main>
<<<<<<< HEAD
                <section className={styles.section}>
                    <div className={styles.containerDetalhes}>
                        <div className={styles.voltarContainer}>
                            <Link href="/usuarios" id={styles.voltar}><span className={styles.btnVoltar}>&larr; Voltar</span></Link>
                        </div>

                        <h2 className={styles.tituloSecao}>Usuario: {usuario?.nome}</h2>
=======

                <section className={styles.section}>
                    <div className={styles.containerDetalhes}>
                        <div className={styles.voltarContainer}>
                            <Link href="/agendamentos" id={styles.voltar}><span className={styles.btnVoltar}>&larr; Voltar</span></Link>
                        </div>

                        <h2 className={styles.tituloSecao}>Agendamentos: (Nome do Cliente)</h2>
>>>>>>> feature/listaAgendamentos

                        <div className={styles.cardAgendamentoAtual}>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Cliente</span>
<<<<<<< HEAD
                                <span className={styles.valor}>{usuario?.nome}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Número</span>
                                <span className={styles.valor}>{usuario?.numeroTelefone}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.valor}>{usuario?.email}</span>
=======
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
>>>>>>> feature/listaAgendamentos
                            </div>
                        </div>

                        <h3 className={styles.subTituloSecao}>Histórico:</h3>

                        <div className={styles.historicoLista}>
<<<<<<< HEAD
                            <Lista page="listaUsuarios"/>
=======
                            <Card page="detalheHistoricoItem" />
>>>>>>> feature/listaAgendamentos
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Detalhes;