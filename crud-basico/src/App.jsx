import React from 'react'
import ListadoDeNombres from './components/ListadoDeNombres';
import Card from './components/Card';

function App() {
  return (
    <div className="container">
      <ListadoDeNombres></ListadoDeNombres>
      <hr/>

      <div>
        <h1>Propiedades de los componentes</h1>
        <hr/>
        <div className="row">
          <div className="col" style={{display:'flex', justifyContent:'space-around'}}>
            <Card
              imagen="https://lorempixel.com/150/150"
              titulo="Titulo card 1"
              texto="Texto de la card 1" >
            </Card>
            <Card
              imagen="https://lorempixel.com/150/150"
              titulo="Titulo card 2"
              texto="Texto de la card 2" >
            </Card>
            <Card
              imagen="https://lorempixel.com/150/150"
              titulo="Titulo card 3"
              texto="Texto de la card 3" >
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
