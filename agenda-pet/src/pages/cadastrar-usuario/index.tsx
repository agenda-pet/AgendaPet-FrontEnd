import styles from './cadastrar.module.css'
import Header from '@/components/header/header'
import CadastrarTutor from '@/components/Form/cadastrar-tutor'

const index = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <CadastrarTutor/>
            </main>
        </>
    )
}

export default index
