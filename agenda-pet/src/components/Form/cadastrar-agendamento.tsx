import React, { useState, FocusEvent } from "react";
import { Clock, ChevronDown, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import InputData from "./inputData";

interface UsuarioTutor {
    usuarioId: string;
    nome: string;
}

interface Pet {
    petId: string;
    nome: string;
    usuarioId: string;
}

interface Servico {
    id: string;
    nome: string;
}

const listaHorarios = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const listaServicosDisponiveis: Servico[] = [
    { id: "banho", nome: "Banho" },
    { id: "unha", nome: "Corte de unha" },
    { id: "tosa", nome: "Tosa" },
    { id: "ouvido", nome: "Limpeza de ouvido" },
];

const CadastroAgendamento = () => {
    const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
    const [nomeTutor, setNomeTutor] = useState("");
    const [tutorEncontrado, setTutorEncontrado] = useState<UsuarioTutor | null>(null);
    const [erroTutor, setErroTutor] = useState(false);
    const [buscandoTutor, setBuscandoTutor] = useState(false);

    const [listaPets, setListaPets] = useState<Pet[]>([]);
    const [petSelecionado, setPetSelecionado] = useState("");
    const [buscandoPets, setBuscandoPets] = useState(false);

    const [hora, setHora] = useState("");
    const [dataAgendamento, setDataAgendamento] = useState<Date | undefined>(undefined);

    const handleVerificarTutor = async (e: FocusEvent<HTMLInputElement>) => {
        const nomeDigitado = e.target.value.trim();

        if (!nomeDigitado) {
            resetarEstados();
            return;
        }

        setBuscandoTutor(true);
        setErroTutor(false);

        try {
            const tutoresNoBancoMock: UsuarioTutor[] = [
                { usuarioId: "guid-allan-123", nome: "Allan" },
                { usuarioId: "guid-luany-456", nome: "Luany" },
            ];

            const achouTutor = tutoresNoBancoMock.find(
                (t) => t.nome.toLowerCase() === nomeDigitado.toLowerCase()
            );

            if (achouTutor) {
                setTutorEncontrado(achouTutor);
                await buscarPetsDoTutor(achouTutor.usuarioId);
            } else {
                setTutorEncontrado(null);
                setErroTutor(true);
                setListaPets([]);
                setPetSelecionado("");
            }
        } catch (error) {
            console.error("Erro ao validar tutor", error);
        } finally {
            setBuscandoTutor(false);
        }
    };

    const buscarPetsDoTutor = async (usuarioId: string) => {
        setBuscandoPets(true);
        try {
            const petsNoBancoMock: Pet[] = [
                { petId: "pet-1", nome: "Belinha", usuarioId: "guid-allan-123" },
                { petId: "pet-2", nome: "Pingu", usuarioId: "guid-allan-123" },
                { petId: "pet-3", nome: "Maju", usuarioId: "guid-luany-456" },
            ];

            const petsFiltrados = petsNoBancoMock.filter((p) => p.usuarioId === usuarioId);
            setListaPets(petsFiltrados);

            if (petsFiltrados.length > 0) {
                setPetSelecionado(petsFiltrados[0].petId);
            } else {
                setPetSelecionado("");
            }
        } catch (error) {
            console.error("Erro ao buscar pets", error);
        } finally {
            setBuscandoPets(false);
        }
    };

    const resetarEstados = () => {
        setTutorEncontrado(null);
        setErroTutor(false);
        setListaPets([]);
        setPetSelecionado("");
    };

    const handleMudarSelecao = (id: string) => {
        setServicosSelecionados((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const obterTextoBotao = () => {
        if (servicosSelecionados.length === 0) return "Selecione os serviços...";
        return servicosSelecionados
            .map((id) => listaServicosDisponiveis.find((s) => s.id === id)?.nome)
            .join(", ");
    };

    return (
        <>
        <div className="w-4/5 h-4/5 bg-[#E5D7BB] rounded-3xl  flex flex-col justify-center items-center ">
            {/* <h2 className="">{telaEditar? "Editar:" : Cadastrar:}</h2> */}
            <form action="" className="w-4/5 h-1/2 flex flex-col items-center justify-between">
                <div className="w-full h-1/2 flex items-center ">
                    <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                        <label htmlFor="" className="mb-1">Tutor:</label>
                        <div className="relative h-4/5">
                            <Input
                                type="text"
                                value={nomeTutor}
                                onChange={(e) => setNomeTutor(e.target.value)}
                                onBlur={handleVerificarTutor}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                                style={{
                                    borderStyle: "solid",
                                    borderWidth: erroTutor || tutorEncontrado ? "4px" : "2px",
                                    borderColor: erroTutor ? "#ef4444" : tutorEncontrado ? "#16a34a" : "#FFA800",
                                }}
                            />
                            {buscandoTutor && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-amber-600" />
                            )}
                        </div>
                    </div>

                    {/* Componente de Pets Reutilizável */}
                    <div className="flex-1 h-3/4 mr-[16px]">
                        <FormSelect
                            label="Pets:"
                            value={petSelecionado}
                            onValueChange={setPetSelecionado}
                            disabled={listaPets.length === 0 || buscandoPets}
                            placeholder={
                                buscandoPets ? (
                                    <span className="flex items-center gap-2 text-zinc-500">
                                        <Loader2 className="h-4 w-4 animate-spin text-amber-600" /> Carregando pets...
                                    </span>
                                ) : (
                                    "Aguardando tutor..."
                                )
                            }
                            opcoes={listaPets.map((p) => ({ valor: p.petId, rotulo: p.nome }))}
                        />
                    </div>
                    {/* Componente de Hora Reutilizável */}
                    <div className="flex-1 h-3/4">
                        <FormSelect
                            label="Hora:"
                            value={hora}
                            onValueChange={setHora}
                            placeholder=""
                            opcoes={listaHorarios.map((h) => ({ valor: h, rotulo: h }))}
                        />
                    </div>
                </div>

                <div className="w-4/5 h-1/2 flex items-end">
                    <div className="flex flex-row items-end mr-[16px] w-full h-full flex-wrap">
                        <InputData value={dataAgendamento} onChange={setDataAgendamento} />
                    </div>

                    <div className="flex flex-col gap-1.5 w-full max-w-xs">
                        <label className="text-sm font-medium text-zinc-800 font-sans">
                            Serviços:
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full h-[58] justify-between p-[16] bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border-2 border-[#FFA800] rounded-xl px-4 shadow-sm font-normal text-left transition-colors data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                                >
                                    <span className="truncate">{obterTextoBotao()}</span>
                                    <ChevronDown className="h-4 w-4 p-[16] text-amber-600 opacity-80 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-64 bg-[#f8f4e8] border border-amber-500/30 rounded-xl shadow-lg"
                                align="start"
                            >
                                {listaServicosDisponiveis.map((servico) => {
                                    const estaSelecionado = servicosSelecionados.includes(servico.id);
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={servico.id}
                                            checked={estaSelecionado}
                                            onCheckedChange={() => handleMudarSelecao(servico.id)}
                                            className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-zinc-800 cursor-pointer transition-colors focus:bg-[#e7dec3] focus:text-zinc-900 data-[state=checked]:font-medium"
                                        >
                                            <span>{servico.nome}</span>
                                            <div
                                                className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${estaSelecionado ? "bg-[#1b3d2f] border-[#1b3d2f] text-white" : "border-zinc-400 bg-white"
                                                    }`}
                                            >
                                                {estaSelecionado && <Check className="h-3 w-3 stroke-[3]" />}
                                            </div>
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="w-1/3 mt-[16px]">
                    <Button className="w-full h-[58px] bg-[#163923] text-[#FFA800] rounded-2xl shadow-md mt-4"
                    >Salvar</Button>
                </div>
            </form>
        </div>
    </>
    );
};

export default CadastroAgendamento;