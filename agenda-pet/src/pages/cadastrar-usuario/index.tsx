import React, { useEffect, useState } from 'react'
import styles from './cadastrar.module.css'
import Header from '@/components/header/header'
import FormUsuario from '@/components/formUsuario/formEditar'
import { useRouter } from 'next/router'
import { listarTipoUsuarios } from '@/pages/api/tipoUsuarioService'
import CadastrarTutor from '@/components/Form/cadastrar-tutor'

interface UsuarioRecebido {
    usuarioID: string;
    nome: string,
    numeroTelefone: string,
    email: string,
    tipoUsuarioID: string,
    statusUsuarioID: boolean,
    nomePet: any
}

interface tipoUsuario {
    tipoUsuarioID: string;
    nomeRaca: string;
}

const index = () => {
    const [tipoUsuarioID, setTipoUsuario] = useState<string>("");
    const [usuarioBuscado, setUsuarioBuscado] = useState<UsuarioRecebido | null>(null);

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* <FormUsuario /> */}
                <CadastrarTutor/>
            </main>
        </>
    )
}

export default index
