import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import styles from "./listaUsuarios.module.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cadastrarUsuario } from "../api/usuarioService";
import { listarTipoUsuarios } from "../api/tipoUsuarioService";
import CadastrarTutor from "@/components/Form/cadastrar-tutor";

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
        setTipoUsuarios(listaTipoUsuarios);
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

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className="w-4/5 h-4/5 flex justify-center items-center !m-10">
                    <CadastrarTutor />
                </div>
                <Lista page="listaUsuarios" />
            </main>

        </>
    )
}

export default Usuarios;