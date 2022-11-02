import React, { Component } from 'react';
//importar navlink para la navegacion por componentes y sustituirlo
import { NavLink } from 'react-router-dom';
//importar axios para cargar el select
import axios from 'axios';
//importar el global
import Global from '../Global';
export default class MenuSeries extends Component {
    state = {
        series:[],
        status:false
    }
    loadSelect = () =>{
        var request = "api/Series";
        var url = Global.urlSeries + request;
        axios.get(url).then(res=>{
            this.setState({
                series:res.data,
                status:true
            })
        }) 
    }
    componentDidMount = () =>{
        this.loadSelect();
    }
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">SeriesCrud</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nuevopersonaje">Nuevo Personaje</NavLink>
              </li>
              <li className="nav-item">
              
                <NavLink to="/modificarpersonaje" className="nav-link" >Modificar personaje</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Series
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {
                    this.state.status == true&&
                    this.state.series.map((serie,index)=>{
                        return(<li className="dropdown-item" key={serie.idSerie}><NavLink to={"/serie/"+ serie.idSerie}>{serie.nombre}</NavLink></li>)
                    })
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
