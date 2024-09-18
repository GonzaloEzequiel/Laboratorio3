import Persona from "./Persona.js"

export class Cliente extends Persona {

    compras;
    telefono;

    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad)
        this.compras = compras;
        this.telefono = telefono;
    }
}