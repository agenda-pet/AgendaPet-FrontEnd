// import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import styles from "./agendamentos.module.css";
import { useEffect, useState } from "react";
import { listarUsuarios } from "../api/usuarioService";
import { listarPets } from "../api/petService";
import { listarServicos } from "../api/servicoService";
import { cadastrarAgendamento } from "../api/agendamentoService";
import Header from "@/components/header/header";

interface Usuario {
    usuarioID: string;
    nome: string;
}

interface Pet {
    petID: string;
    nome: string;
}

interface Servico {
    servicoID: string;
    nomeServico: string;
}

const ListaAgendamento = () => {

    const [pets, setPets] = useState<Pet[]>([])
    const [petSelecionado, setPetSelecionado] = useState<string>("")
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>("")
    const [servicos, setServicos] = useState<Servico[]>([])
    const [servicoSelecionados, setServicoSelecionados] = useState<string[]>([])
    const [horario, setHorario] = useState<string>("")
    const [data, setData] = useState<string>("")

    async function listarUsuarioEmAgendamento() {
        const listaUsuario = await listarUsuarios();
        setUsuarios(listaUsuario.data);
    }

    async function listarPetEmAgendamento() {
        const listaPet = await listarPets();
        setPets(listaPet);
    }

    async function listarServicoEmAgendamento() {
        const listaServico = await listarServicos();
        setServicos(listaServico);
    }

    async function salvarAgendamento(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const dados = {
                petID: petSelecionado,
                funcionarioID: usuarioSelecionado,
                dataAgendamento: data,
                horaAgendamento: horario,
                servicosIds: servicoSelecionados
            }

            console.log(JSON.stringify(dados));

            await cadastrarAgendamento(dados);
            alert("Agendamento cadastrado com sucesso");
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect(() => {
        listarPetEmAgendamento();
        listarServicoEmAgendamento();
        listarUsuarioEmAgendamento();
    }, [])
    console.log(usuarioSelecionado);
    console.log(servicoSelecionados);
    console.log(petSelecionado);
    console.log(horario);
    console.log(data);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <form className={styles.form} onSubmit={salvarAgendamento}>
                    <label htmlFor="">Tutor</label>
                    <select
                        value={usuarioSelecionado}
                        onChange={(e) => setUsuarioSelecionado(e.target.value)}
                    >
                        {usuarios.map((item) => (
                            <option value={item.usuarioID} key={item.usuarioID}>{item.nome}</option>
                        ))}
                    </select>

                    <label htmlFor="">Pet</label>
                    <select
                        value={petSelecionado}
                        onChange={(e) => setPetSelecionado(e.target.value)}
                    >
                        {pets.map((item) => (
                            <option value={item.petID} key={item.petID}>{item.nome}</option>
                        ))}
                    </select>

                    <label htmlFor="">Hora</label>
                    <input type="text" value={horario} onChange={(e) => setHorario(e.target.value)} />

                    <label htmlFor="">Data</label>
                    <input type="text" value={data} onChange={(e) => setData(e.target.value)} />

                    <label htmlFor="">Servico</label>
                    <select
                        multiple
                        value={servicoSelecionados}
                        onChange={(e) => setServicoSelecionados(
                            Array.from(e.target.selectedOptions).map((option) => String(option.value))
                        )}
                    >
                        {servicos.map((item) => (
                            <option value={item.servicoID} key={item.servicoID}>{item.nomeServico}</option>
                        ))}
                    </select>

                    <button type="submit">Salvar</button>

                </form>
            </main>
            <Lista page="listaAgendamento" />
        </>
    )
}

export default ListaAgendamento;