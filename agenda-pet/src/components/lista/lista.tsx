import { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from './lista.module.css';
import { listarUsuarios } from '@/pages/api/usuarioService';
import { listarPets, ListarPetsPorTutor } from '@/pages/api/petService';
import { listarAgendamentos } from '@/pages/api/agendamentoService';

type ListaProps = {
    page?: string;
    usuarioId?: string;
};

interface Usuario {
    usuarioID: string,
    nome: string,
    numeroTelefone: number,
    email: string,
}

interface Pet {
    petID: string,
    nome: string,
    tipoAnimal: string,
    comportamento: string,
    raca: string,
    porte: string,
    nomeDono: string
}

interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
    nomePet: string,
}


const Lista = ({ page, usuarioId }: ListaProps) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    async function listarUsu() {
        try {
            const listarUsuario = await listarUsuarios();
            console.log(listarUsuario);
            setUsuarios(listarUsuario.data);
        } catch (error: any) {
            console.log(error.mensage);
        }
    }


    async function carregarPets() {
        try {
            if (usuarioId) {
                const dadosPetsTutor = await ListarPetsPorTutor(usuarioId);
                setPets(dadosPetsTutor);
            } else {
                const listarAnimal = await listarPets();
                setPets(listarAnimal);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async function listarAgenda() {
        try {
            const listarAgendamento = await listarAgendamentos();
            setAgendamentos(listarAgendamento.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        listarUsu();
        if (page === "listaPets") {
            carregarPets();
        }
        listarAgenda();

        window.addEventListener("pet-cadastrado", carregarPets);

        return () => {
            window.removeEventListener("pet-cadastrado", carregarPets);
        };
    }, [page, usuarioId])

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
                            {agendamentos?.length > 0 ? agendamentos.map((agendamento) => (
                                <Card
                                    key={agendamento.agendamentoID}
                                    page="listaAgendamento"
                                    agendamento={agendamento}
                                />
                            )) : (
                                <tr>
                                    <td colSpan={7}>Nenhum agendamento encontrado</td>
                                </tr>
                            )}
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
                            {pets.length > 0 ? pets.map((pet: any) => (
                                <Card
                                    key={pet.petID}
                                    page="listaPets"
                                    pet={{
                                        petID: pet.petID,
                                        nome: pet.nome,
                                        nomeDono: pet.nomeDono,
                                        nomeTipo: pet.nomeTipo,
                                        nomeComportamento: pet.nomeComportamento,
                                        nomeRaca: pet.nomeRaca,
                                        nomePorte: pet.nomePorte
                                    }}
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
                            {usuarios.length > 0 ? usuarios.map((usuario) => (
                                <Card
                                    key={usuario.usuarioID}
                                    page="listaUsuarios"
                                    usuario={usuario}
                                />
                            )) : (
                                <tr>
                                    <td >Nenhum usuario encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    )
}

export default Lista;