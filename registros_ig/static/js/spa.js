peticion_todos = new XMLHttpRequest()
peticion_alta = new XMLHttpRequest()

function peticion_todos_handler() {
    if (this.readyState === 4) {
        if (this.status === 200) {
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


function peticion_alta_handler() {
    if (this.readyState === 4) {
        if (this.status === 201) {
            peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true)
            peticion_todos.onload = peticion_todos_handler
            peticion_todos.onerror = function() { alert("No se ha podido completar la petición de movimientos")}
            peticion_todos.send()
        } else {
            alert("Se ha producido un error en el alta de movimientos")
        }
    }
}

function altaMovimiento(ev) {
    ev.preventDefault()

    const date = document.querySelector("#date").value
    const concept = document.querySelector("#concept").value
    const quantity = document.querySelector("#quantity").value

    if (concept === "") {
        alert("Debes informar el concepto")
        return
    }

    if (quantity == 0 || quantity === "") {
        alert("Debes informar una cantidad positiva o negativa")
        return
    }

    const hoy = new Date().toISOString().split('T')[0]
    if (!date || date > hoy) {
        alert("Debes informar una fecha menor o igual que hoy")
        return
    }

    peticion_alta.open("POST", "http://localhost:5000/api/v1.0/new", true)
    peticion_alta.onload = peticion_alta_handler
    peticion_alta.onerror = function() { alert("No se ha podido completar la petición de movimientos")}
    peticion_alta.setRequestHeader("Content-Type", "application/json")

    const data_json = JSON.stringify({date: date, concept: concept, quantity: quantity})
    peticion_alta.send(data_json)


}

window.onload = function() {
    peticion_todos.open("GET", "http://localhost:5000/api/v1.0/all", true)
    peticion_todos.onload = peticion_todos_handler
    peticion_todos.onerror = function() { alert("No se ha podido completar la petición de movimientos")}
    peticion_todos.send()


    document.querySelector("#btn_crear").addEventListener("click", 
        function(ev) {
            ev.preventDefault()
            document.querySelector("#movement_detail").classList.remove("inactive")
        }
    )

    document.querySelector("#btn_cerrar").onclick = function(ev) {
        ev.preventDefault()
        document.querySelector("#movement_detail").classList.add("inactive")
    }

    document.querySelector("#btn_aceptar").onclick = altaMovimiento
}
