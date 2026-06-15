import Cadastro from "@/components/cadastro/cadastro";
import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";


const ListaAgendamento = () => {
    return (
        <>
            <Header />
            <Cadastro page="agendamento"/>
            <Lista page="listaAgendamento" />
        </>
    )
}

export default ListaAgendamento;