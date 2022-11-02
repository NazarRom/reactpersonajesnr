import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';
export default class ModificarPersonaje extends Component {
    //refernecias para obtener los valores de los select
    cajaSerieRef = React.createRef();
    cajaPersonajeRef = React.createRef();
    //state para almacenar los datos y status para comprobar
    state = {
        series: [],
        statusSeries: false,
        personajes: [],
        statusPersonajes: false,
        statusPUT: false
    }
    //cargamos las series
    loadSeries = () => {
        var request = "api/Series";
        var url = Global.urlSeries + request;
        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusSeries: true
            })
        })
    }
    //cargamos los personajes
    loadPersonajes = () => {
        var request = "api/Personajes";
        var url = Global.urlSeries + request;
        axios.get(url).then(res => {
            this.setState({
                personajes: res.data,
                statusPersonajes: true
            })
        })
    }
    //que se carge todo antes de montar
    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }
    //un put para modificar los personajes
    updatePersonaje = (e) => {
        e.preventDefault();
        var serie = parseInt(this.cajaSerieRef.current.value);
        var personaje = parseInt(this.cajaPersonajeRef.current.value);
        var request = "/api/Personajes/" + personaje + "/" + serie;
        var url = Global.urlSeries + request;
        axios.put(url).then(res => {
            this.setState({
                statusPUT: true
            })
        })
    }
    render() {
        return (
            <div>
                <form on onSubmit={this.updatePersonaje}>
                    <label>Seleccione una serie:</label><br />
                    <select ref={this.cajaSerieRef} className="form-control">
                        {this.state.statusSeries == true &&
                            this.state.series.map((ser, index) => {
                                return (<option key={ser.idSerie} value={ser.idSerie}>{ser.nombre}</option>)
                            })
                        }
                    </select><br /><br />

                    <label>Seleccione un personaje</label><br />
                    <select ref={this.cajaPersonajeRef} className="form-control">
                        {
                            this.state.statusPersonajes == true &&
                            this.state.personajes.map((per, index) => {
                                return (<option key={per.idPersonaje} value={per.idPersonaje}>{per.nombre}</option>)
                            })
                        }
                    </select><br /><br />

                    <button className='btn btn-warning'>Guardar cambios</button>
                </form>
                {
                    this.state.statusPUT == true &&
                    <Navigate to={"/personajes/" + this.cajaSerieRef.current.value}></Navigate>
                }

            </div>
        )
    }
}
