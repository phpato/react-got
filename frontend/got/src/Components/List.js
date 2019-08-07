import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import TablaPropietarios from './TablaPropietarios'

class List extends React.Component {
    constructor (props) {
       super(props); 
       this.state = {
           characters:[],
           nombre: '',
           apellido: '', 
           email: '', 
           errores: [],
           cargando: false};
        this.handler = this.handler.bind(this);

    }

    listCharacter(){
        this.setState({cargando: true})
        axios.get('http://localhost:3000/characters/character',{
            mode: 'no-cors'
        })
        .then(response => {
          //console.log("la response es: ",response.data);
          this.setState({ 
              characters: response.data.characters,
              cargando: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    handler() {
        //se recarga el padre
        this.listCharacter();
    }
    componentDidMount() {
        this.listCharacter();
    }


    render () {
       
        return(
            <div>
               <div className = "row">
                    <div className = "col">
                        {
                            this.state.cargando?
                            
                            <div className="fa-10x">
                                <label>Cargando...</label>
                                <i className="fas fa-sync fa-spin"></i>
                            </div>
                            :
                            <TablaPropietarios reload = {this.handler} characters = {this.state.characters}/>

                        }
                        
                    </div>
               </div>   
            </div>
    
        )
    
    }
  }


export default List