import styles from './card.module.css';

type CardProps = {
    page?: string;
    agendamento?: Agendamento;
};

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string, 
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
}

const Card = ({ page, agendamento }: CardProps) => {
    return (
        <>
            {page === "listaAgendamento" && (

                <tr className={styles.trCard}>
                    <td>{agendamento?.dataAgendamento}</td>
                    <td>{agendamento?.horaAgendamento}</td>
                    <td>{agendamento?.nomeRaca}</td>
                    <td>{agendamento?.nomePorte}</td>
                    <td>{agendamento?.nomeTutor}</td>
                    <td id={styles.dropdown_wrapper}>
                        <button className={styles.dropdown_btn} id="dropdownBtn">
                            <span>Banho</span>
                            <img src="../imgs/SetaDropDown.png" alt="" />
                        </button>
                        <ul className={styles.dropdown_list} id="dropdownList">
                            <li className={styles.dropdown_item + ' ' + styles.active} data-value="banho">Banho</li>
                            <li className={styles.dropdown_item} data-value="tosa">Tosa</li>
                            <li className={styles.dropdown_item} data-value="consulta">Consulta</li>
                        </ul>
                    </td>
                    <td><img src="../imgs/IconePatinhaEditar.png" alt="" /></td>
                </tr>
            )}

            {page === "listaPets" && (

                <tr className={styles.trCard}>
                    <td>Fofinho</td>
                    <td>Raivoso</td>
                    <td>Cachorro</td>
                    <td>Allan</td>
                    <td>Shitzu</td>
                    <td>Pequeno</td>
                </tr>
            )}

            {page === "listaUsuarios" && (
                <tr className={styles.trCard}>
                    <td>Allan</td>
                    <td>(11) 99999-9999</td>
                    <td>allan@gmail.com</td>
                    <td><img src="../imgs/IconePatinhaEditar.png" alt="" /></td>
                    <td><img src="../imgs/IconePatinhaInformacoes.png" alt="" /></td>
                </tr>
            )}

            {page === "detalheHistoricoItem" && (
                <div className={styles.cardHistoricoContainer}>
                    <table className={styles.tabelaInternaHistorico}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Pet</th>
                                <th>Horário</th>
                                <th>Tutor</th>
                                <th>Status</th>
                                <th>Serviços</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>09/02/2026</td>
                                <td>Belinha</td>
                                <td>17:30</td>
                                <td>Allan</td>
                                <td>
                                    <span className={styles.statusPendente}>Pendente</span>
                                </td>
                                <td>
                                    <select className={styles.selectServicos} defaultValue="Banho">
                                        <option value="Banho">Banho</option>
                                        <option value="tosa">tosa</option>
                                        <option value="unha">Cortar unha</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.dataAlteracaoContainer}>
                        <span>Data Alteração: 10/02/2026</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card;