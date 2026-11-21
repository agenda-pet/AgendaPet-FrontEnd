import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import styles from "./pets.module.css";
import CadastrarPet from "@/components/Form/cadastrar-pet";

const ListaPets = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.voltarContainer}>
                    <h1 className="text-5xl font-semibold text-[#163923]">Pets</h1>    
                </div> 
                <div className="w-4/5 h-3/5 flex justify-center items-center mb-10">
                    <CadastrarPet />
                </div>
                <Lista page="listaPets" />
            </main>
        </>
    );
};

export default ListaPets;