import React, {useState} from 'react'

import {auth} from '../firebase-config'

const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [msgError, setMsgError] = useState(null)


    const RegistrarUsuario = (e) => {
        /* auth/invalid-email */   // los saque de consola
        /* auth/week-password */   // // los saque de consola
        e.preventDefault()  // no actualiza pagg
        auth.createUserWithEmailAndPassword(email,pass) // metodo para crear usuario
            .then(r => alert("Usuario Registrado"))
            .catch( e => {  // capturo errores
                console.log(e)
                if(e.code === 'auth/invalid-email') {
                    setMsgError('Formato Email incorrecto')
                }
                if(e.code === 'auth/weak-password') {
                    setMsgError('La password debe tener 6 o mas caracteres')
                }
            })
    }


    const LoginUsuario = () => {  // CHEQUEAR QEU POR ALGUNA RAZON NO FUNCIONA
        /* auth/wrong-password */
        auth.signInWithEmailAndPassword(email, pass)
            .then((r) => console.log(r))
            .catch( (err) => { // captura error
                if(err.code === 'auth/wrong-password') {
                    setMsgError('Password Incorrecta')
                }
            })
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input 
                        onChange={ (e) => {setEmail(e.target.value)}}
                        className="form-control"
                        type="email" 
                        placeholder="Introduce el Email"
                    />    
                    <input 
                        onChange={ (e) => {setPass(e.target.value)}}
                        className="form-control mt-4"
                        type="password" 
                        placeholder="Introduce la Contraseña"
                    /> 
                    <input 
                        className="btn btn-dark btn-block mt-4 container"
                        type="submit"
                        value="Registrar Usuario"
                    />   
                </form>
                <button
                    onClick={LoginUsuario}
                    className="btn btn-success btn-block container mt-4"
                >
                    Iniciar Sesion
                </button>
                {
                    msgError !== null ? (
                        <div className="alert alert-danger mt-2">
                            {msgError}
                        </div>
                    ) : (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login