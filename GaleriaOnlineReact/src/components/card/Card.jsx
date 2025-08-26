import "./Card.css"
//import imgCard from "../../assets/img/lala.png"

import imgPen from "../../assets/img/caneta.svg"
import imgTrash from "../../assets/img/trash.svg"

export const Card = ({ tituloCard, imgCard, funcaoEditar, funcaoExcluir }) => {
    return (
        <>
            <div className="cardDaImagem">
                <p>{tituloCard}</p>
                <img className="imgDoCard" src={imgCard} alt="Imagem relacionado ao card" />
                <div className="icons">
                    <img src={imgPen} onClick={funcaoEditar} alt="icone de caneta para raelizar um alteracao" />
                    <img src={imgTrash} onClick={funcaoExcluir} alt="icone de uma lixeira para realizar a exclusao" />
                </div>
            </div>

        </>
    )

}