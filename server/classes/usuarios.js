

class Usuarios { 

    constructor() {

        this.personas = []

    }

    agregarPersona(id, nombre, sala){

        let persona = { id, nombre, sala }

        this.personas.push(persona);

    }

    getPersonaById( id ){

        let persona = this.personas.filter( personaEncontrada => personaEncontrada.id === id  )[0]; //EL filter devuelve un arreglo, y como solo quiero un registro, pido la posicion 1. 

        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonasBySala( sala ){
        let personasEnSala =  this.personas.filter( personasEnSala => personasEnSala.sala === sala );
        return personasEnSala;
    }

    borrarPersona( id ){ 

        let personaBorrada = this.getPersonaById(id);

        // Aqui le asignamos al arreglo de personas todas las personas que estaban menos la del id obtenido como parametro
        this.personas = this.personas.filter( personaEncontrada => personaEncontrada.id != id ); 

        return personaBorrada;
    }


}

module.exports = { 
    Usuarios
}