import React, { useEffect, useState } from 'react'
import styles from "../formUsuario/formUsuario.module.css"
import { cadastrarUsuario, editarUsuario} from '@/pages/api/usuarioService'
import { useRouter } from 'next/router'
import { useParams, useSearchParams } from 'next/navigation'
import { listarTipoUsuarios } from '@/pages/api/tipoUsuarioService'

interface tipoUsuario {
    tipoUsuarioID: string;
    nomeRaca: string;
}

interface UsuarioRecebido {
    usuarioID?: string;
    nome?: string,
    numeroTelefone?: string,
    email?: string,
    tipoUsuarioID?: string,
    statusUsuarioID?: boolean,
    nomePet?: any
}

type UsuarioFormulario = {
    nome: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    tipoUsuarioID: string;
}

const FormUsuario = (usuarioRecebido?: UsuarioRecebido) => {
    const [nome, setUsuarioNome] = useState<string>("");
    const [numeroTelefone, setUsuarioTelefone] = useState<string>("");
    const [email, setUsuarioEmail] = useState<string>("");
    const [tiposUsuario, setTiposUsuario] = useState<tipoUsuario[]>([]);
    const [tipoUsuarioID, setTipoUsuario] = useState<string>("");
    const [senha, setSenha] = useState("");
    const statusUsuario = true;

    const UsuarioFormulario = {
        nome,
        numeroTelefone,
        email,
        senha,
        statusUsuario,
        tipoUsuarioID,
    }

    const usuarioEditado = {
        nome,
        numeroTelefone,
        email,
        tipoUsuarioID,
    }

    async function pegarTipos() {
        const tipos = await listarTipoUsuarios();
        setTiposUsuario(tipos);
    }

    useEffect(() => {
        pegarTipos();
    }, [])

    useEffect(() => {
        setSenha(numeroTelefone.slice(7));
        console.log(senha)
    }, [usuarioEditado])

    return (
        <form id={styles.editar} onSubmit={(e) => {
            e.preventDefault();
            console.log(usuarioEditado)
            console.log(`O nome é: ${nome}
                        O email: ${email}
                        O telefone: ${numeroTelefone}
                        O tipo ${tipoUsuarioID}`);

            usuarioRecebido?.usuarioID == null ? cadastrarUsuario(UsuarioFormulario) : editarUsuario(String(usuarioRecebido?.usuarioID), usuarioEditado);
        }}>

            <div id={styles.form_content}>
                <h3><strong>{usuarioRecebido?.usuarioID == null ? 'Cadatrar usuario' : 'Editar usuario'}:</strong></h3>
                <div id={styles.inputs_button}>

                    <div id={styles.inputs_container}>
                        <div className={styles.input}>
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" className={styles.input_tipo1} onChange={(e) => setUsuarioNome(e.target.value) ?? usuarioRecebido?.nome} defaultValue={usuarioRecebido?.nome ?? ""} />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" className={styles.input_tipo1} onChange={(e) => setUsuarioEmail(e.target.value) ?? usuarioRecebido?.email} defaultValue={usuarioRecebido?.email ?? ""} />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="tipoUser">Tipo Usuario:</label>
                            <select id={styles.select} onChange={(e) => setTipoUsuario(e.target.value)}>
                                {tiposUsuario.map((classific) => (
                                    <option key={classific.tipoUsuarioID} value={classific.tipoUsuarioID}>{classific.nomeRaca}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="numero">Numero:</label>
                            <input type='tel' name="numero" className={styles.input_tipo2} defaultValue={usuarioRecebido?.numeroTelefone ?? ""} onChange={(e) => setUsuarioTelefone(e.target.value) ?? usuarioRecebido?.numeroTelefone} />
                        </div>
                    </div>

                    <button id={styles.button}>Salvar</button>
                </div>
            </div>
        </form >
    )
}

export default FormUsuario