import styles from './card.module.css';

type CardProps = {
    page?: string;
};

const Card = ({ page }: CardProps) => {
    return (
        <>
            {page === "listaAgendamento" && (

                <tr className={styles.trCard}>
                    <td>09/10/2021</td>
                    <td>17:00</td>
                    <td>Shitzu</td>
                    <td>Pequeno</td>
                    <td>Allan</td>
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
        </>
    )
}

export default Card;