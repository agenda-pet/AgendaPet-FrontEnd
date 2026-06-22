import Header from '@/components/header/header'
import React, { useEffect, useState } from 'react'
import styles from '@/pages/pets-cliente/[id]/petsCliente.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CabecalhoCliente from '@/components/cabecalhoCliente/cabecalhoCliente'
import Lista from '@/components/lista/lista'
import { obterUsuarioPorId } from '@/pages/api/usuarioService'

interface UsuarioBuscado {
    usuarioID?: string;
    nome?: string,
    numeroTelefone?: string,
    email?: string,
    tipoUsuarioID?: string,
    statusUsuarioID?: boolean,
    nomePet?: any
}

const index = () => {
    const [usuario, setUsuario] = useState<UsuarioBuscado | null>(null)

    const router = useRouter();
    const { id } = router.query;

    async function lerUsuario() {
        const tipos = await obterUsuarioPorId(String(id));
        setUsuario(tipos);
    }

    useEffect(() => {
        if (!router.isReady) return;
        console.log(id)
        lerUsuario();
    }, [router.isReady])

    return (
        <>
            <Header />
            <main id={styles.main}>
                <div className='display-grid' id={styles.container_top}>
                    <Link href='/home'>Voltar</Link>
                    <h1>Pets de {usuario?.nome}</h1>
                </div>

                <CabecalhoCliente key={usuario?.usuarioID}
                    usuarioID={usuario?.usuarioID}
                    nome={usuario?.nome}
                    email={usuario?.email}
                    numeroTelefone={usuario?.numeroTelefone}
                />
            </main>
        </>
    )
}

export default index