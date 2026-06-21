import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./login.module.css";
import { erro, notificacao } from "@/utils/toast";
import { login } from "../api/authService";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [ativo, setAtivo] = useState<boolean>(false);

    async function fazerLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const resposta = await login(
                email,
                senha
            );

            console.log(resposta)

            notificacao("Login bem sucedido!")

            router.push("/agendamentos");
        } catch (error: any) {
            erro(error.message);
        }
    }
    return (
        <>
        <main className={styles.Login}>
            <section className={styles.loginImagens}>
                <img
                    src="../imgs/gatinhoLoginCortado.png"
                    alt="Imagem de fundo relacionada à tecnologia"
                    className={styles.gatinho}
                />
            </section>
 
            <section className={styles.AreaLogin}>
                <form className={styles.titulo} onSubmit={fazerLogin} >
                    <h1>Login</h1>
 
                    <div className={styles.email}>
                        <label htmlFor="email">Email</label>
 
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Insira o seu Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
 
                    <div className={styles.senha}>
                        <label htmlFor="senha">Senha</label>
 
                        <div className={styles.senhaErrada}>
                            <input
                                type={`${ativo ? "text" : "password"}`}
                                id="senha"
                                name="senha"
                                placeholder="Insira a sua senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />
 
                            <button
                                type="button"
                                className={styles.visualizarSenha}
                                aria-label="Mostrar senha"
                                onClick={() => setAtivo(!ativo)}
                            >
                                👁
                            </button>
                        </div>
                    </div>
 
                    <button type="submit" className={styles.login_button}>
                        Entrar
                    </button>
                </form>
            </section>
        </main>
        </>
    )
}

export default Login;