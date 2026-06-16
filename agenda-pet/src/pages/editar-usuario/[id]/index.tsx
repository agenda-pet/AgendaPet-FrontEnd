import React from 'react'
import styles from '@/pages/editar-usuario/[id]/editar.module.css'
import FormEditar from '@/components/formEditar/formEditar'
import Header from '@/components/header/header'

const index = () => {
  return (
    <>
      <Header />
      <main id={styles.main}>
        <div id={styles.container_titulo}>
        <h1>Editar usuario:</h1>
        </div>
        <FormEditar />
      </main>
    </>
  )
}

export default index