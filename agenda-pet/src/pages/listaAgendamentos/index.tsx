// import Cadastro from "@/components/cadastro/cadastro";

import Cadastro from "@/components/Form/cadastrar-agendamento";
import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import style from "./listaAgendamento.module.css"
import CadastrarPet from "@/components/Form/cadastrar-pet";

const ListaAgendamento = () => {
    return (
        <>
            <Header />
            <main className="w-full h-screen flex items-center flex-col">
                <div className="w-4/5 h-3/5 flex justify-center items-center">
                    <CadastrarPet/>
                </div>
                <Lista page="listaAgendamento" />
            </main>
        </>
    )
}

export default ListaAgendamento;