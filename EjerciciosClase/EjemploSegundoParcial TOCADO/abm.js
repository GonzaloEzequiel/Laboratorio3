import Cliente from "./Entidades/Cliente.js";
import Empleado from "./Entidades/Empleado.js";

// ELEMENTOS PRINCIPALES
var frm_LST = document.getElementById("formLista");
var frm_ABM = document.getElementById("formABM");
var spinner = document.getElementById("spinner");

// LISTA EN MEMORIA
var personas;

// BOTON PRINCIPAL ALTA
var btnAgregar = document.getElementById("btn_agregar");
btnAgregar.addEventListener("click", () => { MostrarABM(personas) });


// ELEMTNOS FORM ABM
// titulo
var titulo_operacion = document.getElementById("operacion_ABM");
// atributo ID
var frm_id = document.getElementById("frm_id");
// atributo NOMBRE
var frm_nombre = document.getElementById("frm_nombre");
// atributo APELLIDO
var frm_apellido = document.getElementById("frm_apellido");
// atributo EDAD
var frm_edad = document.getElementById("frm_edad");
// desplegable tipo
var frm_tipo = document.getElementById("frm_tipo");
// comportamiento al cambiar
frm_tipo.addEventListener("change", (e) => {   
    e.preventDefault();                     
    if(frm_tipo.value == "Empleado") {

        lblAtr3.textContent = "Ventas: ";
        lblAtr4.textContent = "Sueldo: ";
    }
    else{

        lblAtr3.textContent = "Compras: ";
        lblAtr4.textContent = "Telefono: ";
    }
});
// atributo 3
// label 
var lblAtr3 = document.getElementById("lbl_atr3"); 
// atributo
var frm_atr3 = document.getElementById("frm_atr3");
// atributo 4
// label
var lblAtr4 = document.getElementById("lbl_atr4");
// atributo
var frm_atr4 = document.getElementById("frm_atr4");
// botones gestion
// aceptar
var btn_aceptar = document.getElementById("btn_aceptar");
// cancelar
var btn_cancelar = document.getElementById("btn_cancelar");
btn_cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    MostrarDatos(personas);
})


function Main(){     

    
    let personasJSON;

    /**
     *  XMLHTTPREQUEST
     */
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        bloqueaLaPantalla("Cargando datos iniciales ...")

        if (xhttp.readyState == 4) {
            if (xhttp.status==200){

                personasJSON = JSON.parse(xhttp.response);
            
                personas = personasJSON.map( (persona) => {

                    if(persona.hasOwnProperty("sueldo")){
                        return new Empleado(persona.id, persona.nombre, persona.apellido, persona.edad, persona.sueldo, persona.ventas);                  
                    }
                    else if(persona.hasOwnProperty("compras")) {
                        return new Cliente(persona.id, persona.nombre, persona.apellido, persona.edad, persona.compras, persona.telefono);
                    }

                });

                DibujarTabla(personas);                
                desbloqueaLaPantalla();
            
            }else{
                alert("Error al cargar los datos iniciales");
            }
        }        
        
    }; 
    xhttp.open("GET", `http://localhost/LABO2P_PersonasEmpleadosClientes.php`); 
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(); 
    // SPINNER BLOQUEA DURANTE EL PROCESO OK!!
    
}

/**
 *  Dibuja la tabla con todos los valores que recibe (3)
 */
