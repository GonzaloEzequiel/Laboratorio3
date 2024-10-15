function main() {

    let personasString = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "compras":7000, "telefono":"1813181563"}]';
    let personasArray = JSON.parse(personasString);        
    var personas = personasArray.map( (persona) => {
        if(persona.hasOwnProperty("sueldo")){
            return new Empleado(persona.id, persona.nombre, persona.apellido, persona.edad, persona.sueldo, persona.ventas);
        }
        else if(persona.hasOwnProperty("compras")) {
            return new Cliente(persona.id, persona.nombre, persona.apellido, persona.edad, persona.compras, persona.telefono);
        }
    });

    DibujarTabla(personas);        

    let btnCalcular = document.getElementById("btn_calcular");
    btnCalcular.addEventListener("click", () => {
        let seleccion = MostrarSeleccion(personas);
        let acum = seleccion.reduce( (acumulador, persona) => { return acumulador + persona.edad; }, 0);
        let promedio = acum / seleccion.length;
        let displayPromedio = document.getElementById("txt_edadPromedio");
        displayPromedio.value = promedio;
    });

    document.getElementById('chk_id').addEventListener('change', () => {
        let column = document.querySelectorAll('.col-nombre');
        column.forEach(celda => {
        celda.style.display = event.target.checked ? '' : 'none';
        });
    });

    

    document.getElementById("orden_id").addEventListener("click", (e) => { e.preventDefault(); ordernarId(personas); });
    document.getElementById("orden_nombre").addEventListener("click", (e) => { e.preventDefault(); ordernarNombre(personas); });
    document.getElementById("orden_apellido").addEventListener("click", (e) => { e.preventDefault(); ordernarApellido(personas); });
    document.getElementById("orden_edad").addEventListener("click", (e) => { e.preventDefault(); ordernarEdad(personas); });
    document.getElementById("orden_sueldo").addEventListener("click", (e) => { e.preventDefault(); ordernarSueldo(personas); });
    document.getElementById("orden_ventas").addEventListener("click", (e) => { e.preventDefault(); ordernarVentas(personas); });
    document.getElementById("orden_compras").addEventListener("click", (e) => { e.preventDefault(); ordernarCompras(personas); });
    document.getElementById("orden_telefono").addEventListener("click", (e) => { e.preventDefault(); ordernarTelefono(personas); });


    let btnAgregar = document.getElementById("btn_agregar");
    btnAgregar.addEventListener("click", () => { personas = MostrarABM(null, personas); });

    let selector = document.getElementById("sl_tipo");
    selector.addEventListener("change", () => { MostrarSeleccion(personas); });
}


function ordernarId(array) {
    MostrarDatos(array.sort((a, b)=>{ a.id > b.id}));
}

function ordernarNombre(array) {
    MostrarDatos(filter( array.sort( (a,b)=>{a.nombre>b.nombre}, false )));
}

function ordernarApellido() {
    DibujarTabla(filter(array.sort((a, b)=>{ a.apellido > b.apellido })));
}

function ordernarEdad() {
    DibujarTabla(filter(array.sort((a, b)=>{a.edad > b.edad})));
}

function ordernarSueldo() {
    DibujarTabla(filter(array.sort((a, b)=>{a.sueldo > b.sueldo})));
}

function ordernarVentas() {
    DibujarTabla(filter(array.sort((a, b)=>{a.ventas > b.ventas})));
}

function ordernarCompras() {
    DibujarTabla(filter(array.sort((a, b)=>{a.compras > b.compras})));
}

function ordernarTelefono() {
    DibujarTabla(filter(array.sort((a, b)=>{a.telefono > b.telefono})));
}

function MostrarSeleccion(array) {

    console.log(array);

    let auxSelector = document.getElementById("sl_tipo");

    let seleccion = array.filter( (p) => {          

        if(
            (auxSelector.value == "1" && p instanceof Empleado) ||
            (auxSelector.value == "2" && p instanceof Cliente) ||
            (auxSelector.value == "0")
        ) {
            return true;
        }
        
    } );
    
    BorrarTabla();
    DibujarTabla(seleccion);
    return seleccion;
}

