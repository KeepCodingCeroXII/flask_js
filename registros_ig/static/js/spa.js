peticion_todos = new XMLHttpRequest()

function peticion_todos_handler() {
    if (this.readyState === 4) {
        if (this.status === 200) {
            alert(this.responseText)
            //TODO: Procesar el responseText, transformalo en un objeto(diccionario) de javascript
            //      y transformarlo en filas de la tabla

            const los_datos = JSON.parse(this.responseText)
            const la_tabla = document.querySelector("#movements_table")
            const movimientos = los_datos.data

            for (let i=0; i < movimientos.length; i++) {
                item = movimientos[i]
                const trow = document.createElement("tr")
  
                const tddate = document.createElement("td")
                const tdconcept = document.createElement("td")
                const tdquantity = document.createElement("td")
  
                tddate.innerHTML = item.date
                tdconcept.innerHTML = item.concept
                tdquantity.innerHTML = item.quantity
  
                trow.appendChild(tddate)
                trow.appendChild(tdconcept)
                trow.appendChild(tdquantity)
                la_tabla.appendChild(trow)
            }


            
        } else {
            alert("Se ha producido un error en la consulta de movimientos")
        }
    }
}

window.onload = function() {
    peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true)
    peticion_todos.onload = peticion_todos_handler
    peticion_todos.onerror = function() { alert("No se ha podido completar la petición de movimientos")}
    peticion_todos.send()
}
