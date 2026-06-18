import { useState, FocusEvent } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";

const listaUsuario = [
    "Dócio", "Bravo"
];

const CadastrarPet = () => {

    const [nomeTutor, setNomeTutor] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [TipoUsuario, setTipoUsuario] = useState("");


    return (
        <>
            <div className="w-4/5 h-4/5 bg-[#E5D7BB] rounded-3xl  flex flex-col justify-center items-center ">
                {/* <h2 className="">{telaEditar? "Editar:" : Cadastrar:}</h2> */}
                <form action="" className="w-4/5 h-1/2 flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 flex items-center ">
                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Nome:
                            </label>
                            <Input
                                type="text"
                                value={nomeTutor}
                                onChange={(e) => setNomeTutor(e.target.value)}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>

                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Email:
                            </label>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div className="w-4/5 h-1/2 flex items-end ">
                        <div className="flex-1 h-3/4 mr-[16]">
                            <FormSelect
                                label="Porte:"
                                value={TipoUsuario}
                                onValueChange={setTipoUsuario}
                                placeholder=""
                                opcoes={listaUsuario.map((c) => ({ valor: c, rotulo: c }))}
                            />
                        </div>

                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Numero:
                            </label>
                            <Input
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero (e.target.value)}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
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