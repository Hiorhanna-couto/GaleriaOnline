import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from '../../components/botao/Botao'
import { Card } from '../../components/card/Card'
import { useEffect, useState } from 'react'
import api from '../../Services/services'

export const Galeria = () => {

   const [cards, setCards] = useState([]);
   const [imagem, setImagem] = useState(null);
   const [nomeImagem, setnomeImagem] = useState("");

   async function listarCards() {
      try {

         const resposta = await api.get("Imagem");
         //   console.log(resposta.data)
         setCards(resposta.data);

      } catch (error) {
         console.error("Error ao Lista:", error);
         // alert("Error ao Lista!");
      }

   }

   async function CadastraCard(e) {
      e.preventDefault();
      if (imagem && nomeImagem) {
         try {
            //formData e uma inteeface javaScript que permite construir um 
            // conjunto de pares chave/valor representando os dados 
            // de um formulario HYML.
            const formData = new FormData();
            //append: anexar/ acrescentar / adicionar
            formData.append("Nome", nomeImagem)
            formData.append("Arquivo", imagem)

            await api.post("Imagem/upload", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });

            alert("Eba Cadastrooooo 🎉");
            listarCards();

         } catch (error) {
            alert("Nao foi possivel realizar o cadastro!");
            console.error(error);
         }
      } else {
         alert("Preencha os campos de Nome e Imagem!");

      }
   }

   function editarCard(id, nomeAntigos) {

      const novoNome = prompt("Digite o novo nome da imagem", nomeAntigos);

      console.log(novoNome);

      const inputArquivo = document.createElement("input");
      inputArquivo.type = "file";
      //Aceita imagem independente das extensoes
      inputArquivo.accept = "image/*";
      inputArquivo.style = "display: none"
      //<input type ="file" accept= "imagem/*"></input> e a messma coisa
      //Define o que acontece quanto o usuario seleciona
      inputArquivo.onchange = async (e) => {
         const novoArquivo = e.target.files[0];

         const formData = new FormData();
         //Adiciona o novo nome do formData
         formData.append("Nome", novoNome);
         formData.append("Arquivo", novoArquivo);

         console.log(novoNome);
         if (formData) {
            try {
               await api.put(`Imagem/${id}`, formData, {
                  headers: {
                     "Content-Type": "multipart/form-data"
                  }
               })

               alert("Editado com sucesso!");
               listarCards(); // atualizar lista após edição

            } catch (error) {
               alert("Não foi possível alterar o card!");
               console.error(error);
            }
         }
      };

      inputArquivo.click();
   }

   async function excluirCard(id) {
      try {
         await api.delete(`Imagem/${id}`);
         alert("Excluido !!");

         listarCards();
      } catch (error) {
         alert("Erro ao Excluir o card")
         console.log(error)
      }
   }

   useEffect(() => {
      listarCards();

   }, []);

   return (
      <>
         <h1 className='tituloGaleria'>Galeria Online</h1>
         <form className="formulario" onSubmit={CadastraCard}>
            <div className="campoNome">
               <label >Nome</label>
               <input type="text" className='inputNome' onChange={(e) => setnomeImagem(e.target.value)}
                  value={nomeImagem} />
            </div>
            <div className="campoImagem">
               <label className="arquivoLabel">
                  <i><img src={icon} alt="Icone de upload de imagem" /></i>
                  <input type="file" className="arquivoInput"
                     onChange={(e) => setImagem(e.target.files[0])} />
               </label>
            </div>
            <Botao nomeBotao="Cadastrar" />
         </form>
         <div className='campoCards'>
            {cards.length > 0 ? (
               cards.map((e) => (
                  <Card
                     key={e.id}
                     tituloCard={e.nome}
                     imgCard={`https://localhost:7063/${e.caminho.replace("wwwroot/", "")}`}
                     funcaoEditar={() => editarCard(e.id, e.nome)}
                     funcaoExcluir={() => excluirCard(e.id)}
                  />
               ))
            ) : <p>Nenhum card Cadastrar.</p>}

         </div>

      </>

   )
}






