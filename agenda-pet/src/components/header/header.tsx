import Link from "next/link";
import styles from "./header.module.css"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";

type usuarioToken = {
    //* NOME
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string,
    //* EMAIL 
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string,
}

const Header = () => {

    const router = useRouter();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const isActive = (path: string) => router.pathname.startsWith(path);

    async function getIdToken() {
    const token = secureLocalStorage.getItem("Token") as string;


    if (!token) {
      console.log("Token não encontrado")
      return null;
    }

    try {
      const objToken = jwtDecode<usuarioToken>(token);
      console.log(objToken)


      const tokenUsuario = {
        nome: objToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: objToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      };

      setNome(tokenUsuario.nome);
      setEmail(tokenUsuario.email);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getIdToken();
  }, [])

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src="../imgs/LogoAgendaPet.png" alt="Logo Agenda Pet" id={styles.Logo} />
                <nav className={styles.nav_bar}>
                   <Link 
                        href="/agendamentos" 
                        className={isActive("/agendamentos") ? "!text-[#FFA800] font-semibold" : "text-zinc-800"}
                    >
                        Agendamento
                    </Link>
                    <Link 
                        href="/historico" 
                        className={isActive("/historico") ? "!text-[#FFA800] font-semibold" : "text-zinc-800"}
                    >
                        Histórico
                    </Link>
                    <Link 
                        href="/pets" 
                        className={isActive("/pets") ? "!text-[#FFA800] font-semibold" : "text-zinc-800"}
                    >
                        Pets
                    </Link>
                    <Link 
                        href="/usuarios" 
                        className={isActive("/usuarios") ? "!text-[#FFA800] font-semibold" : "text-zinc-800"}
                    >
                        Usuários
                    </Link>
                </nav>
                <div id={styles.info_header}>
                    <div id={styles.icone}>
                        <img src="../imgs/IconeUsuario.png" alt="" />
                    </div>
                    <div id={styles.usuario_header}>
                        <p  className="text-2xl font-semibold">{nome}</p>
                        <h2 className="text-lg font-medium">{email}</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;