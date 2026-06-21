import React, { useState, FocusEvent, useEffect } from "react";
import { Clock, ChevronDown, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { listarUsuarios } from "@/pages/api/usuarioService";
import { ListarPetsPorTutor } from "@/pages/api/petService";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import InputData from "./inputData";
import FormInput from "./FormInput";
import { listarServicos } from "@/pages/api/servicoService";
import { cadastrarAgendamento } from "@/pages/api/agendamentoService";

interface Usuario {
    usuarioID: string;
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
    "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00",
    "11:00:00", "11:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00",
    "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"
];

const listaServicosDisponiveis: Servico[] = [
    { id: "banho", nome: "Banho" },
    { id: "unha", nome: "Corte de unha" },
    { id: "tosa", nome: "Tosa" },
    { id: "ouvido", nome: "Limpeza de ouvido" },
];

const CadastroAgendamento = () => {
    // Listas vindas do banco
    const [listaTutores, setListaTutores] = useState<any[]>([]);
    const [listaPets, setListaPets] = useState<any[]>([]);
    const [listaServicos, setListaServicos] = useState<any[]>([]);

    // Valores selecionados no formulário
    const [tutorSelecionado, setTutorSelecionado] = useState<string>("");
    const [petSelecionado, setPetSelecionado] = useState<string>("");
    const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);

    const [hora, setHora] = useState<string>("");
    const [dataAgendamento, setDataAgendamento] = useState<Date | undefined>(undefined);

    // Estados de carregamento/erro
    const [buscandoTutores, setBuscandoTutores] = useState<boolean>(false);
    const [buscandoPets, setBuscandoPets] = useState<boolean>(false);
    const [buscandoServicos, setBuscandoServicos] = useState<boolean>(false);

    const handleMudarSelecao = (id: string) => {
        setServicosSelecionados((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tutorSelecionado || !petSelecionado || !hora || !dataAgendamento || servicosSelecionados.length === 0) {
        alert("Por favor, preencha todos os campos e selecione ao menos um serviço.");
        return;
    }

    try {

        const dataFormatada = dataAgendamento.toISOString().split('T')[0];

        const payload = {
            dataAgendamento: dataFormatada,
            horaAgendamento: hora,
            statusAgendamentoID: "a92942d7-8db0-4cf0-9923-fd5161999805", 
            petID: petSelecionado,
            servicosIds: servicosSelecionados
        };

        console.log("Enviando dados para o C#:", payload);

        await cadastrarAgendamento(payload);
        alert("Agendamento cadastrado com sucesso!");
        

        setTutorSelecionado("");
        setListaPets([]);
        setPetSelecionado("");
        setHora("");
        setDataAgendamento(undefined);
        setServicosSelecionados([]);

    } catch (error: any) {
        alert(`Falha ao salvar agendamento: ${error.message}`);
    }
};

   const obterTextoBotao = () => {
    if (buscandoServicos) return "Carregando serviços...";
    
    if (!servicosSelecionados || servicosSelecionados.length === 0) {
        return "";
    }
    
    const servicosEncontrados = listaServicos.filter((s) => {

        const atualId = String(s.servicoID || s.ServicoID || s.id || "");
        return servicosSelecionados.includes(atualId);
    });

    if (servicosEncontrados.length === 0) {
        return "";
    }
    return servicosEncontrados
        .map((s) => s.nomeServico || s.Nome || s.nome || "Sem nome")
        .join(", ");
};

    async function carregarServicosDoBanco() {
        setBuscandoServicos(true);
        try {
            const respostaAPI = await listarServicos();

            // Trata o retorno do Axios ou array direto
            const dadosTratados = Array.isArray(respostaAPI)
                ? respostaAPI
                : (respostaAPI?.data || []);

            setListaServicos(dadosTratados);
        } catch (error) {
            console.error("Erro ao buscar serviços do banco:", error);
        } finally {
            setBuscandoServicos(false);
        }
    }

    async function carregarTutoresIniciais() {
        setBuscandoTutores(true);
        try {
            const dadosTutores = await listarUsuarios();
            // Garante que seja um array (ajuste conforme o retorno da sua API: dadosTutores ou dadosTutores.data)
            setListaTutores(Array.isArray(dadosTutores) ? dadosTutores : dadosTutores.data || []);
        } catch (error) {
            console.error("Erro ao carregar tutores:", error);
        } finally {
            setBuscandoTutores(false);
        }
    }

    useEffect(() => {
        carregarTutoresIniciais();
        carregarServicosDoBanco();
    }, []);

    // 2. Monitora quando o tutor muda para buscar os pets dele de forma automática
    useEffect(() => {
        if (!tutorSelecionado) {
            setListaPets([]);
            setPetSelecionado("");
            return;
        }

        async function buscarPetsDoTutor() {
            setBuscandoPets(true);
            try {
                const dadosPets = await ListarPetsPorTutor(tutorSelecionado);
                const petsFiltrados = Array.isArray(dadosPets) ? dadosPets : [];
                setListaPets(petsFiltrados);

                // Auto-seleciona o primeiro pet se houver, usando a chave correta do banco (PetID)
                if (petsFiltrados.length > 0) {
                    setPetSelecionado(String(petsFiltrados[0].PetID || petsFiltrados[0].petId));
                } else {
                    setPetSelecionado("");
                }
            } catch (error) {
                console.error("Erro ao buscar pets:", error);
                setListaPets([]);
                setPetSelecionado("");
            } finally {
                setBuscandoPets(false);
            }
        }

        buscarPetsDoTutor();
    }, [tutorSelecionado]);
    return (
        <>
            <div className="w-4/5 h-4/5 bg-[#E5D7BB] rounded-3xl  flex flex-col justify-center items-center !p-8 shadow-[inset_4px_4px_15px_0px_rgba(0,0,0,0.4)]">
                <h2 className="text-4xl text-start !mb-8 text-[#163923]"> Cadastrar:</h2>
                <form onSubmit={handleSalvar} className="w-4/5 h-1/2 flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 flex items-center ">
                        <div className="flex-1 h-3/4 !mr-[16px]">
                            <FormSelect
                                label="Tutor:"
                                value={tutorSelecionado}
                                onValueChange={setTutorSelecionado}
                                placeholder={buscandoTutores ? "Carregando tutores..." : ""}
                                opcoes={listaTutores.map((t) => ({
                                    valor: String(t.UsuarioID || t.usuarioID || t.id),
                                    rotulo: t.Nome || t.nome
                                }))}
                            />
                        </div>

                        {/* Componente de Pets Reutilizável */}
                        <div className="flex-1 h-3/4 !mr-[16px]">
                            <FormSelect
                                label="Pets:"
                                value={petSelecionado}
                                onValueChange={setPetSelecionado}
                                disabled={!tutorSelecionado || listaPets.length === 0 || buscandoPets}
                                placeholder={
                                    buscandoPets ? (
                                        "Carregando pets..."
                                    ) : !tutorSelecionado ? (
                                        ""
                                    ) : listaPets.length === 0 ? (
                                        "Nenhum pet cadastrado"
                                    ) : (
                                        "Selecione o pet"
                                    )
                                }
                                opcoes={listaPets.map((p) => ({
                                    valor: String(p.PetID || p.petID || p.id),
                                    rotulo: p.Nome || p.nome
                                }))}
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
                        <div className="flex flex-row items-end !mr-[16px] w-full h-full flex-wrap">
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
                                        disabled={buscandoServicos}
                                        className="w-full h-[58px] justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border-2 !border-[#FFA800] rounded-xl !px-4 shadow-sm font-normal text-left transition-colors data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                                    >
                                        <span className="truncate">{obterTextoBotao()}</span>
                                        <ChevronDown className="h-4 w-4 opacity-80 shrink-0" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-64 bg-[#e7dec3] border border-amber-500/30 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                                    align="start"
                                >
                                    {listaServicos.map((servico: any) => {
                                        const servicoId = String(servico.servicoID || servico.ServicoID || servico.id || "");
                                        const servicoNome = String(servico.nomeServico || servico.Nome || servico.nome || "Sem nome");

                                        const estaSelecionado = servicosSelecionados.includes(servicoId);

                                        return (
                                            <DropdownMenuItem
                                                key={servicoId}
                                                onClick={() => handleMudarSelecao(servicoId)}
                                                className="flex items-center justify-between px-3 py-2 text-sm rounded-lg text-zinc-800 cursor-pointer transition-colors focus:bg-[#e7dec3] focus:text-zinc-900 data-[state=checked]:font-medium"
                                            >
                                                <span>{servicoNome}</span>
                                                <div
                                                    className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${estaSelecionado ? "bg-[#1b3d2f] border-[#1b3d2f] text-white" : "border-zinc-400 bg-white"
                                                        }`}
                                                >
                                                    {estaSelecionado && <Check className="h-3 w-3 stroke-[3]" />}
                                                </div>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="w-1/3 !mt-[16px]">
                        <Button onClick={handleSalvar} className="w-full h-[58px] bg-[#163923] text-[#FFA800] rounded-2xl shadow-md mt-4"
                        >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastroAgendamento;