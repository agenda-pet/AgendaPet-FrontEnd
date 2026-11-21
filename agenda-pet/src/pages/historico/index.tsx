import Header from "@/components/header/header"
import style from "./historico.module.css"
import Lista from "@/components/lista/lista"
const index = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <div className={style.voltarContainer}>
                    <h1 className="text-5xl font-semibold text-[#163923]">Histórico</h1>
                </div>
                <Lista page="listaHistorico" />
            </main>
        </>
    )
}

export default index