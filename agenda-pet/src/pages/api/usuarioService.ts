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

        console.log(response.data);
        return response;

    } catch (error: any) {
        throw new Error(error.response.data);
    }
}

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

export async function editarUsuario(id: number, usuario: EditarUsuarioForm) {
    try {
        const formData = new FormData();
        formData.append("nome", usuario.nome);
        formData.append("email", usuario.email);
        formData.append("numeroTelefone", usuario.numeroTelefone);
        formData.append("tipoUsuario", usuario.tipoUsuarioID);

        console.log(formData);
        await api.put("Usuario/" +  id, formData);
    } catch (error: any) {
        throw new Error(error)
    }
}

