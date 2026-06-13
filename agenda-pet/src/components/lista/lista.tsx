import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarUsuarios } from '@/pages/api/usuario';

type ListaProps = {
    page?: string;
};

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}

const Lista = ({ page }: ListaProps) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    async function listarUsu() {
        try {
            const listarUsuario = await listarUsuarios();
            console.log(listarUsuario);
            setUsuarios(listarUsuario.data);
        } catch (error: any) {
            console.log(error.mensage);
        }
    }

    useEffect(() => {
        listarUsu();
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
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
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
                            {usuarios.length > 0 ? usuarios.map((usuario) => (
                                <Card
                                    key={usuario.usuarioID}
                                    page="listaUsuarios"
                                    usuario={usuario}
                                />
                            )) : (
                                <tr>
                                    <td >Nenhum usuario encontrado</td>
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