import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarPets } from '@/pages/api/petService';

type ListaProps = {
    page?: string;
};

interface Pet {
    petID: string,
    nome: string,
    tipoAnimal: string,
    comportamento: string,
    raca: string,
    porte: string,
    nomeDono: string
}

const Lista = ({ page }: ListaProps) => {

    const [pets, setPets] = useState<Pet[]>([]);

    async function listarPet() {
        try {
            const listarAnimal = await listarPets();
            setPets(listarAnimal);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        listarPet();
    }, [])

    return (
        <>
            {page === "listaAgendamento" && (

                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Raça</th>
                                <th>Porte</th>
                                <th>Pets</th>
                                <th>Serviços</th>
                                <th>Editar</th>
                            </tr>
                        </thead>

                        <tbody id={styles.tbody}>
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                        </tbody>
                    </table>
                </section>
            )}

            {page === "listaPets" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Nome</th>
                                <th>Comportamento</th>
                                <th>Tipo</th>
                                <th>Cliente</th>
                                <th>Raça</th>
                                <th>Porte</th>
                            </tr>
                        </thead>

                        <tbody id={styles.tbody}>
                            {pets.length > 0 ? pets.map((pet) => (
                                <Card
                                    key={pet.petID}
                                    page="listaPets"
                                    pet={pet}
                                />
                            )) : (
                                <tr>
                                    <td >Nenhum pet  encontrado</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </section>
            )}

            {page === "listaUsuarios" && (
                <section className={styles.section}>
                    <table className={styles.tabelaLista}>
                        <thead id={styles.thead}>
                            <tr>
                                <th>Nome</th>
                                <th>Número</th>
                                <th>Email</th>
                                <th>Editar</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>

                        <tbody id={styles.tbody}>
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                            <Card page="listaUsuarios" />
                        </tbody>
                    </table>
                </section>
            )}
        </>
    )
}

export default Lista;