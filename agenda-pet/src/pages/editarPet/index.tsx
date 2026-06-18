import Header from "@/components/header/header";
import styles from "./editarPet.module.css";
import { useEffect, useState } from "react";
interface ComportamentoRecebido {
  comportamentoID: string,
  nomeComportamento: string
}
interface PorteRecebido {
  porteID: string,
  nomePorte: string
}
interface TipoRecebido {
  tipoAnimalID: string,
  nomeTipo: string
}
interface RacaRecebido {
  racaID: string,
  nomeRaca: string
}
const EditarPet = () => {

  const [comportamentos, setComportamentos] = useState <ComportamentoRecebido[]> ([]);
  const [portes, setPortes] = useState <PorteRecebido[]> ([]);
  const [tipos, setTipos] = useState <TipoRecebido[]> ([]);
  const [racas, setRacas] = useState <RacaRecebido[]> ([]);

  async function lerComportamentos() {
    const resposta = await lerComportamentos()
    if (resposta != null)
      setComportamentos (resposta)
  }

  async function lerPorte() {
    const resposta = await lerPorte()
    if (resposta != null)
      setPortes (resposta)
  }

  async function lerTipo() {
    const resposta = await lerTipo()
    if (resposta != null)
      setTipos (resposta)
  }

  async function lerRaca() {
    const resposta = await lerRaca()
    if (resposta != null)
      setRacas (resposta)
  }

  useEffect(()=> {
    lerComportamentos()
    lerPorte()
    lerTipo()
    lerRaca()
  },[])

  
  return (
    <>
      <Header />
      <main className={styles.area_principal}>
        <form className={styles.questionario} action="">

          <div className={styles.container_h1}>
            <h1>Editar Pet</h1>
          </div>
          <div className={styles.container_editar}>

            <div className={styles.area_editar}>

              <div className={styles.editar_tutor}>
                <label className={styles.tutor}>Tutor:</label>
                <input className={styles.texto_tutor} placeholder=""></input>
              </div>

              <div className={styles.editar_nomePet}>
                <label className={styles.nomePet}>Nome do pet:</label>
                <input className={styles.texto_nomePet} placeholder=""></input>
              </div>

              <div className={styles.editar_comportamento}>
                <label className={styles.comportamento}>Comportamento:</label>
                <select className={styles.selecionar_comportamento}></select>
              </div>

            </div>

            <div className={styles.area_editar2}>

              <div className={styles.editar_porte}>
                <label className={styles.porte}>Porte:</label>
                <select className={styles.selecionar_porte}></select>
              </div>

              <div className={styles.editar_tipo_animal}>
                <label className={styles.tipo_animal}>Tipo de animal:</label>
                <select className={styles.selecionar_tipo_animal}></select>
              </div>

              <div className={styles.editar_raca}>
                <label className={styles.raca}>Raça:</label>
                <select className={styles.selecionar_raca}></select>
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