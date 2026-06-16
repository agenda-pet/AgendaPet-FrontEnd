import Header from "@/components/header/header";
import Lista from "@/components/lista/lista";
import styles from "@/pages/pets/pets.module.css";
import { useEffect, useState } from "react";
import { listarComportamento } from "../api/comportamentoService";
import { listarTipoAnimal } from "../api/tipoAnimalService";
import { listarRaca } from "../api/racaService";
import { listarPorte } from "../api/porteService";
import { listarUsuarios } from "../api/usuarioService";
import { cadastrarPets } from "../api/petService";

interface Comportamento {
    comportamentoID: string;
    nomeComportamento: string;
}

interface Porte {
    porteID: string;
    nomePorte: string;
}

interface Raca {
    racaID: string;
    nomeRaca: string;
}

interface TipoAnimal {
    tipoAnimalID: string;
    nomeTipo: string;
}

interface Usuario {
    usuarioID: string;
    nome: string;
}


const ListaPets = () => {

    const [nomePet, setNomePet] = useState<string>("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>("");
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [tipoAnimalSelecionado, setTipoAnimalSelecionado] = useState<string>("");
    const [tiposAnimal, setTiposAnimal] = useState<TipoAnimal[]>([]);
    const [racaSelecionado, setRacaSelecionado] = useState<string>("");
    const [racas, setRacas] = useState<Raca[]>([]);
    const [porteSelecionado, setPorteSelecionado] = useState<string>("");
    const [portes, setPortes] = useState<Porte[]>([]);
    const [comportamentoSelecionado, setComportamentoSelecionado] = useState<string>("");
    const [comportamentos, setComportamentos] = useState<Comportamento[]>([]);


    async function listarTipoAnimalEmPet() {
        const listaTipoAnimal = await listarTipoAnimal();
        setTiposAnimal(listaTipoAnimal);
    }

    async function listarRacaEmPet() {
        const listaRaca = await listarRaca();
        console.log(listaRaca);
        setRacas(listaRaca);
    }

    async function listarPorteEmPet() {
        const listaPorte = await listarPorte();
        console.log(listaPorte);
        setPortes(listaPorte);
    }

    async function listarComportamentoEmPet() {
        const listaComportamento = await listarComportamento();
        console.log(listaComportamento);
        setComportamentos(listaComportamento);
    }

    async function listarUsuariosEmPet () {
        const listaUsuario = await listarUsuarios();
        console.log(listaUsuario);
        setUsuarios(listaUsuario);
    }

    async function salvarPet(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const dados = {
                nome: nomePet,
                tipoAnimalID: tipoAnimalSelecionado,
                comportamentoID: comportamentoSelecionado,
                racaID: racaSelecionado,
                porteID: porteSelecionado,
                usuarioID: usuarioSelecionado
            }

            await cadastrarPets(dados);
            alert("Pet cadastrado com sucesso");
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect (() => {
        listarTipoAnimalEmPet();
        listarRacaEmPet();
        listarPorteEmPet();
        listarComportamentoEmPet();
        listarUsuariosEmPet();
    }, [])


    return (
        <>
            <Header />
            <main className={styles.main}>
                <form action="" id={styles.form} onSubmit={salvarPet}>

                    <label htmlFor="Dono">Tutor</label>
                    <select
                        value={usuarioSelecionado}
                        onChange={(e) => setUsuarioSelecionado(e.target.value)}
                    >
                        {usuarios?.map((item) => (
                            <option value={item.usuarioID} key={item.usuarioID}>{item.nome}</option>
                        ))}
                    </select>

                    <label htmlFor="Nome">Nome do Pet</label>
                    <input type="text" value={nomePet} onChange={(e) => setNomePet(e.target.value)} />

                    <label htmlFor="">Comportamento</label>
                    <select
                        value={comportamentoSelecionado}
                        onChange={(e) => setComportamentoSelecionado(e.target.value)}
                    >
                        {comportamentos?.map((item) => (
                            <option value={item.comportamentoID} key={item.comportamentoID}>{item.nomeComportamento}</option>
                        ))}

                    </select>

                    <label htmlFor="">porte</label>
                    <select 
                        value={porteSelecionado}
                        onChange={(e) => setPorteSelecionado(e.target.value)}
                    >
                        {portes?.map((item) => (
                            <option value={item.porteID} key={item.porteID}>{item.nomePorte}</option>
                        ))}
                    </select>

                    <label htmlFor="">Tipo Animal</label>
                    <select
                        value={tipoAnimalSelecionado}
                        onChange={(e) => setTipoAnimalSelecionado(e.target.value)}
                    >
                        {tiposAnimal?.map((item) => (
                            <option value={item.tipoAnimalID} key={item.tipoAnimalID}>{item.nomeTipo}</option>
                        ))}
                    </select>

                    <label htmlFor="">Raça</label>
                    <select 
                        value={racaSelecionado}
                        onChange={(e) => setRacaSelecionado(e.target.value)}
                    >
                        {racas?.map((item) => (
                            <option value={item.racaID} key={item.racaID}>{item.nomeRaca}</option>
                        ))}
                    </select>

                    <button type="submit">Salvar</button>

                </form>
            </main>
            <Lista page="listaPets" />
        </>
    )
}

export default ListaPets;