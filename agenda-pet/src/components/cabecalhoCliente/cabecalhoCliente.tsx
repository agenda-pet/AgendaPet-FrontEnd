import React from 'react'
import styles from '@/components/cabecalhoCliente/cabecalho.module.css'

interface UsuarioRecebido {
    usuarioID?: string;
    nome?: string,
    numeroTelefone?: string,
    email?: string,
}

const CabecalhoCliente = (usuario: UsuarioRecebido) => {
    return (
        <section id={styles.section}>
            <div className={styles.campo_info}>
                <span>Cliente:</span>
                <p>{usuario.nome}</p>
            </div>

            <div className={styles.campo_info}>
                <span>Numero:</span>
                <p>{usuario.numeroTelefone}</p>
            </div>

            <div className={styles.campo_info}>
                <span>Email:</span>
                <p>{usuario.email}</p>
            </div>
        </section>
    )
}

export default CabecalhoCliente