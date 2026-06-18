import { title } from "process";
import { api } from "./api";

type UsuarioFormulario = {
    nome: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    tipoUsuarioID: string;
}

type EditarUsuarioForm = {
    nome: string;
    email: string;
    numeroTelefone: string;
    tipoUsuarioID: string;
}

export async function listarUsuarios() {
    try {
        const response = await api.get("Usuario");

<<<<<<< HEAD
=======
        console.log(response.data);
>>>>>>> feature/listaPets
        return response;

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

<<<<<<< HEAD
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
=======
export async function cadastrarUsuario(usuario: UsuarioFormulario) {
    try {
        // const formData = new FormData();

        // formData.append("nome", usuario.nome);
        // formData.append("numeroTelefone", usuario.numeroTelefone);
        // formData.append("email", usuario.email);
        // formData.append("senha", usuario.senha);
        // formData.append("tipoUsuarioID", usuario.tipoUsuarioID);
        // // formData.append("statusUsuario", usuario.statusUsuario);

        // console.log(formData)

        // await api.post("Usuario", formData);

        await api.post("Usuario", {
>>>>>>> feature/listaPets
            nome: usuario.nome,
            numeroTelefone: usuario.numeroTelefone,
            email: usuario.email,
            senha: usuario.senha,
            tipoUsuarioID: usuario.tipoUsuarioID,
        });

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export async function obterUsuarioPorId(id: string) {
    try {
        const response = await api.get("Usuario/UsuarioId/" + id);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

export async function editarUsuario(id: string, usuario: EditarUsuarioForm) {
    try {
        console.log(usuario);
        console.log(JSON.stringify(usuario, null, 2));
        await api.patch(`Usuario/${id}`, usuario);

    } catch (error: any) {
        if (error.response) {
            // Cria um objeto de erro estruturado
            const erroTratado = {
                status: error.response.status,                    // Ex: 400
                statusText: error.response.statusText,            // Ex: "Bad Request"
                mensagem: error.response.data?.message || error.response.data?.error || 'Erro na requisição'
            };

            throw new Error(error.response.data);
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/listaPets
