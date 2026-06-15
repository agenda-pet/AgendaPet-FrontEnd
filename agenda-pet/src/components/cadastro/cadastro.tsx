import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Definição da Props do Componente
type CadastroProps = {
  page?: string;
};

// 1. Definição da estrutura do Serviço
interface Servico {
  id: string;
  nome: string;
}

// Lista de serviços disponíveis para o mock
const listaServicosDisponiveis: Servico[] = [
  { id: "banho", nome: "Banho" },
  { id: "unha", nome: "Corte de unha" },
  { id: "tosa", nome: "Tosa" },
  { id: "ouvido", nome: "Limpeza de ouvido" },
];

const Cadastro = ({ page }: CadastroProps) => {
  // Estado que guarda os IDs dos serviços selecionados
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);

  // Função para ligar/desligar a seleção de um serviço
  const handleMudarSelecao = (id: string) => {
    setServicosSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Se já tinha, remove
        : [...prev, id]                      // Se não tinha, adiciona
    );
  };

  // Texto que vai aparecer no botão baseado no que foi selecionado
  const obterTextoBotao = () => {
    if (servicosSelecionados.length === 0) return "Selecione os serviços...";

    return servicosSelecionados
      .map((id) => listaServicosDisponiveis.find((s) => s.id === id)?.nome)
      .join(", ");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs">
      {/* Label customizada com base no Figma */}
      <label className="text-sm font-medium text-zinc-800 font-sans">
        Serviços: {page && <span className="text-xs text-zinc-400">({page})</span>}
      </label>

      <DropdownMenu>
        {/* O Gatilho (O botão principal) */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-[#f1ebd9] hover:bg-[#e7dec3] text-zinc-900 border border-amber-500/40 rounded-xl h-11 px-4 shadow-sm font-normal text-left transition-colors"
          >
            <span className="truncate">{obterTextoBotao()}</span>
            <ChevronDown className="h-4 w-4 text-amber-600 opacity-80 shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        {/* O Menu Flutuante */}
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

                {/* Caixa visual do Checkbox */}
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${
                    estaSelecionado
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
  );
};

export default Cadastro;