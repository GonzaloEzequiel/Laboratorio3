import Cliente from "./Entidades/Cliente.js";
import Empleado from "./Entidades/Empleado.js";

function Main(){ 

    var spinner = document.getElementById("spinner");

    
    // ACA SE DEBEN CARGAR LAS PERSONSAS DESDE EL SERVIDOR !   (3)
    let personasJSON;
    var personas;

    var xhttp = new XMLHttpRequest();
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



    let btnAgregar = document.getElementById("btn_agregar");
    btnAgregar.addEventListener("click", () => { MostrarABM(personas) });  
    
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

            /*
            auxFila.addEventListener("dblclick", (e)=> {
                let filaClickeada = e.target.parentElement;
                let idClick = filaClickeada.getAttribute("idElemento");
                let personaSeleccionada = array.find(p => p.id == idClick);
                MostrarABM(array, personaSeleccionada);
            });
            */

            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.id));
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.nombre));
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.apellido));
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            auxCelda.appendChild(document.createTextNode(pers.edad));
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            if(pers instanceof Empleado) {
                auxCelda.appendChild(document.createTextNode(pers.ventas));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            if(pers instanceof Cliente) {
                auxCelda.appendChild(document.createTextNode(pers.compras));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            if(pers instanceof Empleado) {
                auxCelda.appendChild(document.createTextNode(pers.sueldo));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            if(pers instanceof Cliente) {
                auxCelda.appendChild(document.createTextNode(pers.telefono));
            }
            else{
                auxCelda.appendChild(document.createTextNode("N/A"));
            }
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            auxBoton = document.createElement("button");
            auxBoton.appendChild(document.createTextNode("Modificar"));
            auxBoton.setAttribute("idElemento", pers.id);
            auxBoton.addEventListener("click", MostrarABM(array, pers))
            auxCelda.appendChild(auxBoton);
            auxFila.appendChild(auxCelda);

            auxCelda = document.createElement("td");
            auxBoton = document.createElement("button");
            auxBoton.appendChild(document.createTextNode("Eliminar"));
            auxBoton.setAttribute("idElemento", pers.id);
            auxCelda.appendChild(auxBoton);
            auxFila.appendChild(auxCelda);

            tabla.appendChild(auxFila);
        }
    });
}

/**
 *  Cambia al formulario ABM ocultando el de lista
 */
