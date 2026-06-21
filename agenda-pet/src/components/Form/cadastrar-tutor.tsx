import { useState, FocusEvent, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import { listarTipoUsuarios } from "@/pages/api/tipoUsuarioService";
import { cadastrarUsuario } from "@/pages/api/usuarioService";
import FormInput from "./FormInput";

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
        console.log(listaTipoUsuarios);
        setTipoUsuarios(listaTipoUsuarios);
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
            <div className="w-1/2 min-h-3/4 bg-[#E5D7BB] rounded-3xl  flex flex-col shadow-[inset_4px_4px_15px_0px_rgba(0,0,0,0.4)] justify-center items-center !p-9 ">
                <h2 className="text-4xl text-start !mb-8 text-[#163923]"> Cadastrar:</h2>
                <form onSubmit={salvarUsuario} className="w-4/5 flex flex-col items-center gap-6">
                    <div className="w-full flex items-end gap-4">
                        <div className="flex-1 flex flex-col mr-[16px]">
                            <FormInput
                                label="Nome do tutor:"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder=""
                            />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Email:
                            </label>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=""
                                className="w-full h-[58px] bg-[#f1ebd9] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-end gap-4">
                        <div className="flex-1 flex flex-col">
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

                        <div className="flex-1 flex flex-col">
                            <label className="text-sm font-medium text-zinc-800 font-sans mb-1">
                                Numero:
                            </label>
                            <Input
                                type="text"
                                value={numeroTelefone}
                                onChange={(e) => setNumeroTelefone(e.target.value)}
                                placeholder=""
                                className="w-full h-[58px] bg-[#f1ebd9] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>
                    </div>

                    {/* BOTÃO SALVAR */}
                    <div className="w-1/3 mt-2">
                        <Button type="submit" className="w-full h-[58px] bg-[#163923] text-[#FFA800] rounded-2xl shadow-md font-semibold cursor-pointer">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastrarTutor; 