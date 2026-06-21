import React, { useEffect, useState } from 'react'
import styles from "./detalhes.module.css";
import Header from '@/components/header/header'
import FormUsuario from '@/components/formUsuario/formEditar'
import { useRouter } from 'next/router'
import { listarUsuariosPorId } from '@/pages/api/usuarioService'
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
  const [usuarioBuscado, setUsuarioBuscado] = useState<UsuarioRecebido | null>(null);

  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (!router.isReady) return;
    lerUsuario();
  }, [router.isReady]);

  async function lerUsuario() {
    const tipos = await listarUsuariosPorId(String(id));
    setUsuarioBuscado(tipos);
  }

  return (
    <>
      <Header />
      <main id={styles.main}>
        <div id={styles.container_titulo}>
        </div>
        <FormUsuario key={usuarioBuscado?.usuarioID}
          usuarioID={usuarioBuscado?.usuarioID}
          nome={usuarioBuscado?.nome}
          email={usuarioBuscado?.email}
          statusUsuarioID={true}
          tipoUsuarioID={usuarioBuscado?.tipoUsuarioID}
          numeroTelefone={usuarioBuscado?.numeroTelefone}
          nomePet={usuarioBuscado?.nomePet}
        />
      </main>
    </>
  )
}

export default index
