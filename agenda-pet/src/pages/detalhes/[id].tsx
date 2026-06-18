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

    const params = useParams();

    const id = params?.id;

    async function listarUsuario() {
        try {
            const response = await listarUsuariosPorId(String(id));
            console.log(response.data);
            setUsuario(response.data);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if(!id) return;

        listarUsuario();
    }, [id])

    return (
        <>
            <Header />
            <main>
                <section className={styles.section}>
                    <div className={styles.containerDetalhes}>
                        <div className={styles.voltarContainer}>
                            <Link href="/usuarios" id={styles.voltar}><span className={styles.btnVoltar}>&larr; Voltar</span></Link>
                        </div>

                        <h2 className={styles.tituloSecao}>Usuario: {usuario?.nome}</h2>

                        <div className={styles.cardAgendamentoAtual}>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Cliente</span>
                                <span className={styles.valor}>{usuario?.nome}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Número</span>
                                <span className={styles.valor}>{usuario?.numeroTelefone}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.valor}>{usuario?.email}</span>
                            </div>
                        </div>

                        <h3 className={styles.subTituloSecao}>Histórico:</h3>

                        <div className={styles.historicoLista}>
                            <Lista page="listaUsuarios"/>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Detalhes;