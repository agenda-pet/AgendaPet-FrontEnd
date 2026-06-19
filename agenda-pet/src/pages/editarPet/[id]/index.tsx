import Header from "@/components/header/header";
import styles from "./editarPet.module.css";
import { useEffect, useState } from "react";
import { listarComportamento } from "../../api/comportamentoService";
import { listarPorte } from "../../api/porteService";
import { listarTipoAnimal } from "../../api/tipoAnimalService";
import { listarRaca } from "../../api/racaService";
import { atualizarPet, obterPetPorID } from "../../api/petService";
import { useRouter } from "next/router";

interface ComportamentoRecebido {
  comportamentoID: string,
  nomeComportamento: string
}

interface PorteRecebido {
  porteID: string,
  nomePorte: string
}

interface petBuscado {
  petID: string,
  nome: string,
  porteID: string,
  nomeTipo: string,
  tipoAnimalID: string,
  nomeComportamento: string,
  comportamentoID: string,
  nomeRaca: string,
  racaID: string,
  nomePorte: string,
  nomeDono: string,
  usuarioID: string,
  agendamentos: []
}

interface TipoRecebido {
  tipoAnimalID: string,
  nomeTipo: string
}
interface RacaRecebido {
  racaID: string,
  nomeRaca: string
}

type PetAtualizar = {
  nome: string;
  comportamentoID: string;
  porteID: string;
  usuarioID: string;
}

const EditarPet = () => {

  const [comportamentos, setComportamentos] = useState<ComportamentoRecebido[]>([]);
  const [portes, setPortes] = useState<PorteRecebido[]>([]);
  const [tipos, setTipos] = useState<TipoRecebido[]>([]);
  const [racas, setRacas] = useState<RacaRecebido[]>([]);
  const [tutor, setTutor] = useState("");
  const [nome, setNomePet] = useState("");
  const [comportamentoID, setComportamentoID] = useState("");
  const [porteID, setPorteID] = useState("");
  const [petObtido, setPetObtido] = useState<petBuscado | null>(null);

  const router = useRouter();
  const { id } = router.query;

  async function carregarPet(id: string) {
    const dados = await obterPetPorID(id);
    setPetObtido(dados);
  }



  const usuarioID: string = petObtido?.usuarioID!;

  const petAtualizado = {
    nome,
    comportamentoID,
    porteID,
    usuarioID
  }

  async function carregarComportamentos() {
    const resposta = await listarComportamento()
    console.log("resp", resposta)
    if (resposta != null)
      setComportamentos(resposta)
  }
  console.log("comp: ", comportamentos)

  async function carregarPorte() {
    const resposta = await listarPorte()
    if (resposta != null)
      setPortes(resposta)
  }

  async function carregarTipo() {
    const resposta = await listarTipoAnimal()
    if (resposta != null)
      setTipos(resposta)
  }

  async function carregarRaca() {
    const resposta = await listarRaca()
    if (resposta != null)
      setRacas(resposta)
  }

  useEffect(() => {
    if (!router.isReady) return
    console.log(id)
    carregarPet(String(id));

    carregarComportamentos()
    carregarPorte()
    carregarTipo()
    carregarRaca()
  }, [router.isReady])


  return (
    <>
      <Header />
      <main className={styles.area_principal}>
        <form className={styles.questionario} action="" onSubmit={(e) => {
          e.preventDefault()
          atualizarPet(petObtido?.petID!, petAtualizado);
        }}>

          <div className={styles.container_h1}>
            <h1>Editar Pet</h1>
          </div>
          <div className={styles.container_editar}>

            <div className={styles.area_editar}>

              <div className={styles.editar_tutor}>
                <label className={styles.tutor}>Tutor:</label>
                <input className={styles.texto_tutor} placeholder="" defaultValue={petObtido?.nomeDono} onChange={(e) => setTutor(e.target.value)} disabled />
              </div>

              <div className={styles.editar_nomePet}>
                <label className={styles.nomePet}>Nome do pet:</label>
                <input className={styles.texto_nomePet} placeholder="" defaultValue={petObtido?.nome} onChange={(e) => setNomePet(e.target.value)} />
              </div>

              <div className={styles.editar_comportamento}>
                <label className={styles.comportamento}>Comportamento:</label>
                <select className={styles.selecionar_comportamento}>
                  {comportamentos.length <= 0 ? "" : comportamentos.map((comportamento) => (<option value={comportamento.comportamentoID} key={comportamento.comportamentoID} onChange={(e) => setComportamentoID(e.target.value)}>{comportamento.nomeComportamento}</option>))}
                </select>
              </div>

            </div>

            <div className={styles.area_editar2}>

              <div className={styles.editar_porte}>
                <label className={styles.porte}>Porte:</label>
                <select className={styles.selecionar_porte}>
                  {portes.length <= 0 ? "" : portes.map((porte) => (<option value={porte.porteID} key={porte.porteID} onChange={(e) => setPorteID(e.target.value)}>{porte.nomePorte}</option>))}
                </select>
              </div>

              <div className={styles.editar_tipo_animal}>
                <label className={styles.tipo_animal}>Tipo de animal:</label>
                <select className={styles.selecionar_tipo_animal} disabled>
                  {tipos.length <= 0 ? "" : (<option value={petObtido?.tipoAnimalID}>{petObtido?.nomeTipo}</option>)}
                </select>
              </div>

              <div className={styles.editar_raca}>
                <label className={styles.raca}>Raça:</label>
                <select className={styles.selecionar_raca} disabled>
                  {racas.length <= 0 ? "" : (<option value={petObtido?.racaID}>{petObtido?.nomeRaca}</option>)}
                </select>
              </div>

            </div>

          </div>
          <button>Salvar</button>
        </form>
      </main>
    </>
  )
}

export default EditarPet;