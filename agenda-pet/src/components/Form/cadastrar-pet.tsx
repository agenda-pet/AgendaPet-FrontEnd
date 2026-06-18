import { useState, FocusEvent } from "react";
import {Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";

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

const listaComportamento = [
    "Dócio", "Bravo"
];

const listaPorte = [
    "médio", "Grande"
];

const listaAnimal = [
    "gato", "cachorro"
];

const listaRaca = [
    "gato", "cachorro"
];

const CadastrarPet = () => {
    const [nomePet, setNomePet] = useState("");
    const [nomeTutor, setNomeTutor] = useState("");
    const [comportamento, setComportamento] = useState("");
    const [animal, setAnimal] = useState("");
    const [porte, setPorte] = useState("");
    const [raca, setRaca] = useState("");
    const [tutorEncontrado, setTutorEncontrado] = useState<UsuarioTutor | null>(null);
    const [erroTutor, setErroTutor] = useState(false);
    const [buscandoTutor, setBuscandoTutor] = useState(false);

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
            }

        } catch (error) {
            console.error("Erro ao validar tutor", error);
            setTutorEncontrado(null);
                setErroTutor(true);
        } finally {
            setBuscandoTutor(false);
        }
    };


    const resetarEstados = () => {
        setTutorEncontrado(null);
        setErroTutor(false);
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
                    <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                        <label htmlFor="" className="mb-1">Nome do Pet:</label>
                        <div className="relative h-4/5">
                            <Input
                                type="text"
                                value={nomePet}
                                onChange={(e) => setNomePet(e.target.value)}
                                onBlur={handleVerificarTutor}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>
                    </div>
                    {/* Componente de Hora Reutilizável */}
                    <div className="flex-1 h-3/4">
                        <FormSelect
                            label="Comportamento:"
                            value={comportamento}
                            onValueChange={setComportamento}
                            placeholder=""
                            opcoes={listaComportamento.map((c) => ({ valor: c, rotulo: c }))}
                        />
                    </div>
                </div>

                <div className="w-4/5 h-1/2 flex items-end ">
                    <div className="flex-1 h-3/4 mr-[16]">
                        <FormSelect
                            label="Porte:"
                            value={porte}
                            onValueChange={setPorte}
                            placeholder=""
                            opcoes={listaPorte.map((c) => ({ valor: c, rotulo: c }))}
                        />
                    </div>

                    <div className="flex-1 h-3/4 mr-[16]">
                        <FormSelect
                            label="Tipo do Animal:"
                            value={animal}
                            onValueChange={setAnimal}
                            placeholder=""
                            opcoes={listaAnimal.map((c) => ({ valor: c, rotulo: c }))}
                        />
                    </div>

                    <div className="flex-1 h-3/4">
                        <FormSelect
                            label="Raça:"
                            value={raca}
                            onValueChange={setRaca}
                            placeholder=""
                            opcoes={listaRaca.map((c) => ({ valor: c, rotulo: c }))}
                        />
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

export default CadastrarPet;