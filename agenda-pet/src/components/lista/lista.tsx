import Card from '../card/card';
import styles from './lista.module.css';

type ListaProps = {
    page?: string;
};

const Lista = ({ page }: ListaProps) => {
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
                            <Card page="listaAgendamento"/>
                            <Card page="listaAgendamento"/>
                            <Card page="listaAgendamento"/>
                            <Card page="listaAgendamento"/>
                            <Card page="listaAgendamento"/>
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
                            <Card page="listaPets"/>
                            <Card page="listaPets"/>
                            <Card page="listaPets"/>
                            <Card page="listaPets"/>
                            <Card page="listaPets"/>
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
                            <Card page="listaUsuarios"/>
                            <Card page="listaUsuarios"/>
                            <Card page="listaUsuarios"/>
                            <Card page="listaUsuarios"/>
                            <Card page="listaUsuarios"/>
                        </tbody>
                    </table>
                </section>
            )}
        </>
    )
}

export default Lista;