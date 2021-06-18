import React, {useState, useEffect} from 'react'

const Base = () => {
    const [nombre, setNombre] = useState('Pedro')
    // se ejecuta automaticamente luego de renderizar todo el html
    useEffect( () => {
        setTimeout( () => {
            setNombre('Manuel')
        }, 2000 )   // ejecuta luego de 2 segundos
    })

    return (
        <div>
            <h1>Pagina Base</h1>   
            {nombre} 
        </div>
    )
}

export default Base