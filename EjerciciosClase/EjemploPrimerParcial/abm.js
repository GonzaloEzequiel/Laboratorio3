import Empleado from "./Entidades/Empleado.js";
import Cliente from "./Entidades/Cliente.js";

function main() {

    var string = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "ventas":15000, "sueldo":2000},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "ventas": 6000, "sueldo": 1000},{"id":3, "nombre":"Facundo","apellido":"Cairo", "edad":30, "ventas":500, "sueldo":15000},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "compras":8000, "telefono":"152111131"},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "compras":50000, "telefono":"42040077"},{"id":666, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "compras":7000, "telefono":"1813181563"}]';

    var a = JSON(a)//....
    var b = a.map(()=>{empleados/clientes});
    mostrar(lista);
    dibujar(b);

}

window.addEventListener("load", ()=>{});

function ordernarId() {
    DibujarTabla(filter(array.sort((a, b)=>{a.id > b.id})));
}



function DibujarTabla(array) {

    let a = array.filter((elemento) => {

        var sl_tipo = document.getElementById("sl_tipo");

        if(
            (sl_tipo.value=="1" && elemento instanceof Empleado) ||
            (sl_tipo.value=="2" && elemento instanceof Cliente) ||
            sl_tipo.value=="0"
        )
            {
                return true;
            }

        return false;

    });
    //// VACIAR TABLA

    

    a.forEach(element => {

        var fila = document.createElement("tr");

        if(document.getElementById("chk_id").checked) {
            let celda = document.createElement("td");
            if(element instanceof Empleado) {
                celda.appendChild(document.createTextNode(element.id.tostring()));
            }
            else {
                celda.appendChild(docment.createTextNode("N/A"));
            }
        }
        fila.appendChild(celda);

        /// RESTO DE LAS COLUMNAS

        fila.setAttribute(idElemento, element.id.tostring());

        fila.addEventListener("dblclick", (evento) => {
            var filaClickeada = evento.target;
            var idClick = filaClickeada.getAttribute("idElemento");
            array.find(x=>{x.id==idClick});

            ////// ocultar formulario lista
            ////// mostrar formulario abm
            ////// cargar datos en formulario abm
        });



        tabla.appendChild(fila);
    });

}