function DibujarTabla(array){

    let tabla = document.getElementById("tabla_cuerpo");
    let auxFila;
    let auxCelda;
    let auxBoton;
    
    BorrarTabla();

    array.forEach(pers => {

        if(pers instanceof Empleado || pers instanceof Cliente) {

            auxFila = document.createElement("tr");
            auxFila.setAttribute("idElemento", pers.id);

            // CELDA ID
            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.id));
            auxFila.appendChild(auxCelda);
            // CELDA NOMBRE
            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.nombre));
            auxFila.appendChild(auxCelda);
            // CELDA APELLIDO
            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.apellido));
            auxFila.appendChild(auxCelda);
            // CELDA EDAD
            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.edad));
            auxFila.appendChild(auxCelda);
            // CELDA VENTAS
            auxCelda = document.createElement("td");
            if(pers instanceof Empleado) {
                auxCelda.appendChild(document.createTextNode(pers.ventas));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);
            // CELDA SUELDO
            auxCelda = document.createElement("td");
            if(pers instanceof Empleado) {
                auxCelda.appendChild(document.createTextNode(pers.sueldo));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);
            // CELDA COMPRAS
            auxCelda = document.createElement("td");
            if(pers instanceof Cliente) {
                auxCelda.appendChild(document.createTextNode(pers.compras));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);
            // CELDA TELEFONO
            auxCelda = document.createElement("td");
            if(pers instanceof Cliente) {
                auxCelda.appendChild(document.createTextNode(pers.telefono));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);

            // CELDA MODIFICAR
            auxCelda = document.createElement("td");
            auxBoton = document.createElement("button");
            auxBoton.appendChild(document.createTextNode("Modificar"));
            auxBoton.setAttribute("id", "modificar_"+pers.id);
            auxBoton.addEventListener("click", () => { MostrarABM(pers) })
            auxCelda.appendChild(auxBoton);
            auxFila.appendChild(auxCelda);

            // CELDA ELIMINAR
            auxCelda = document.createElement("td");
            auxBoton = document.createElement("button");
            auxBoton.appendChild(document.createTextNode("Eliminar"));
            auxBoton.setAttribute("id", "eliminar_"+pers.id);
            auxBoton.addEventListener("click", () => { MostrarABM(pers) })
            auxCelda.appendChild(auxBoton);
            auxFila.appendChild(auxCelda);

            tabla.appendChild(auxFila);
        }
    });
}

function MostrarABM(persona) {

    event.preventDefault();

    // 1 ocultar FRM lista
    frm_LST.style.display = "none";
    // 2 mostrar FRM abm
    frm_ABM.style.display = "block";

    // 3 Casos de gestion
    // CASO ALTA USUARIO
    if(event.currentTarget.id == "btn_agregar") {

        titulo_operacion.textContent = "Alta nuevo Usuario";
        frm_id.value = "Autogenerado";
        frm_nombre.value = null;
        frm_apellido.value = null;
        frm_edad.value = null;
        frm_tipo.value = "";
        frm_atr3.value = null;
        frm_atr4.value = null;

        // 2 se validan los datos ingresados !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        btn_aceptar.addEventListener("click", altaUsuario);
    }
    else {

        frm_id.value = persona.id;
        frm_nombre.value = persona.nombre;
        frm_apellido.value = persona.apellido;
        frm_edad.value = persona.edad;

        if(persona instanceof Empleado) {
            frm_tipo.value = "Empleado";
            lblAtr3.textContent = "Ventas: ";
            lblAtr4.textContent = "Sueldo: ";
            frm_atr3.value = persona.ventas;
            frm_atr4.value = persona.sueldo;   
        }
        else {
            frm_tipo.value = "Cliente";
            lblAtr3.textContent = "Compras: ";
            lblAtr4.textContent = "Telefono: ";
            frm_atr3.value = persona.compras;
            frm_atr4.value = persona.telefono;   
        }

        // CASO MODIF USUARIO
        if(event.currentTarget.id.startsWith("modificar")) {

            titulo_operacion.textContent = "Modificar Usuario";
            btn_aceptar.addEventListener("click", () => { modificarUsuario(persona); });
    
        }
        // CASO BAJA USUARIO
        else if(event.currentTarget.id.startsWith("eliminar")) {

            titulo_operacion.textContent = "Eliminar Usuario";
            btn_aceptar.addEventListener("click", () => { eliminarUsuario(persona); });
        } 
    }
}

function MostrarDatos(array) {

    frm_ABM.style.display = "none";
    frm_LST.style.display = "block";

    BorrarTabla();
    DibujarTabla(array);

}

function BorrarTabla() {
    let tabla = document.getElementById("tabla_cuerpo");
    while(tabla.hasChildNodes()) {
        tabla.removeChild(tabla.lastChild);
    }
}

function bloqueaLaPantalla(titulo) {
    let mensaje = document.getElementById("titulo_spinner");
    mensaje.textContent = titulo;
    spinner.style.display = 'flex';
}

