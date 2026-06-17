import React, { useEffect, useState } from 'react'
import styles from '@/pages/editar-usuario/[id]/editar.module.css'
import Header from '@/components/header/header'
import FormUsuario from '@/components/formUsuario/formEditar'
import { useRouter } from 'next/router'
import { obterUsuarioPorId } from '@/pages/api/usuarioService'
import { listarTipoUsuarios } from '@/pages/api/tipoUsuarioService'

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
            <main id={styles.main}>
                <div id={styles.container_titulo}>
                    <h1>Usuarios cadastrados:</h1>
                </div>
                <FormUsuario />
            </main>
        </>
    )
}

export default index
