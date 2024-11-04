import Persona from "./Persona.js"

class Cliente extends Persona {

    compras;
    telefono;

    /*
    setCompras (value) {
        if(value != null && value > 0) {
            this.compras = value;
        } else {
            throw new Error("Cantidad de Compras inválida");
        }
    }
    setTelefono (value) {
        if(value != null) {
            this.telefono = value;
        } else {
            throw new Error("Teléfono inválido");
        }
    }

    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = this.setCompras(compras);
        this.telefono = this.setTelefono(telefono);
    }
    */

    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }
}

export default Cliente;