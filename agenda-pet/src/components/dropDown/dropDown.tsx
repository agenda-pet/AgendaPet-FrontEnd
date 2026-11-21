import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExibicaoServicosDropdownProps {
    servicosString: string; 
}

export function ServicosDropdown({ servicosString }: ExibicaoServicosDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Quebra a string por vírgulas para gerar a lista
    const listaServicos = servicosString
        ? servicosString.split(",").map(s => s.trim()).filter(Boolean)
        : [];

    const capitalizar = (texto: string) => {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    const primeiroServico = listaServicos.length > 0 ? capitalizar(listaServicos[0]) : "Nenhum";

    return (
        /* MODIFICAÇÃO AQUI: Mudamos rounded-xl para rounded-t-xl. */
        /* Usamos uma condicional para aplicar rounded-b-none (quando aberto) ou rounded-b-xl (quando fechado) */
        <div
            className={`relative w-full bg-[#f1ebd9] text-zinc-900 border-2 border-[#FFA800] rounded-t-xl font-normal text-left shadow-sm select-none flex flex-col transition-all ${
                isOpen && listaServicos.length > 1 ? "rounded-b-none" : "rounded-b-xl"
            }`}
            style={{ height: "58px" }} 
        >
            {/* BOTÃO PRINCIPAL */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full !p-[16px] h-full flex items-center justify-between bg-transparent focus:outline-none cursor-pointer"
            >
                <span className="truncate text-base text-zinc-900">
                    {primeiroServico}
                </span>
                <ChevronDown
                    className="h-5 w-5 opacity-80 shrink-0 transition-transform duration-200 text-[#FFA800]"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                />
            </button>

            {/* LISTA EXPANDIDA POR FORA */}
            {isOpen && listaServicos.length > 1 && (
                /* Ajustado o top para -2px a menos para colar perfeitamente na borda reta de cima */
                <div className="absolute !p-[16px] top-[54px] left-[-2px] w-[calc(100%+4px)] bg-[#f1ebd9] border-2 border-t-0 border-[#FFA800] rounded-b-xl px-4 pb-3 shadow-xl z-50 animate-in fade-in-50 duration-150 max-h-60 overflow-y-auto">
                    {listaServicos.slice(1).map((servico, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full h-11 text-base text-zinc-900 border-t border-zinc-400/40"
                        >
                            <span className="truncate">
                                {capitalizar(servico)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ServicosDropdown;