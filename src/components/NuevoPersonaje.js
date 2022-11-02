import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';
export default class NuevoPersonaje extends Component {
    cajaNombreRef = React.createRef();
    cajaImagenRef = React.createRef();
    cajaSelectRef = React.createRef();
    state = {
        series: [],
        statusGet: false,
        statusPost: false
    }
    loadSeries = () => {
        var request = "api/Series";
        var url = Global.urlSeries + request;
        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusGet: true
            })
        })
    }
    componentDidMount = () => {
        this.loadSeries();
    }
    updatePersonaje = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombreRef.current.value;
        var imagen = this.cajaImagenRef.current.value;
        var idSerie = parseInt(this.cajaSelectRef.current.value);
        var data = {
            nombre: nombre,
            imagen: imagen,
            idSerie: idSerie
        }
        var request = "api/Personajes"
        var url = Global.urlSeries + request;
        axios.post(url, data).then(res => {
            this.setState({
                statusPost: true
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Nuevo personaje</h1>
                <form onSubmit={this.updatePersonaje}>
                    <label>Nombre:</label><br />
                    <input type="text" ref={this.cajaNombreRef} className="form-control"/><br />
                    <label>Imagen:</label><br />
                    <input type="text" ref={this.cajaImagenRef} className="form-control"/><br />
                    <label>Serie:</label><br />
                    <select ref={this.cajaSelectRef} className="form-control">
                        {
                            this.state.statusGet == true &&
                            this.state.series.map((ser, index) => {
                                return (<option key={ser.idSerie} value={ser.idSerie}>{ser.nombre}</option>)
                            })
                        }
                    </select><br/><br/>
                    <button className='btn btn-warning'>Insertar personaje</button>
                </form>
                {
                    this.state.statusPost==true&&
                    <Navigate to={"/serie/"+this.cajaSelectRef.current.value}></Navigate> 
                }
            </div>
        )
    }
}
