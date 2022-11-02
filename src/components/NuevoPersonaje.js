import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';
export default class NuevoPersonaje extends Component {
    //tres referencas para obtener los valores
    cajaNombreRef = React.createRef();
    cajaImagenRef = React.createRef();
    cajaSelectRef = React.createRef();
    //state donde almacenar los datos y comprobarlos
    state = {
        series: [],
        statusGet: false,
        statusPost: false
    }
    //cargar el selec con las series
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
    //cargar el select antes de que se monte el componente
    componentDidMount = () => {
        this.loadSeries();
    }
    //un post para introducir un personaje nuevo
    //recojo los tres valores los meto en un js (data) y hago un post con axios
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
