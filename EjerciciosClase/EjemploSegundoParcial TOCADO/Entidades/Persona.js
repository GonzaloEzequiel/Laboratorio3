class Persona {

    id;
    nombre;
    apellido;
    edad;

    /*
    setId (value) {
        if(value != null) {
            this.id = value;
        } else {
            throw new Error("Id inválido");
        }
    }
    setNombre (value) {
        if(value != null) {
            this.nombre = value;
        } else {
            throw new Error("Ingrese un nombre");
        }
    }
    setApellido (value) {
        if(value != null) {
            this.apellido = value;
        } else {
            throw new Error("Ingrese un apellido");
        }
    }
    setEdad (value) {
        if(value > 15) {
            this.edad = value;
        } else {
            throw new Error("Edad inválida");
        }
    }

    constructor(id, nombre, apellido, edad) {
        this.id = this.setId(id);
        this.nombre = this.setNombre(nombre);
        this.apellido = this.setApellido(apellido);
        this.edad = this.setEdad(edad);
    }
    */

    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {
        return JSON.stringify(this);
    }

    toJson() {
        return this.json();
    }
}

export default Persona;