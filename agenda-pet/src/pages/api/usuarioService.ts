import { api } from "./api";

type UsuarioFormulario = {
    nome: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    tipoUsuarioID: string;
}

export async function listarUsuarios() {
    try {
        const response = await api.get("Usuario");

        return response;
        
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export async function listarUsuariosPorId(id: string) {
    try {
        const response = await api.get("Usuario/UsuarioId/" + id)

        return response;
    } catch(error: any) {
        throw new Error(error.response.data);
    }
}

export async function cadastrarUsuario(usuario: UsuarioFormulario) {
    try {
         await api.post("Usuario", {
            nome: usuario.nome,
            numeroTelefone: usuario.numeroTelefone,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuarioID: usuario.tipoUsuarioID,
        });

    }catch (error: any) {
        throw new Error(error.response.data);
    }
}

