import React, {useState, useEffect} from "react"
import {store} from './firebaseconf'

function App() {

  const [modoEdicion, setModoEdicion] = useState(null)
  const [idUsuario, setIdUsuario] = useState('')
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [usuariosAgenda, setUsuariosAgenda] = useState([])

  useEffect( () => {
    // funcion que se ejecuta al cargar el componente
    const getUsuarios = async() => {
      const {docs} = await store.collection('agenda').get() // retorna el documento en 'propiedad docs'
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()})) // mapea la respuesta en objetos id, y datos 
      setUsuariosAgenda(nuevoArray)
    }
    getUsuarios()
  }, []) // array vacio para qeu no genere bucle

  const BorrarUsuario = async (id) => {
    try {
      await store.collection('agenda').doc(id).delete() // borra doc por id
      const {docs} = await store.collection('agenda').get() // retorna el documento en 'propiedad docs'
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()})) // mapea la respuesta en objetos id, y datos 
      setUsuariosAgenda(nuevoArray) // setea el arreglo
    } catch (e) {
      console.log(e)
    }
  }

  const setUsuarios = async (e) => {
    e.preventDefault()  // evito recarga
    //comprobar que no haya campos vacios
    if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    } else {
      if(!phone.trim()) {
        setError('El campo telefono esta vacio')
      }   
    }

    const usuario = {
      nombre:nombre,
      telefono:phone
    }

    try {
      const data = await store.collection('agenda').add(usuario) // collection en la cual voy a grabar
      const {docs} = await store.collection('agenda').get() // retorna el documento en 'propiedad docs'
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()})) // mapea la respuesta en objetos id, y datos 
      setUsuariosAgenda(nuevoArray) // setea el arreglo
      alert('Usuario agregado con exito')
    } catch(e){
      console.log(e)
      setNombre('')
      setPhone('')
    } 
  }

  const setUpdate = async (e) => {
    e.preventDefault()  // evito recarga
    //comprobar que no haya campos vacios
    if(!nombre.trim()) {
      setError('El campo nombre esta vacio')
    } else {
      if(!phone.trim()) {
        setError('El campo telefono esta vacio')
      }   
    }
    const userUpdate = {
      nombre:nombre,
      telefono:phone
    }
    try {
      await store.collection('agenda').doc(idUsuario).set(userUpdate) // actualiza 
      const {docs} = await store.collection('agenda').get() // retorna el documento en 'propiedad docs'
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()})) // mapea la respuesta en objetos id, y datos 
      setUsuariosAgenda(nuevoArray) // setea el arreglo
    } catch(e) {
      console.log(e)
    }
    setNombre('')
    setPhone('')
    setIdUsuario('')
    setModoEdicion(false)
  }

  const pulsarEditar = async (id) => {
    try {
      const data = await store.collection('agenda').doc(id).get() // traigo el doc
      const {nombre, telefono} = data.data() // extraigo dichos parametros
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className="form-group">
            <input 
              value={nombre}
              onChange={ (e) => { setNombre(e.target.value)} } 
              className="form-control"
              type="text" 
              placeholder="Introdue el nombre"
            />
            <input 
              value={phone}
              onChange={ (e) => { setPhone(e.target.value)} }
              className="form-control mt-3"
              type="text" 
              placeholder="Introdue el numero de telefono"
            />
            {
              modoEdicion ? (
                <input 
                  type="submit" 
                  value="Actualizar" 
                  className="btn btn-light btn-block container mt-3"
                />
              ) : (
                <input 
                  type="submit" 
                  value="Registrar" 
                  className="btn btn-dark btn-block container mt-3"
                />
              )
            }
          </form>
          {
            error ? ( // si existe el error
              <div>
                <p>{error}</p>
              </div>
            ) : (
                <span></span>
            )
          }
        </div>
        <div className="col">
          <h2>Lista Agenda</h2>
          <ul className="list-group">
          {
            usuariosAgenda.length !== 0 ? ( // es diferente a 0
              usuariosAgenda.map( item => (
                <li className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono}
                  <button onClick={ (id) => { BorrarUsuario(item.id)} } className="btn btn-danger float-end ms-2">Borrar</button>
                  <button onClick={ (id) => { pulsarEditar(item.id)} } className="btn btn-info float-end">Editar</button>
                </li>
              ))
            ) : (
              <span>
                Lo siento no hay Usuarios que mostrar
              </span>
            )
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
