import Header from "@/components/header/header"
import style from "./historico.module.css"
import Lista from "@/components/lista/lista"
const index = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <h1 className="text-6xl text-[#163923] !p-4 !m-8">histórico</h1>
                <Lista page="listaHistorico" />
            </main>
        </>
    )
}

export default index