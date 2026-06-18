import Link from 'next/link';
import styles from './card.module.css';

type CardProps = {
    page?: string;
    usuario?: Usuario;
};

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}

const Card = ({ page, usuario }: CardProps) => {

    
    return (
        <>
            {page === "listaUsuarios" && (
                <tr className={styles.trCard}>
                    <td>{usuario?.nome}</td>
                    <td>{usuario?.numeroTelefone}</td>
                    <td>{usuario?.email}</td>
                    <td><img src="../imgs/IconePatinhaEditar.png" alt="" /></td>
                    <td><Link href={"/detalhes/" + usuario?.usuarioID}><img src="../imgs/IconePatinhaInformacoes.png" alt="" id={styles.patinhaInfo}/></Link></td>
                </tr>
            )}
        </>
    )
}

export default Card;