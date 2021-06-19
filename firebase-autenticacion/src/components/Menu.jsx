import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../firebase-config'

const Menu = () => {

    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)

    //comprobar si hay alguien iniciado
    useEffect( () => {
        auth.onAuthStateChanged( (user) => {
            if(user) {
                setUsuario(user.email)
            }
        })
    }, []) // [] para que no haya loop infinito

    const CerrarSesion = () => {
        auth.signOut()    // cierra secion
        setUsuario(null) // setea en null
        historial.push('') // va a inicio
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                    {
                        !usuario ? ( // si no esta logeado
                            <Link className="nav-link" to="/login">Login</Link>
                        ) : (
                            <span></span>
                        )
                    }  
                    </li>
                    <li className="nav-item">
                    {
                        !usuario ? ( // si no esta logeado
                            <Link className="nav-link" to="/admin">Admin</Link>
                        ) : (
                            <span></span>
                        )
                    }  
                    </li>
                </ul>  
     
                <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                        {
                            usuario ? (
                                <button 
                                    onClick={CerrarSesion}
                                    className="btn btn-danger" 
                                    >Cerrar Session</button>
                            ) : (
                                <span></span>
                            )
                        }  
                        </li>
                </ul>

            </nav>
        </div>
    )
}

export default Menu