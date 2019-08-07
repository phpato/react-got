import React from 'react'
class View extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
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
                       <img src = {character.image} className="img-responsive"></img>
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
            <div>
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
                        {infoCharacter}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default View