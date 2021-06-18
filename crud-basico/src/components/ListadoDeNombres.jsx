import React, {useState} from 'react'
import uniqid from 'uniqid'

const ListadoDeNombres = () => {

    const [nombre, setNombre] = useState('')
    const [listaDeNombres, setListaDeNombres] = useState([])
    const [modoDeEdicion, setModoDeEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault() // no recarga pagina    
        if(!nombre.trim()) { // trim evalua si el campo contiene algo
            setError('El campo nombre esta vacio')
            return
        }

        const nuevoNombre = { // genero un objeto nombre con id unico
            id:uniqid(),
            tituloNombre:nombre
        }
        setListaDeNombres([...listaDeNombres,nuevoNombre]) // a lista de nombres le agrega uno nuevo
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) => {
        const nuevoArray = listaDeNombres.filter( item => item.id !== id)
        setListaDeNombres(nuevoArray)
    }

    const editar = (item) => {
        setModoDeEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) => {
        e.preventDefault()
        const NuevoArray = listaDeNombres.map( item => item.id === id ? {id:id, tituloNombre:nombre} : item)
        setListaDeNombres(NuevoArray)
        setModoDeEdicion(false)
        setNombre('')
    }

    return (
        <div>
            <h2>Aplicacion de Crud Basica</h2>  
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaDeNombres.map(item =>
                                <li key="{item.id}" className="list-group-item">
                                    {item.tituloNombre}
                                    <button 
                                        onClick={ () => {editar(item)}}
                                        className="btn btn-info float-right"
                                    > Editar
                                    </button>
                                    <button 
                                        onClick={ () => {deleteNombre(item.id)}}
                                        className="btn btn-danger float-right"
                                    > Borrar
                                    </button>
                                </li>    
                            )
                        }
                    </ul>
                </div>   
                <div className="col">
                    <h2>Formulario para aniadir nombres</h2>
                    <form onSubmit={modoDeEdicion ? editarNombre : addNombre} className="form-group">
                        <input 
                            onChange={(e) => {setNombre(e.target.value)}} 
                            className="form-control mb-3" 
                            type="text" 
                            placeholder="Introduce el nombre"
                            value={nombre}>
                        </input>
                        <input 
                            className="btn btn-info btn-block container" 
                            type="submit" 
                            value={modoDeEdicion? 'Editar Nombre' : 'Registrar Nombre'}>
                        </input>
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ): (
                            <div></div>
                        )
                    }
                </div>   
            </div> 
        </div>
    )
}

export default ListadoDeNombres