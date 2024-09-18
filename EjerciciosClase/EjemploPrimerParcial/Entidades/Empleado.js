import Persona from "./Persona.js"

export class Empleado extends Persona {

    sueldo;
    ventas;

    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad)
        this.sueldo = sueldo;
        this.ventas = ventas;
    }

}