import Header from "@/components/header/header"
import style from "./historico.module.css"
import Lista from "@/components/lista/lista"
const index = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <h1>histórico</h1>
                <Lista page="listaHistorico"/>
            </main>
        </>
    )
}

export default index