function DibujarTabla(array){
    
    let tabla = document.getElementById("tabla_cuerpo");
    let auxFila;
    let auxCelda;

    array.forEach(persona => {

        if(persona instanceof Empleado || persona instanceof Cliente) {

            auxFila = document.createElement("tr");
            auxFila.setAttribute("idElemento", persona.id);

            auxFila.addEventListener("dblclick", (e)=> {
                let filaClickeada = e.target.parentElement;
                let idClick = filaClickeada.getAttribute("idElemento");
                let personaModificar = array.find(persona => persona.id == idClick);
                MostrarABM(personaModificar, array);
            });

            if(document.getElementById("chk_id").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(persona.id.toString()));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_nombre").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(persona.nombre.toString()));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_apellido").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(persona.apellido.toString()));
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_edad").checked) {
                auxCelda = document.createElement("td");
                auxCelda.appendChild(document.createTextNode(persona.edad.toString()));
                auxFila.appendChild(auxCelda);
            }
            
            if(document.getElementById("chk_sueldo").checked) {
                auxCelda = document.createElement("td");
                if(persona instanceof Empleado) {
                    auxCelda.appendChild(document.createTextNode(persona.sueldo.toString()));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_ventas").checked) {
                auxCelda = document.createElement("td");
                if(persona instanceof Empleado) {
                    auxCelda.appendChild(document.createTextNode(persona.ventas.toString()));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_compras").checked) {
                auxCelda = document.createElement("td");
                if(persona instanceof Cliente) {
                    auxCelda.appendChild(document.createTextNode(persona.compras.toString()));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            if(document.getElementById("chk_telefono").checked) {
                auxCelda = document.createElement("td");
                if(persona instanceof Cliente) {
                    auxCelda.appendChild(document.createTextNode(persona.telefono.toString()));
                }
                else{
                    auxCelda.appendChild(document.createTextNode("N/A"));
                }
                auxFila.appendChild(auxCelda);
            }

            tabla.appendChild(auxFila);
        }

    });
}

function BorrarTabla() {
    let tabla = document.getElementById("tabla_cuerpo");
    while(tabla.hasChildNodes()) {
        tabla.removeChild(tabla.lastChild);
    }
}

function MostrarABM(persona, array) {

    console.log(persona);
    console.log(array);

    let frmDatos = document.getElementById("formDatos");
    let frmABM = document.getElementById("formABM");
    frmDatos.style.display = "none";
    frmABM.style.display = "block";

    let lblAtr3 = document.getElementById("lbl_atr3");
    let lblAtr4 = document.getElementById("lbl_atr4");

    let btnAceptar = document.getElementById("btn_aceptar"); 
    let btnCancelar = document.getElementById("btn_cancelar");

    let frm_tipo = document.getElementById("frm_tipo");
    frm_tipo.addEventListener("change", (e) => {                        
        if(frm_tipo.value === "Empleado") {

            lblAtr3.textContent = "Sueldo: ";
            lblAtr4.textContent = "Ventas: ";
        }
        else{

            lblAtr3.textContent = "Compras: ";
            lblAtr4.textContent = "Telefono: ";
        }
    });

    let form = btnAceptar.parentElement;
    var btnEliminar = document.createElement("input");
    btnEliminar.type="button";
    btnEliminar.value = "Eliminar";
    form.appendChild(btnEliminar);
    btnEliminar.style.display = "none";        
    
    if(persona instanceof Empleado || persona instanceof Cliente) {

        let frm_id = document.getElementById("frm_id");
        frm_id.value = persona.id.toString();
        frm_id.disabled = "true";

        let frm_nombre = document.getElementById("frm_nombre");
        frm_nombre.value = persona.nombre.toString();

        let frm_apellido = document.getElementById("frm_apellido");
        frm_apellido.value = persona.apellido.toString();

        let frm_edad = document.getElementById("frm_edad");
        frm_edad.value = persona.edad.toString();

        frm_tipo.disabled = true;            

        if(persona instanceof Empleado) {
            frm_tipo.value = "Empleado";

            let frm_atr3 = document.getElementById("frm_atr3");
            frm_atr3.parentElement.value = "Sueldo: ";
            frm_atr3.value = persona.sueldo.toString();

            let frm_atr4 = document.getElementById("frm_atr4");
            frm_atr4.parentElement.value = "Ventas: ";
            frm_atr4.value = persona.ventas.toString();
        }
        else if(persona instanceof Cliente) {
            frm_tipo.value = "Cliente";

            let frm_atr3 = document.getElementById("frm_atr3");
            frm_atr3.parentElement.value = "Compras: ";
            frm_atr3.value = persona.compras.toString();

            let frm_atr4 = document.getElementById("frm_atr4");
            frm_atr4.parentElement.value = "Telefono: ";
            frm_atr4.value = persona.telefono.toString();
        }
        
        btnAceptar.value="Modificar";
        btnEliminar.style.display="inline";

        btnAceptar.addEventListener("click", () => {
            
            persona.nombre = frm_nombre.value.toString();
            persona.apellido = frm_apellido.value.toString();
            persona.edad = frm_edad.value.toString();
            if(persona instanceof Empleado) {
                persona.sueldo = frm_atr3.value.toString();
                persona.ventas = frm_atr4.value.toString();
            }
            else if(persona instanceof Cliente) {
                persona.compras = frm_atr3.value.toString();
                persona.telefono = frm_atr4.value.toString();
            }
            MostrarDatos(array); 

        });

        btnEliminar.addEventListener("click", ()=>{
            array = array.filter(p => p.id != frm_id.value);
            MostrarDatos(array);
        });

        btnCancelar.addEventListener("click", (e)=>{
            MostrarDatos(array);
            btnEliminar.parentElement.removeChild(btnEliminar);
        });
        
    }
    else
    { 
        console.log("Nueva Persona: ");
        let auxPersona;

        frm_id.disabled = true;
        let maxIDActual = array.reduce((maxID, p) => { let retorno = p.id > maxID ? p.id : maxID; return retorno;}, 0);
        frm_id.value = parseInt(maxIDActual) + 1;
        frm_nombre.value = null;
        frm_apellido.value = null;
        frm_edad.value = null;
        frm_tipo.disabled = false;
        frm_atr3.value = null;
        frm_atr4.value = null;
        btnAceptar.value="Aceptar";

        btnAceptar.addEventListener("click", () => {

            if(
                (frm_nombre.value != null && isNaN(frm_nombre.value)) &&
                (frm_apellido.value != null && isNaN(frm_apellido.value)) &&
                (frm_edad.value != null && !isNaN(frm_edad.value)) &&
                (frm_atr3.value != null && !isNaN(frm_atr3.value)) &&
                (frm_atr4.value != null && !isNaN(frm_atr4.value))
            )
            {
                if(frm_tipo.value == "Empleado")
                {
                    console.log("Empleado!");
                    auxPersona = new Empleado(frm_id.value.toString(), frm_nombre.value.toString(), frm_apellido.value.toString(), frm_edad.value.toString(), frm_atr3.value.toString(), frm_atr4.value.toString());
                }
                else if((frm_tipo.value=="Cliente"))
                {
                    console.log("Cliente!");
                    auxPersona = new Cliente(frm_id.value.toString(), frm_nombre.value.toString(), frm_apellido.value.toString(), frm_edad.value.toString(), frm_atr3.value.toString(), frm_atr4.value.toString());
                } 
                
                array.push(auxPersona.toString());
                console.log(auxPersona);
                console.log(array);
            }
            
            MostrarDatos(array);
        });   
        
        btnCancelar.addEventListener("click", (e)=>{

            MostrarDatos(array);
        });

        
    }       
    
}

function MostrarDatos(array) {

    console.log(array);

    let frmDatos = document.getElementById("formDatos");
    let frmABM = document.getElementById("formABM");

    frmABM.style.display = "none";
    frmDatos.style.display = "block";
    
    BorrarTabla();
    DibujarTabla(array);
}


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


window.addEventListener("load", main);