function MostrarABM(array, persona) {

// Controles del nuevo formulario
    let frmLista = document.getElementById("formLista");
    let frmABM = document.getElementById("formABM");
    frmLista.style.display = "none";
    frmABM.style.display = "block";

    let operacion = document.getElementById("operacion_ABM");

    let lblAtr3 = document.getElementById("lbl_atr3");
    let lblAtr4 = document.getElementById("lbl_atr4");   

    let btnAceptar = document.getElementById("btn_aceptar");
    let btnCancelar = document.getElementById("btn_cancelar");

    let frm_tipo = document.getElementById("frm_tipo");
    frm_tipo.addEventListener("change", (e) => {                        
        if(frm_tipo.value == "Empleado") {

            lblAtr3.textContent = "Ventas: ";
            lblAtr4.textContent = "Sueldo: ";
        }
        else{

            lblAtr3.textContent = "Compras: ";
            lblAtr4.textContent = "Teléfono: ";
        }
    });

    let frm_id = document.getElementById("frm_id");
    let frm_nombre = document.getElementById("frm_nombre");
    let frm_apellido = document.getElementById("frm_apellido");
    let frm_edad = document.getElementById("frm_edad");
    let frm_atr3 = document.getElementById("frm_atr3");
    let frm_atr4 = document.getElementById("frm_atr4");

    let form = btnAceptar.parentElement;
    var btnEliminar = document.createElement("input");
    btnEliminar.type="button";
    btnEliminar.value = "Eliminar";
    form.appendChild(btnEliminar);
    btnEliminar.style.display = "none";
    
// Caso BAJA/MODIFICACION
    if(persona instanceof Empleado || persona instanceof Cliente) {            
        
        frm_id.value = persona.id;
        frm_id.disabled = true;
        frm_nombre.value = persona.nombre;
        frm_apellido.value = persona.apellido;            
        frm_edad.value = persona.edad;
        frm_tipo.disabled = true;

        if(persona instanceof Empleado) {
            frm_tipo.value = "Empleado";
            frm_atr3.value = persona.sueldo;
            frm_atr4.value = persona.ventas;
        }
        else if(persona instanceof Cliente) {
            frm_tipo.value = "Cliente";
            frm_atr3.value = persona.compras;
            frm_atr4.value = persona.telefono;
        }
        
        btnAceptar.value="Modificar";
        btnEliminar.style.display="inline";

        btnAceptar.addEventListener("click", () => {

            try {
                persona.setModelo(frm_nombre.value);
                persona.setAnoFab(frm_apellido.value);
                persona.setVelMax(frm_edad.value);
                if(persona instanceof Empleado) {
                    persona.setAltMax(frm_atr3.value);
                    persona.setAutonomia(frm_atr4.value);
                }
                else if(persona instanceof Cliente) {
                    persona.setCantPue(frm_atr3.value);
                    persona.setCantRue(frm_atr4.value);
                }
            }catch(error) {
                alert(error);
            }finally {
                if(btnEliminar)
                    form.removeChild(btnEliminar);
                MostrarDatos(array); 
            } 
        });

        btnEliminar.addEventListener("click", (e)=>{
            e.preventDefault();
            let indice = array.findIndex( v => v.id == frm_id.value);
            array.splice(indice, 1);
            form.removeChild(btnEliminar);
            MostrarDatos(array);
        });

        btnCancelar.addEventListener("click", (e)=>{
            e.preventDefault();
            form.removeChild(btnEliminar);
            MostrarDatos(array);                
        });
        
    }
// CASO ALTA
    else
    {
        operacion.textContent = "Alta nuevo Usuario";
        frm_id.disabled = true;
        frm_id.value = "Autogenerado";
        frm_tipo.disabled = false;
        btnAceptar.value = "Aceptar";
        
        frm_nombre.value = null;
        frm_apellido.value = null;
        frm_edad.value = null;
        frm_atr3.value = null;
        frm_atr4.value = null;

        btnAceptar.addEventListener("click", (e) => {

            let auxPersona =`{"nombre":"${frm_nombre.value}","apellido":"${frm_apellido.value}","edad":"${frm_edad.value}","ventas":"${frm_atr3.value}","sueldo":"${frm_atr4.value}"}`;

            console.log(frm_nombre.value);
            console.log(frm_apellido.value);
            console.log(frm_edad.value);
            console.log(frm_atr3.value);
            console.log(frm_atr4.value);

            console.log(auxPersona);

            bloqueaLaPantalla("Creando nuevo Usuario ...");

            try {

                let respuesta = fetch("http://localhost/LABO2P_PersonasEmpleadosClientes.php", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: auxPersona
                })

                if(respuesta.ok) {

                    let contenido = respuesta.json();
                    console.log(contenido);

                    // TESTING ZONE
                    let length = array.length;

                    if(frm_tipo.value == "Empleado")
                    {
                        try {
                            auxVehiculo = new Aereo(frm_id.value, frm_modelo.value, frm_anofab.value, frm_velmax.value, frm_atr3.value, frm_atr4.value);
                            array.push(auxVehiculo);
                        }
                        catch(error) {
                            alert(error);
                        }
                        
                    }
                    else if((frm_tipo.value=="Cliente"))
                    {
                        try {
                            auxVehiculo = new Terrestre(frm_id.value, frm_modelo.value, frm_anofab.value, frm_velmax.value, frm_atr3.value, frm_atr4.value);
                            array.push(auxVehiculo);
                        }
                        catch(error) {
                            alert(error);
                        }                   
                    }

                    if(array.length > length) {
                        MostrarDatos(array);
                    }
                    // TESTING ZONE

                }
                else {
                    let contenido = respuesta.json();
                    alert("Error al dar de alta al usuario" + contenido);
                }
            }
            catch(error) {
                alert(error);
            }

            desbloqueaLaPantalla();

        });
        
        btnCancelar.addEventListener("click", (e)=>{
            e.preventDefault();
            MostrarDatos(array);
        });
    }
}

function BorrarTabla() {
    let tabla = document.getElementById("tabla_cuerpo");
    while(tabla.hasChildNodes()) {
        tabla.removeChild(tabla.lastChild);
    }
}

function MostrarDatos(array) {

    let frmLista = document.getElementById("formLista");
    let frmABM = document.getElementById("formABM");

    frmABM.style.display = "none";
    frmLista.style.display = "block";

    BorrarTabla();
    DibujarTabla(array);
}

function bloqueaLaPantalla(titulo) {
    let mensaje = document.getElementById("titulo_spinner");
    mensaje.textContent = titulo;
    spinner.style.display = 'flex';
}

function desbloqueaLaPantalla() {
    spinner.style.display = 'none';
}

async function altaUsuario() {    

    
}

window.addEventListener("load", Main);