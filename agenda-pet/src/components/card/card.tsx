import styles from './card.module.css';

type CardProps = {
    page?: string;
    pet?: Pet;
};

interface Pet {
    petID: string,
    nome: string,
    tipoAnimal: string,
    comportamento: string,
    raca: string,
    porte: string,
    nomeDono: string
}

const Card = ({ page, pet }: CardProps) => {
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
                    <td>{pet?.nome}</td>
                    <td>{pet?.comportamento}</td>
                    <td>{pet?.tipoAnimal}</td>
                    <td>{pet?.nomeDono}</td>
                    <td>{pet?.raca}</td>
                    <td>{pet?.porte}</td>
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