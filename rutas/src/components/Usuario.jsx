import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const Usuario = () => {

    const [usuario, setUsuario] = useState([])
    const {id} = useParams() // agarro el id de los parametros
    const obtenerUsuario = async() => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`) // llama a una api
        const user = await res.data
        setUsuario(user)
    }

    useEffect( () => {
        obtenerUsuario()
    }, [])  // pasa un array vacio para que no haya loop infinito


    return (
        <div>
            <h4>Usuario</h4>
            <p>Nombre: {usuario.name}</p>
            <p>Email: {usuario.email}</p>
            <small>Telefono: {usuario.phone}</small>
        </div>
    )
}

export default Usuario