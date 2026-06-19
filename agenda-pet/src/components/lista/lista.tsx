import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
>>>>>>> feature/listaAgendamentos
import Card from '../card/card';
import styles from './lista.module.css';
import { listarAgendamentos } from '@/pages/api/agendamentoService';
import Link from 'next/link';

type ListaProps = {
    page?: string;
};

<<<<<<< HEAD
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
=======
interface Agendamento {
    agendamentoID: string,
    dataAgendamento: string,
    horaAgendamento: string,
    nomePorte: string,
    nomeRaca: string,
    nomeTutor: string,
    nomePet: string,
>>>>>>> feature/listaAgendamentos
}

const Lista = ({ page }: ListaProps) => {

<<<<<<< HEAD
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    async function listarUsu() {
        try {
            const listarUsuario = await listarUsuarios();
            console.log(listarUsuario);
            setUsuarios(listarUsuario.data);
        } catch (error: any) {
            console.log(error.mensage);
        }
    }

    useEffect(() => {
        listarUsu();
    }, [])


    const [pets, setPets] = useState<Pet[]>([]);

    async function listarPet() {
        try {
            const listarAnimal = await listarPets();
            setPets(listarAnimal);
=======
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    async function listarAgenda() {
        try {
            const listarAgendamento = await listarAgendamentos();
            setAgendamentos(listarAgendamento.data);
>>>>>>> feature/listaAgendamentos
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
<<<<<<< HEAD
        listarPet();
=======
        listarAgenda();
>>>>>>> feature/listaAgendamentos
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
<<<<<<< HEAD
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
                            <Card page="listaAgendamento" />
=======
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
>>>>>>> feature/listaAgendamentos
                        </tbody>
                    </table>
                </section>
            )}

<<<<<<< HEAD
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
=======
          
>>>>>>> feature/listaAgendamentos
        </>
    )
}

export default Lista;