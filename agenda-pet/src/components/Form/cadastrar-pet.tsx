import { useState, FocusEvent, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import FormInput from "./FormInput";
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
            window.dispatchEvent(new Event("pet-cadastrado"));
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect(() => {
        listarTipoAnimalEmPet();
        listarRacaEmPet();
        listarPorteEmPet();
        listarComportamentoEmPet();
        listarUsuariosEmPet();
    }, [])

    return (
        <>
            <div className=" !max-w-[800px] w-4/5 !p-4 !m-6 bg-[#E5D7BB] rounded-3xl  flex flex-col shadow-[inset_4px_4px_15px_0px_rgba(0,0,0,0.4)] justify-center items-center ">
                <h2 className="text-4xl text-start font-semibold !mb-8 text-[#163923]"> Cadastrar:</h2>
                <form onSubmit={salvarPet} className="w-4/5 !p-9 flex flex-col gap-6 items-center">
                    <div className="w-full flex items-start">
                        <div className="flex-1 !mr-[16px]">
                            <FormSelect
                                label="Tutor:"
                                value={usuarioSelecionado}
                                onValueChange={setUsuarioSelecionado}
                                placeholder=""
                                opcoes={usuarios?.map((u) => ({
                                    valor: String(u.usuarioID),
                                    rotulo: u.nome,
                                }))}
                            />
                        </div>

                        <div className="flex-1 !mr-[16px]">
                            <FormInput
                                label="Nome do Pet:"
                                type="text"
                                value={nomePet}
                                onChange={(e) => setNomePet(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        <div className="flex-1">
                            <FormSelect
                                label="Comportamento:"
                                value={comportamentoSelecionado}
                                onValueChange={setComportamentoSelecionado}
                                placeholder=""
                                opcoes={comportamentos?.map((c) => ({
                                    valor: String(c.comportamentoID),
                                    rotulo: c.nomeComportamento,
                                }))}
                            />
                        </div>
                    </div>

                    {/* SEGUNDA LINHA: Porte, Tipo do Animal, Raça */}
                    <div className="w-full flex items-start">
                        <div className="flex-1 !mr-[16px]">
                            <FormSelect
                                label="Porte:"
                                value={porteSelecionado}
                                onValueChange={setPorteSelecionado}
                                placeholder=""
                                opcoes={portes?.map((p) => ({
                                    valor: String(p.porteID),
                                    rotulo: p.nomePorte,
                                }))}
                            />
                        </div>

                        <div className="flex-1 !mr-[16px]">
                            <FormSelect
                                label="Tipo do Animal:"
                                value={tipoAnimalSelecionado}
                                onValueChange={setTipoAnimalSelecionado}
                                placeholder=""
                                opcoes={tiposAnimal?.map((ta) => ({
                                    valor: String(ta.tipoAnimalID),
                                    rotulo: ta.nomeTipo,
                                }))}
                            />
                        </div>

                        <div className="flex-1">
                            <FormSelect
                                label="Raça:"
                                value={racaSelecionado}
                                onValueChange={setRacaSelecionado}
                                placeholder=""
                                opcoes={racas?.map((ra) => ({
                                    valor: String(ra.racaID),
                                    rotulo: ra.nomeRaca,
                                }))}
                            />
                        </div>
                    </div>

                    {/* BOTÃO DE SALVAR */}
                    <div className="w-1/3 mt-2">
                        <Button
                            type="submit"
                            className="w-full h-[58px] bg-[#163923] text-[#FFA800] hover:bg-[#1f4d30] rounded-2xl shadow-md font-medium text-lg transition-colors"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastrarPet;