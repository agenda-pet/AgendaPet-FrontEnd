import Link from 'next/link';
import styles from './card.module.css';

type CardProps = {
    page?: string;
    pet?: Pet;
    usuario?: Usuario;
    agendamento?: Agendamento;
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
    nomeTutor: string,
}

const Card = ({ page, usuario, pet, agendamento }: CardProps) => {


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
                    <td> <Link href={"/detalhes-agendamento/" + agendamento?.agendamentoID}><img src="../imgs/IconePatinhaEditar.png" alt="" /></Link></td>

                </tr>
            )}
            {page === "listaUsuarios" && (
                <tr className={styles.trCard}>
                    <td>{usuario?.nome}</td>
                    <td>{usuario?.numeroTelefone}</td>
                    <td>{usuario?.email}</td>
                    <td><img src="../imgs/IconePatinhaEditar.png" alt="" /></td>
                    <td><Link href={"/detalhes-usuario/" + usuario?.usuarioID}><img src="../imgs/IconePatinhaInformacoes.png" alt="" id={styles.patinhaInfo} /></Link></td>
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

        </>
    )
}

export default Card;