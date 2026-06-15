import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import styles from "./listaUsuarios.module.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cadastrarUsuario } from "../api/usuarioService";
import { listarTipoUsuarios } from "../api/tipoUsuarioService";

interface TipoUsuario {
    tipoUsuarioID: string;
    nomeTipo: string;
}


const Usuarios = () => {

    const [tipoUsuarios, setTipoUsuarios] = useState<TipoUsuario[]>([]);
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [numeroTelefone, setNumeroTelefone] = useState<string>("");
    const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    async function listarTipoUsuarioEmUsuario() {
        const listaTipoUsuarios = await listarTipoUsuarios();
        console.log(listaTipoUsuarios);
        setTipoUsuarios(listaTipoUsuarios.data);
    }

    async function salvarUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const dados = {
                nome,
                email,
                numeroTelefone,
                senha,
                tipoUsuarioID: tipoUsuarioSelecionado,
            }

            await cadastrarUsuario(dados);
            alert("Usuário cadastrado com sucesso!");
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect(() => {
        listarTipoUsuarioEmUsuario();
    }, [])

    console.log(nome);
    console.log(email);
    console.log(numeroTelefone);
    console.log(tipoUsuarioSelecionado);
    console.log(senha);
    return (
        <>
            <Header />
            <main className={styles.main}>
                <form className={styles.form} onSubmit={salvarUsuario}>
                    <label htmlFor="nome">Nome:</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} />

                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="telefone">Telefone:</label>
                    <input value={numeroTelefone} onChange={(e) => setNumeroTelefone(e.target.value)} />

                    <label htmlFor="tipoUsuario">TipoUsuario:</label>
                    <select 
                        value={tipoUsuarioSelecionado}
                        onChange={(e) => setTipoUsuarioSelecionado(e.target.value)}
                    >
                        {tipoUsuarios.map((item)=> (
                            <option value={item.tipoUsuarioID}>{item.nomeTipo}</option>
                        ))}
                    </select>

                    <label htmlFor="senha">Senha:</label>
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} />

                    <button type="submit" >Salvar</button>
                </form>
            </main>

            <Lista page="listaUsuarios" />
        </>
    )
}

export default Usuarios;