import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "./formSelect";
import { listarTipoUsuarios } from "@/pages/api/tipoUsuarioService";
import { cadastrarUsuario, editarUsuario, listarUsuariosPorId } from "@/pages/api/usuarioService"; // 💡 Certifique-se de importar essas funções do seu service
import FormInput from "./FormInput";
import { useParams } from "next/navigation";
import Router from "next/router";

interface TipoUsuario {
    tipoUsuarioID: string;
    nomeTipo: string;
}

const CadastrarTutor = () => {
    // Parâmetros da URL para verificar se é Edição
    const params = useParams();
    const id = params?.id as string;
    const isEditMode = Boolean(id);

    const [tipoUsuarios, setTipoUsuarios] = useState<TipoUsuario[]>([]);
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [numeroTelefone, setNumeroTelefone] = useState<string>("");
    const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    async function listarTipoUsuarioEmUsuario() {
        try {
            const listaTipoUsuarios = await listarTipoUsuarios();
            setTipoUsuarios(listaTipoUsuarios);
        } catch (error) {
            console.error("Erro ao listar tipos de usuário:", error);
        }
    }

    // 💡 Efeito para carregar os dados antigos do Tutor caso seja Edição
    useEffect(() => {
        if (!isEditMode || !id) return;

        async function carregarDadosTutor() {
            try {
                const resposta = await listarUsuariosPorId(id);
                const dados = resposta.data || resposta;

                setNome(dados.nome || "");
                setEmail(dados.email || "");
                setNumeroTelefone(dados.numeroTelefone || "");
                setTipoUsuarioSelecionado(dados.tipoUsuarioID || "");
            } catch (error: any) {
                console.error("Erro ao carregar dados do tutor para edição:", error);
                alert(`Erro ao carregar dados: ${error.message}`);
            }
        }

        carregarDadosTutor();
    }, [id, isEditMode]);

    useEffect(() => {
        listarTipoUsuarioEmUsuario();
    }, []);

    // 💡 Função isolada para salvar (Cadastro)
    async function handleSalvar(dadosBase: any) {
        if (!senha) {
            alert("A senha é obrigatória para o cadastro.");
            return;
        }
        const payloadCadastro = { ...dadosBase, senha };
        await cadastrarUsuario(payloadCadastro);
        alert("Usuário cadastrado com sucesso!");
        
        // Limpa os campos após salvar
        setNome("");
        setEmail("");
        setNumeroTelefone("");
        setSenha("");
        setTipoUsuarioSelecionado("");
    }

    async function handleEditar() {
        const payloadEditar = {
            nome,
            numeroTelefone,
            email,
            tipoUsuarioID: tipoUsuarioSelecionado,
        };
        
        await editarUsuario(id, payloadEditar);
        alert("Usuário atualizado com sucesso!");
        Router.push('/usuarios');
    }

    // 💡 Gerenciador central do envio do Formulário
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!nome || !email || !numeroTelefone || !tipoUsuarioSelecionado) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            if (isEditMode) {
                await handleEditar();
            } else {
                await handleSalvar({ nome, email, numeroTelefone, tipoUsuarioID: tipoUsuarioSelecionado });
            }
        } catch (error: any) {
            alert(`Falha na operação: ${error.message}`);
        }
    }

    return (
        <>
            <div className="w-1/2 !p-4 bg-[#E5D7BB] rounded-3xl flex flex-col shadow-[inset_4px_4px_15px_0px_rgba(0,0,0,0.4)] justify-center items-center !p-9">
                {/* 💡 Título Dinâmico */}
                <h2 className="text-4xl text-start !mb-8 text-[#163923]">
                    {isEditMode ? "Editar Tutor:" : "Cadastrar Tutor:"}
                </h2>
                
                <form onSubmit={handleSubmit} className="w-4/5 flex flex-col items-center gap-6">
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
                                className="w-full h-[47px] !p-4 bg-[#f1ebd9] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
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
                                className="w-full h-[47px] !p-4 bg-[#f1ebd9] border-2 border-[#FFA800] text-zinc-900 rounded-xl px-4 shadow-sm transition-all text-base focus-visible:ring-1 focus-visible:ring-amber-500"
                            />
                        </div>
                    </div>
                    {/* 💡 Layout Dinâmico de Botões */}
                    <div className={`flex flex-row gap-4 mt-4 justify-center w-full`}>
                        <Button 
                            type="submit" 
                            className="w-1/3 h-[58px] bg-[#163923] text-[#FFA800] rounded-2xl shadow-md font-semibold cursor-pointer hover:bg-[#0F2818] transition-colors"
                        >
                            {isEditMode ? "Atualizar" : "Salvar"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CadastrarTutor;