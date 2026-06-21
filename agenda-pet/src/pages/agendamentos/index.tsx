import Lista from "@/components/lista/lista";
import styles from "./agendamentos.module.css";
import Header from "@/components/header/header";
import CadastroAgendamento from "@/components/Form/cadastrar-agendamento";

const ListaAgendamento = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className="w-4/5 h-3/5 flex justify-center items-center mb-10">
                    <CadastroAgendamento/>
                </div>    
                <Lista page="listaAgendamento" />
            </main>
        </>
    );
};

export default ListaAgendamento;