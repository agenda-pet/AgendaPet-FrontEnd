import CadastrarAgendamento from "@/components/Form/cadastrar-agendamento"
import Header from "@/components/header/header"
import style from "./editar-agendamento.module.css"
import Link from "next/link"
const index = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <div className={style.voltarContainer}>
                    <Link href="/agendamentos" id={style.voltar}><span className={style.btnVoltar}>&larr; Voltar</span></Link>
                </div>
                <div className="w-4/5 max-w-[1000px] h-3/5 flex justify-center items-center mb-10">
                    <CadastrarAgendamento />
                </div>
            </main>
        </>
    )
}

export default index