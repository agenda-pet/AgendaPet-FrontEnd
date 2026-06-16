import React, { useState, FocusEvent } from "react";
import { Clock, ChevronDown, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type SelecaoHoraProps = {
  onHoraSelecionada?: (hora: string) => void;
};


type CadastroProps = {
  page?: string;
};

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

const Cadastro = ({ page }: CadastroProps) => {


  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);

  const [nomeTutor, setNomeTutor] = useState("");
  const [tutorEncontrado, setTutorEncontrado] = useState<UsuarioTutor | null>(null);
  const [erroTutor, setErroTutor] = useState(false);
  const [buscandoTutor, setBuscandoTutor] = useState(false);

  const [listaPets, setListaPets] = useState<Pet[]>([]);
  const [petSelecionado, setPetSelecionado] = useState("");
  const [buscandoPets, setBuscandoPets] = useState(false);

  const [hora, setHora] = useState("");

  const handleVerificarTutor = async (e: FocusEvent<HTMLInputElement>) => {
    const nomeDigitado = e.target.value.trim();

    if (!nomeDigitado) {
      resetarEstados();
      return;
    }

    setBuscandoTutor(true);
    setErroTutor(false);

    try {
      // Simulando chamada na sua API de Usuários/Tutores:
      // const res = await fetch(`/api/tutores?nome=${nomeDigitado}`);
      // const tutor = await res.json();

      // MOCK simulando consulta no banco de dados
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
      // Simulando chamada na sua API filtrando por GUID FK:
      // const res = await fetch(`/api/pets?usuarioId=${usuarioId}`);
      // const pets = await res.json();

      // MOCK populando baseado no relacionamento do seu banco
      const petsNoBancoMock: Pet[] = [
        { petId: "pet-1", nome: "Belinha", usuarioId: "guid-allan-123" },
        { petId: "pet-2", nome: "Pingu", usuarioId: "guid-allan-123" },
        { petId: "pet-3", nome: "Maju", usuarioId: "guid-luany-456" },
      ];

      const petsFiltrados = petsNoBancoMock.filter((p) => p.usuarioId === usuarioId);
      setListaPets(petsFiltrados);

      // Se o tutor tiver pets, pré-seleciona o primeiro automaticamente para poupar cliques
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
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  const obterTextoBotao = () => {
    if (servicosSelecionados.length === 0) return "Selecione os serviços...";

    return servicosSelecionados
      .map((id) => listaServicosDisponiveis.find((s) => s.id === id)?.nome)
      .join(", ");
  };

  const handleMudarHora = (valor: string) => {
    setHora(valor);
  };


  return (
    <form action="">
      <div>
        <div>
          <label htmlFor="">
            Tutor:
          </label>
          <div className="relative">
            <Input
              type="text"
              value={nomeTutor}
              onChange={(e) => setNomeTutor(e.target.value)}
              onBlur={handleVerificarTutor}
              placeholder="Digite o nome do tutor"

              className="w-full bg-[#f1ebd9] text-zinc-900 rounded-xl h-11 px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
              // 2. Controlamos a cor e a largura da borda diretamente aqui de forma 100% segura
              style={{
                borderStyle: "solid",
                borderWidth: erroTutor || tutorEncontrado ? "2px" : "1px",
                borderColor: erroTutor
                  ? "#ef4444" // Vermelho do Tailwind (border-red-500)
                  : tutorEncontrado
                    ? "#16a34a" // Verde do Tailwind (border-green-600)
                    : "rgba(245, 158, 11, 0.4)", // O seu Âmbar suave do Figma (border-amber-500/40)
              }}
            />
            {buscandoTutor && (
              <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-amber-600" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full max-w-xs">
          <label className="text-sm font-medium text-zinc-800">
            Pets:
          </label>

          <Select
            value={petSelecionado}
            onValueChange={setPetSelecionado}
            disabled={listaPets.length === 0 || buscandoPets}
          >
            <SelectTrigger
              className="w-full justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border border-amber-500/40 rounded-xl h-11 px-4 shadow-sm font-normal text-left transition-colors data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
            >
              {buscandoPets ? (
                <span className="flex items-center gap-2 text-zinc-500">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-600" /> Carregando pets...
                </span>
              ) : (
                <SelectValue placeholder="Aguardando tutor..." />
              )}
            </SelectTrigger>

            <SelectContent className="bg-[#f8f4e8] border border-amber-500/30 rounded-xl shadow-lg">
              {listaPets.map((pet) => (
                <SelectItem
                  key={pet.petId}
                  value={pet.petId}
                  className="cursor-pointer hover:bg-[#e7dec3] rounded-lg text-zinc-800 focus:bg-[#e7dec3] focus:text-zinc-900"
                >
                  {pet.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 w-full max-w-xs">
          <label className="text-sm font-medium text-zinc-800 font-sans">
            Hora:
          </label>

          <Select value={hora} onValueChange={handleMudarHora}>
            <SelectTrigger
              className="w-full justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border border-amber-500/40 rounded-xl h-11 px-4 shadow-sm font-normal text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600 opacity-80 shrink-0" />
                <SelectValue placeholder="Escolha o horário..." />
              </span>
            </SelectTrigger>

            <SelectContent className="bg-[#f8f4e8] border border-amber-500/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {listaHorarios.map((horario) => (
                <SelectItem
                  key={horario}
                  value={horario}
                  className="cursor-pointer hover:bg-[#e7dec3] rounded-lg text-zinc-800 focus:bg-[#e7dec3] focus:text-zinc-900"
                >
                  {horario}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-full max-w-xs">
        <label className="text-sm font-medium text-zinc-800 font-sans">
          Serviços:
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border border-amber-500/40 rounded-xl h-11 px-4 shadow-sm font-normal text-left transition-colors"
            >
              <span className="truncate">{obterTextoBotao()}</span>
              <ChevronDown className="h-4 w-4 text-amber-600 opacity-80 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-[#f8f4e8] border border-amber-500/30 rounded-xl p-1 shadow-lg"
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
                    className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${estaSelecionado
                      ? "bg-[#1b3d2f] border-[#1b3d2f] text-white"
                      : "border-zinc-400 bg-white"
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
    </form>
  );
};

export default Cadastro;