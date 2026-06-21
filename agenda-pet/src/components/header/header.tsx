import Link from "next/link";
import styles from "./header.module.css"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src="../imgs/LogoAgendaPet.png" alt="Logo Agenda Pet" id={styles.Logo} />
                <nav className={styles.nav_bar}>
                    <Link href="/agendamentos">Agendamento</Link>
                    <Link href="/">Histórico</Link>
                    <Link href="/pets">Pets</Link>
                    <Link href="/usuarios">Usuários</Link>
                </nav>
                <div id={styles.info_header}>
                    <div id={styles.icone}>
                        <img src="../imgs/IconeUsuario.png" alt="" />
                    </div>
                    <div id={styles.usuario_header}>
                        <h1>Felipea</h1>
                        <h2>felipe@gmail.com</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;