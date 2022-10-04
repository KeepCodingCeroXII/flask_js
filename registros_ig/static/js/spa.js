peticion_todos = new XMLHttpRequest()

function peticion_todos_handler() {
    if (this.readyState === 4) {
        if (this.status === 200) {
            alert(this.responseText)
            //TODO: Procesar el responseText, transformalo en un objeto(diccionario) de javascript
            //      y transformarlo en filas de la tabla

            los_datos = JSON.parse(this.responseText)







            
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
