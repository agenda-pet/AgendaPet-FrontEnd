import { useState, FocusEvent, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import { listarTipoUsuarios } from "@/pages/api/tipoUsuarioService";
import { cadastrarUsuario } from "@/pages/api/usuarioService";

interface TipoUsuario {
    tipoUsuarioID: string;
    nomeTipo: string;
}

const CadastrarTutor = () => {

    const [tipoUsuarios, setTipoUsuarios] = useState<TipoUsuario[]>([]);
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [numeroTelefone, setNumeroTelefone] = useState<string>("");
    const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    async function listarTipoUsuarioEmUsuario() {
        const listaTipoUsuarios = await listarTipoUsuarios();
        console.log(listaTipoUsuarios.data);
        setTipoUsuarios(listaTipoUsuarios.data);
    }

    async function salvarUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const dados = {
                nome,
                email,
                numeroTelefone,
                senha,
                tipoUsuarioID: tipoUsuarioSelecionado,
            }

            await cadastrarUsuario(dados);
            alert("Usuário cadastrado com sucesso!");
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect(() => {
        listarTipoUsuarioEmUsuario();
    }, [])

    return (
        <>
            <div className="w-4/5 h-4/5 bg-[#E5D7BB] rounded-3xl  flex flex-col justify-center items-center ">
                {/* <h2 className="">{telaEditar? "Editar:" : Cadastrar:}</h2> */}
                <form onSubmit={salvarUsuario} className="w-4/5 h-1/2 flex flex-col items-center justify-between">
                    <div className="w-full h-1/2 flex items-center ">
                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Nome:
                            </label>
                            <Input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                                label="Tipo Usuario:"
                                value={tipoUsuarioSelecionado}
                                onValueChange={setTipoUsuarioSelecionado}
                                placeholder=""
                                opcoes={tipoUsuarios.map((item) => ({
                                    valor: String(item.tipoUsuarioID), 
                                    rotulo: item.nomeTipo,             
                                }))}
                            />
                        </div>

                        <div className="flex-1 h-3/4 flex flex-col justify-end mr-[16px]">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Numero:
                            </label>
                            <Input
                                type="text"
                                value={numeroTelefone}
                                onChange={(e) => setNumeroTelefone(e.target.value)}
                                placeholder=""
                                className="w-full h-[58] bg-[#f1ebd9] p-[16] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
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

export default CadastrarTutor; 