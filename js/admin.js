// JavaScript para manejar el modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("add-student-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

function cerrarModal() {
    modal.style.display = "none";
}

span.onclick = function() {
    cerrarModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}

function guardarEstudiante() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var rol = document.getElementById("rol").value;

    // Aquí puedes realizar alguna acción con los valores (por ejemplo, enviarlos al servidor)
    
    cerrarModal();
}
