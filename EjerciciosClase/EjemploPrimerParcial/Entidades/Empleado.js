import Persona from "./Persona.js"

class Empleado extends Persona {

    sueldo;
    ventas;

    constructor(id, nombre, apellido, edad, sueldo, ventas) {

        if(
            (sueldo !== null && sueldo >= 0) && 
            (ventas !== null && ventas >= 0)
        ) {

            super(id, nombre, apellido, edad)
            this.sueldo = sueldo;
            this.ventas = ventas;
        }        
    }
}

export default Empleado;