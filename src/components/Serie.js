import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';
export default class Serie extends Component {
    state = {
        datos: {},
        status: false
    }
    loadDatos = () => {
        var idserie = this.props.idserie;
        var request = "api/Series/";
        var url = Global.urlSeries + request + idserie;
        axios.get(url).then(res => {
            this.setState({
                datos: res.data,
                status: true
            })

        })
    }
    componentDidMount = () => {
        this.loadDatos();
    }
    componentDidUpdate = (oldProsp) => {
        if (oldProsp.idserie != this.props.idserie) {
            this.loadDatos();
        }
    }
    render() {
        return (
            <div>
                <table className='table table-bordered table-warning'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Puntuacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img style={{width:"200px", height:"200px"}} src={this.state.datos.imagen} /></td>
                            <td>{this.state.datos.nombre}</td>
                            <td>{this.state.datos.puntuacion}</td>
                        </tr>
                    </tbody>
                </table>
                <NavLink className="btn btn-warning" to={"/personajes/"+this.state.datos.idSerie}>Personajes</NavLink>
            </div>
        )
    }
}
