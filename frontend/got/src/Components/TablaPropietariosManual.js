import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Lists = (props) => {
    let books = props.books
    //validando que el arreglo exista y este vacio o no
    if (typeof books !== 'undefined' && books.length > 0) {
        //the array is defined and has at least one element
        return books.map( e => { return <li>{e}</li>})
    }else{
        return (
            <div className = "alert alert-danger">
                Sin alianzas
            </div>
        )
    }


}
class TablaPropietario extends React.Component {
    constructor(props){
        super(props)
        this.state = {character: '',cargando: false}
        //this.eliminarPropietario.bind(this)
    }
    //acccion  para eliminar un usuario
    eliminarPropietario(character,event){
        event.preventDefault();
      
        
        Swal.fire({
            title: `Está seguro de eliminar al propietario ${character.name}?`,
            text: "No podrá revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'cancelar',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            
            //this.props.handleToUpdate("sadasd")
            if (result.value) {
         
                axios.delete(`https://patriciocabrera-webpage.herokuapp.com/propietarios/propietario/${character._id}`)
                .then( (response) => {
                
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Propuetario borrado exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                   
               
            
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }
          })
         
    }
    verMascotas(character,event){
        console.log("que apjoooooo: ",character)
        event.preventDefault();
        this.setState({cargando:true})
        let me = this
        axios.get(`http://localhost:3000/characters/character/${character._id}`)
        .then(function (response) {
            //console.log("tiene mascotas: ",response.data.propietarioMascota);
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
            <div>
                <button onClick = { e =>  this.verMascotas(props.original,e)}  type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                    <span className = "fa fa-search-plus"></span>
                </button> 
                <button onClick = { e =>  this.eliminarPropietario(props.original,e)}  className="btn btn-danger">
                    <span className = "fa fa-times"></span>
                </button>
            </div>    

          }
        ]
        //console.log("las props que llegaron aca son: ",this.props)
        let { characters } = this.props;
        let bodyTareas = []
        if(characters.length > 0){
            characters.map( (elem,i) =>{
                //console.log("el elemento es: ",elem)
                bodyTareas.push(
                 <tr key = {i}>
                     <td>{elem.name}</td>
                     <td>{elem.slug}</td>
                     <td>{elem.alive? 'Vivo': 'Muerto'}</td>
                     <td>
                        <button onClick = { e =>  this.verMascotas(elem,e)}  type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                            <span className = "fa fa-search-plus"></span>
                        </button>    
                        <button onClick = { e =>  this.eliminarPropietario(elem,e)}  className="btn btn-danger">
                            <span className = "fa fa-times"></span>
                        </button>
                 
                     </td>
                 </tr>
    
                )
            })
        }
        let character = this.state.character
        //console.log("asddas",character)
        let infoCharacter = []
        infoCharacter.push(
            <div>
                <div className = "form-group">
                    <label>Name: <b>{character.name}</b></label>
                </div>
                <div className = "form-group">
                    <label>Slug: <b>{character.name}</b></label>
                </div>
                <div className = "form-group">
                    {character.image? 
                       <img src = {character.image} className="img-fluid"></img>
                       :
                       <div className = "alert alert-danger">Sin imagen para mostrar</div>
                        }
                </div>
                <div className = "form-group">
                    <label>Alliances:</label>
                    <Lists books = {character.books}/>
                   
                </div>
            </div>
            
        )
      
        return(
                <div className = "card">   
                    
                    {this.props.characters.length > 0 ?
                    <div className = "table-responsive">
                        <table className = "table table-warning table-sm table-hover table-bordered table-condensed">
                            <thead className = "thead-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bodyTareas}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className = "alert alert-danger">
                        No hay registro de propietarios de mascotas aun
                    </div>
                }
             
              

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mascotas del usuario</h5>
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