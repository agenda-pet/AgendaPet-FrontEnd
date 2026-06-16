import React, { useEffect, useState } from 'react'
import styles from "../formEditar/formEditar.module.css"
import { editarUsuario, obterUsuarioPorId } from '@/pages/api/usuarioService'
import { useRouter } from 'next/router'
import { useParams, useSearchParams } from 'next/navigation'
import { listarTipoUsuarios } from '@/pages/api/tipoUsuarioService'

interface tipoUsuario {
    tipoUsuarioID: string;
    nomeRaca: string;
}

interface usuarioForma {
    usuarioID: string;
    nome: string,
    numeroTelefone: string,
    email: string,
    tipoUsuarioID: string,
    statusUsuarioID: boolean,
    nomePet: any
}


const FormEditar = () => {
    const [nome, setUsuarioNome] = useState<string>("");
    const [numeroTelefone, setUsuarioTelefone] = useState<string>("");
    const [email, setUsuarioEmail] = useState<string>("");
    const [tiposUsuario, setTiposUsuario] = useState<tipoUsuario[]>([])
    const [tipoUsuarioID, setTipoUsuario] = useState<string>("");
    const [usuarioBuscado, setUsuarioBuscado] = useState<usuarioForma | null>(null)

    const usuario = {
        nome,
        numeroTelefone,
        email,
        tipoUsuarioID,
    }

    async function lerUsuario() {
        const tipos = await obterUsuarioPorId(String(id));
        setUsuarioBuscado(tipos as any);
    }

    async function pegarTipos() {
        const tipos = await listarTipoUsuarios();
        setTiposUsuario(tipos as any);
    }

    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        if (!router.isReady) return;
        lerUsuario();
        pegarTipos();

    }, [router.isReady]);

    return (
        <form id={styles.editar} onSubmit={(e) => {
            e.preventDefault();
            console.log(usuario)
            console.log(`O nome é: ${nome}
                        O email: ${email}
                        O telefone: ${numeroTelefone}
                        O tipo ${tipoUsuarioID}`);

            editarUsuario(String(id), usuario);
        }}>

            <div id={styles.form_content}>
                <h3>{usuarioBuscado?.nome}:</h3>
                <div id={styles.inputs_button}>

                    <div id={styles.inputs_container}>
                        <div className={styles.input}>
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" className={styles.input_tipo1} onChange={(e) => setUsuarioNome(e.target.value)} />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" className={styles.input_tipo1} onChange={(e) => setUsuarioEmail(e.target.value)} />
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
                            <input type='tel' name="numero" className={styles.input_tipo2} onChange={(e) => setUsuarioTelefone(e.target.value)} />
                        </div>
                    </div>

                    <button id={styles.button}>Salvar</button>
                </div>
            </div>
        </form >
    )
}

export default FormEditar