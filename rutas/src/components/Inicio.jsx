import React from 'react'
import { useParams } from 'react-router'

const Inicio = () => {

    const {id, nombre, edad} = useParams()

    return (
        <div>
            <h1>Pagina de inicio</h1>
            <p>{id}</p>
            <p>{nombre}</p>
            <p>{edad}</p>
        </div>
    )
}
// http://localhost:3000/inicio/Mati/1/22 ejemplo
export default Inicio