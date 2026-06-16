import React, { useEffect, useState } from 'react'
import styles from "../formEditar/formEditar.module.css"
import { editarUsuario } from '@/pages/api/usuarioService'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'

interface EditarUsuarioForm {
    nome: string;
    email: string;
    numeroTelefone: string;
    tipoUsuarioID: string;
}

const FormEditar = () => {
    const [usuario, setUsuario] = useState<EditarUsuarioForm | null>(null)
    const [usuarioNome, setUsuarioNome] = useState<string | null>("");
    const [usuarioTelefone, setUsuarioTelefone] = useState<string | null>("");
    const [usuarioEmail, setUsuarioEmail] = useState<string | null>("");
    const [tipoUsuario, setTipoUsuario] = useState<string | null>("");

    const params = useParams();
    const id = params?.id;


    useEffect(() => {

    }, [])

    return (
        <form id={styles.editar} onSubmit={(e) => {
            e.preventDefault();
            editarUsuario(Number(id), usuario!)
        }}>
            <div id={styles.form_content}>
                <h3>Nome usuario:</h3>

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
                        <select id={styles.select} onChange={(e) => setTipoUsuario(e.target.selectedOptions)}>
                            <option value="null"></option>
                            <option value="cliente">Cliente</option>
                            <option value="Funcionario">Functionario</option>
                        </select>
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="numero">Numero:</label>
                        <input type='tel' name="numero" className={styles.input_tipo2} onChange={(e) => setUsuarioTelefone(e.target.value)} />
                    </div>
                </div>

                <button id={styles.button}>Salvar</button>
            </div>
        </form >
    )
}

export default FormEditar