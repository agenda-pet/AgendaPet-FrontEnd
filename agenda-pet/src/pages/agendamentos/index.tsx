import Lista from "@/components/lista/lista";
import style from "./agendamentos.module.css";
import Header from "@/components/header/header";
import CadastroAgendamento from "@/components/Form/cadastrar-agendamento";

const ListaAgendamento = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <div className={style.voltarContainer}>
                    <h1 className="text-5xl font-semibold text-[#163923]">Agendamento</h1>
                </div>
                <div className="w-4/5 h-3/5 flex justify-center items-center m-10">
                    <CadastroAgendamento/>
                </div>    
                <Lista page="listaAgendamento" />
            </main>
        </>
    );
};

export default ListaAgendamento;