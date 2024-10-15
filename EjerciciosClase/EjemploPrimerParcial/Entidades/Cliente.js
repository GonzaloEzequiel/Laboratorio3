import Persona from "./Persona.js"

class Cliente extends Persona {

    compras;
    telefono;

    constructor(id, nombre, apellido, edad, compras, telefono) {

        if(
            (compras !== null && compras > 0) &&
            telefono !== null
        ) {

            super(id, nombre, apellido, edad)
            this.compras = compras;
            this.telefono = telefono;

        }        
    }
}

export default Cliente;