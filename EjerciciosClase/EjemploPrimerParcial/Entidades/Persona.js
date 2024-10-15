class Persona {

    id;
    nombre;
    apellido;
    edad;

    constructor(id, nombre, apellido, edad) {

        if(     
            id !== null && 
            nombre !== null && 
            apellido !== null && 
            edad > 15
            ) {

            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            
        }        
    }

    toString() {
        return JSON.stringify(this);
    }

    toJson () {
        return JSON.parse(this);
    }
}

export default Persona;