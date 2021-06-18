import React from 'react'

const Card = (props) => { // recive propiedades por parametro
    // Extraemos todas las props con Object Destructuring
    const {imagen, titulo, texto} = props
    const style = {
        width:"18rem", borderColor:"black"
    }

    return (
        <div className="card" style={style}>
            <img src={imagen} className="card-img-top img-thumbnail" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{texto}</p>
                <a href="#" className="btn btn-primary">Ver mas</a>
            </div>
        </div>
    )
}

export default Card