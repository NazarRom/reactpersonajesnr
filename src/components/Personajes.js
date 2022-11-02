import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';
export default class Personajes extends Component {
    //un state para cargar todos los personajes juntos con el status para comprobar
    state = {
        personajes:[],
        status:true
    }
    //axios para cargar los personajes de la api
    loadPersonajes = () =>{
        var idSerie = this.props.idserie
        var request = "/api/Series/PersonajesSerie/" + idSerie;
        var url = Global.urlSeries + request;
        axios.get(url).then(res=>{
            this.setState({
                personajes:res.data,
                status:true
            })
        })
    }
    //ejecutar la funcion antes de que se monte
    componentDidMount = () =>{
        this.loadPersonajes();
    }
  render() {
    return (
      <div>
        <NavLink className="btn btn-success" to={"/serie/"+this.props.idserie}>Volver</NavLink>
        <table className='table table-bordered table-warning'>
            <thead>
                <tr>
                    <th>Personaje</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>

                {   this.state.status==true&&
                    this.state.personajes.map((dat,index)=>{
                        return(<tr key={dat.idPersonaje}>
                            <td>{dat.nombre}</td>
                            <td><img style={{width:"200px", height:"200px"}} src={dat.imagen}/></td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
