import { useState, FocusEvent, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import { listarTipoAnimal } from "@/pages/api/tipoAnimalService";
import { listarRaca } from "@/pages/api/racaService";
import { listarPorte } from "@/pages/api/porteService";
import { listarComportamento } from "@/pages/api/comportamentoService";
import { listarUsuarios } from "@/pages/api/usuarioService";
import { cadastrarPets } from "@/pages/api/petService";

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

const CadastrarPet = () => {
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

    async function listarUsuariosEmPet() {
        const listaUsuario = await listarUsuarios();
        console.log(listaUsuario);
        setUsuarios(listaUsuario.data);
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
            <div className="w-4/5 h-4/5 bg-[#E5D7BB] rounded-3xl  flex flex-col justify-center items-center ">
                {/* <h2 className="">{telaEditar? "Editar:" : Cadastrar:}</h2> */}
                <form onSubmit={salvarPet} className="w-4/5 h-1/2 flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 flex items-center ">
                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <div className="relative h-4/5">
                                <FormSelect
                                label="Tutor:"
                                value={usuarioSelecionado}
                                onValueChange={setUsuarioSelecionado}
                                placeholder=""
                                opcoes={usuarios?.map((u) => ({
                                    valor: String(u.usuarioID), // O ID vira o valor (garantindo que seja string)
                                    rotulo: u.nome,             // O nome vira o rótulo visível
                                }))} />
                            </div>
                        </div>

                        {/* Componente de Pets Reutilizável */}
                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label htmlFor="" className="mb-1">Nome do Pet:</label>
                            <div className="relative h-4/5">
                                <Input
                                    type="text"
                                    value={nomePet}
                                    onChange={(e) => setNomePet(e.target.value)}
                                    placeholder=""
                                    className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                                />
                            </div>
                        </div>
                        {/* Componente de Hora Reutilizável */}
                        <div className="flex-1 h-3/4">
                            <FormSelect
                                label="Comportamento:"
                                value={comportamentoSelecionado}
                                onValueChange={setComportamentoSelecionado}
                                placeholder=""
                                opcoes={comportamentos?.map((c) => ({
                                    valor: String(c.comportamentoID), // O ID vira o valor (garantindo que seja string)
                                    rotulo: c.nomeComportamento,             // O nome vira o rótulo visível
                                }))} />

                        </div>
                    </div>

                    <div className="w-4/5 h-1/2 flex items-end ">
                        <div className="flex-1 h-3/4 mr-[16]">
                            <FormSelect
                                label="Porte:"
                                value={porteSelecionado}
                                onValueChange={setPorteSelecionado}
                                placeholder=""
                                opcoes={portes?.map((p) => ({
                                    valor: String(p.porteID), // O ID vira o valor (garantindo que seja string)
                                    rotulo: p.nomePorte,             // O nome vira o rótulo visível
                                }))} />
                        </div>

                        <div className="flex-1 h-3/4 mr-[16]">
                            <FormSelect
                                label="Tipo do Animal:"
                                value={tipoAnimalSelecionado}
                                onValueChange={setTipoAnimalSelecionado}
                                placeholder=""
                                opcoes={tiposAnimal?.map((ta) => ({
                                    valor: String(ta.tipoAnimalID), // O ID vira o valor (garantindo que seja string)
                                    rotulo: ta.nomeTipo,             // O nome vira o rótulo visível
                                }))} />
                        </div>

                        <div className="flex-1 h-3/4">
                            <FormSelect
                                label="Raça:"
                                value={racaSelecionado}
                                onValueChange={setRacaSelecionado}
                                placeholder=""
                                opcoes={racas?.map((ra) => ({
                                    valor: String(ra.racaID), // O ID vira o valor (garantindo que seja string)
                                    rotulo: ra.nomeRaca,             // O nome vira o rótulo visível
                                }))} />
                        </div>
                    </div>
                    <div className="w-1/3 mt-[16px]">
                        <Button type="submit" className="w-full h-[58px] bg-[#163923] text-[#FFA800] rounded-2xl shadow-md mt-4"
                        >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastrarPet;