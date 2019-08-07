import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Lists = (props) => {
        let listas = props.lista
        //validando que el arreglo exista y este vacio o no
        if (typeof listas !== 'undefined' && listas.length > 0) {
            //the array is defined and has at least one element
            return listas.map( elem => { return <li>{elem}</li>})
        }else{
            return (
                <div className = "alert alert-danger">
                   {`Sin ${props.accion}`}
                </div>
            )
        }


}
class TablaPropietario extends React.Component {
    constructor(props){
        super(props)
        this.state = {character: '',cargando: false}
    }
    //acccion  para eliminar un usuario
    eliminarPersonaje(character,event){
        event.preventDefault();
        
        let props = this.props
        Swal.fire({
            title: `Está seguro de eliminar al personaje ${character.name}?`,
            text: "No podrá revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'cancelar',
            confirmButtonText: 'Si, eliminar'
          }).then((result,props) => {
        
            if (result.value) {
         
                axios.delete(`https://patricio-got-backend.herokuapp.com/characters/character/${character._id}`)
                .then( (response) => {
                
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Personaje borrado exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                   //se recargar el padre para no tener que recargar la pagina
                   this.props.reload()
            
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }
          })
   
         
    }
    verPersonaje(character,event){
        
        event.preventDefault();
        this.setState({cargando:true})
        let me = this
        axios.get(`https://patricio-got-backend.herokuapp.com/characters/character/${character._id}`)
        .then(function (response) {
            
            me.setState({
                character: response.data.character[0],
                cargando: false
            })
    
        })
        .catch(function (error) {
            console.log(error);
        });
       
    }
    render(){
        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Culture',
            accessor: 'slug',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          },
          {
            Header: 'Acción',
            Cell: props =>   
            <div key ={props.original._id}>
                <button onClick = { e =>  this.verPersonaje(props.original,e)}  type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                    <span className = "fa fa-search-plus"></span>
                </button> 
                <button onClick = { e =>  this.eliminarPersonaje(props.original,e)}  className="btn btn-danger">
                    <span className = "fa fa-times"></span>
                </button>
            </div>    

          }
        ]
        //console.log("las props que llegaron aca son: ",this.props)
        let { characters } = this.props;

        let character = this.state.character
       
        let infoCharacter = []
        infoCharacter.push(
            <div key={character._id}>
                <div className = "form-group">
                    <label>Nombre: <b>{character.name}</b></label>
                </div>
                <div className = "form-group">
                    <label>Slug: <b>{character.name}</b></label>
                </div>
                <div className = "form-group">
                    <label>Género: <b>{
                        character.gender == "male"?
                        <label>Masculino</label>
                        :
                        <label>Femenino</label>
                        }</b></label>
                </div>
                <div className = "form-group">
                    <label>Estado: <b>{
                        character.alive?
                            <label className = "text-info">Vivo</label>
                        :
                            <label className = "text-danger">Muerto</label>
                        }</b></label>
                </div>
                <div className = "form-group">
                    {character.image? 
                       <img src = {character.image} className="img-fluid img-thumbnail"></img>
                       :
                       <div className = "alert alert-danger">Sin imagen para mostrar</div>
                        }
                </div>
                <div className = "form-group">
                    <label>Lealtad:</label>
                    <Lists lista = {character.allegiance} accion = {"lealtad"}/>
                </div>
                <div className = "form-group">
                    <label>Libros:</label>
                    <Lists lista = {character.books} accion = {"libros"}/>
                </div>
                <div className = "form-group">
                    <label>Títulos:</label>
                    <Lists lista = {character.titles} accion = {"títulos"}/>
                </div>
            </div>
            
        )
      
        return(
                <div className = "card">   
                    
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ficha personaje</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.cargando === true? 
                            <div class="fa-10x">
                                <i class="fas fa-sync fa-spin"></i>
                            </div>
                        :
                            infoCharacter}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-dismiss="modal">Cerrar</button>
                    </div>
             
                    </div>
                </div>
                </div>
                <ReactTable 
                    defaultPageSize={10}
                    minRows={10}
                    data = {characters} 
                    columns = {columns}  
                    previousText =  {'Anterior'}
                    nextText= {'Siguiente'}
                    loadingText = {'Cargando...'}
                    noDataText= {'No se encontraron filas'}
                    pageText= {'Página'}
                    ofText= {'de'}
                    rowsText= {'filas'}
                    filterable= {true}
                />
            </div>
        )
    }
}   

export default TablaPropietario