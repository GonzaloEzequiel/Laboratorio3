import Persona from "./Persona.js"

class Empleado extends Persona {

    sueldo;
    ventas;

    /*
    setSueldo (value) {
        if(value != null && value > 0) {
            this.sueldo = value;
        }else {
            throw new Error("Sueldo inválido");
        }
    }
    setVentas (value) {
        if(value != null && value > 0) {
            this.sueldo = value;
        }else {
            throw new Error("Cantidad de Ventas inválida");
        }
    }

    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = this.setSueldo(sueldo);
        this.ventas = this.setVentas(ventas);
    }
    */

    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }
}

export default Empleado;