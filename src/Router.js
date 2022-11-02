import React, { Component } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import MenuSeries from './components/MenuSeries';
import HomeSeries from './components/HomeSeries';
import Serie from './components/Serie';
import { useParams } from 'react-router-dom';
import Personajes from './components/Personajes';
import NuevoPersonaje from './components/NuevoPersonaje';
import ModificarPersonaje from './components/ModificarPersonaje';
export default class Router extends Component {
  render() {
    function GetSerieElement(){
        var {idserie} = useParams();
        return(<Serie idserie={idserie}/>)
    }
    function GetPersonajesElement(){
        var {idserie} = useParams();
        return(<Personajes idserie={idserie}/>)
    }
    return (
      <BrowserRouter>
      <MenuSeries/>
      <Routes>
        <Route path='/' element={<HomeSeries/>}></Route>
        <Route path='/serie/:idserie' element={<GetSerieElement/>}/>
        <Route path='/personajes/:idserie' element={<GetPersonajesElement/>}/>
        <Route path='/nuevopersonaje' element={<NuevoPersonaje/>}/>
        <Route path='/modificarpersonaje' element={<ModificarPersonaje/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}