function desbloqueaLaPantalla() {
    spinner.style.display = 'none';
}


/**
 * Crea un Nuevo usuario obteniendo un ID por PUT al servidor, y lo crea
 * 
 *  FETCH SIN AWAIT
 * 
 */
function altaUsuario() {
    
    bloqueaLaPantalla("Creando nuevo Usuario ...");

    let length = personas.length;        
    let auxPersonaJson =`{
                        "nombre":"${frm_nombre.value}",
                        "apellido":"${frm_apellido.value}",
                        "edad":"${frm_edad.value}",
                        "${lblAtr3.textContent.slice(0,-2).toLowerCase()}":"${frm_atr3.value}",
                        "${lblAtr4.textContent.slice(0,-2).toLowerCase()}":"${frm_atr4.value}"
                    }`;

    fetch("http://localhost/LABO2P_PersonasEmpleadosClientes.php", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: auxPersonaJson,
    })
    .then( response => response.json() )
    .then( data => {

        frm_id.value = data.id;

        if(frm_tipo.value == "Empleado")
        {
            try {
                let auxEmpleado = new Empleado(frm_id.value, frm_nombre.value, frm_apellido.value, frm_edad.value, frm_atr3.value, frm_atr4.value);
                personas.push(auxEmpleado);
            }
            catch(error) {
                alert(error);
            }
            
        }
        else if((frm_tipo.value=="Cliente"))
        {
            try {
                let auxCliente = new Cliente(frm_id.value, frm_nombre.value, frm_apellido.value, frm_edad.value, frm_atr3.value, frm_atr4.value);
                personas.push(auxCliente);
            }
            catch(error) {
                alert(error);
            }                   
        }

    })
    .then( () => {

        if(personas.length > length) {
            MostrarDatos(personas);
        }

        desbloqueaLaPantalla();
    })
    .catch( error  => {
        alert(error);
        desbloqueaLaPantalla();
    });    
}

async function modificarUsuario(usuario) {

    bloqueaLaPantalla("Modificando Usuario ...");

    let length = personas.length;        
    let auxPersonaJson =`{
                        "id":"${frm_id.value}",
                        "nombre":"${frm_nombre.value}",
                        "apellido":"${frm_apellido.value}",
                        "edad":"${frm_edad.value}",
                        "${lblAtr3.textContent.slice(0,-2).toLowerCase()}":"${frm_atr3.value}",
                        "${lblAtr4.textContent.slice(0,-2).toLowerCase()}":"${frm_atr4.value}"
                    }`;

    await fetch("http://localhost/LABO2P_PersonasEmpleadosClientes.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: auxPersonaJson,
    })
    .then(response => {

        if(response.status == 200) {

            usuario.nombre = frm_nombre.value;
            usuario.apellido = frm_apellido.value;
            usuario.edad = frm_edad.value;
            usuario[lblAtr3.textContent.slice(0,-2).toLocaleLowerCase()] = frm_atr3.value;
            usuario[lblAtr4.textContent.slice(0,-2).toLocaleLowerCase()] = frm_atr4.value;

            MostrarDatos(personas);
            desbloqueaLaPantalla();
        }
        else {
            throw new Error(response);
        }
        
    })
    .catch(error  => {
        alert("No se pudo modificar el Usuario. " + error);

        MostrarDatos(personas);
        desbloqueaLaPantalla();
    });
}

function eliminarUsuario(usuario) {

    bloqueaLaPantalla("Eliminando  Usuario ...");

    let promesa = new Promise( (resolve, reject) => {

        let respuesta = fetch("http://localhost/LABO2P_PersonasEmpleadosClientes.php", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: `{"id":"${usuario.id}"}`,
        })

    })

    promesa.then(() => {

        let indice = personas.findIndex( user => user.id == frm_id.value );
        personas.splice(indice, 1);

        MostrarDatos(personas);
        desbloqueaLaPantalla();
        
    })
    .catch(error => {
        alert("No se pudo eliminar el Usuario. "+ error);

        MostrarDatos(personas);
        desbloqueaLaPantalla(); 
    })
}

window.addEventListener("load", Main);