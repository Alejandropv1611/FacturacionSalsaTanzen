
// Funcion de modificacion de texto en el checkbox
function cambiarTexto(checkbox) {
    var label = checkbox.parentNode.querySelector('label');

    if (checkbox.checked) {
      label.textContent = "Asistió";
    } else {
      label.textContent = "No asistió";
    }
  }

  function marcarTodos() {
    var checkboxes = document.querySelectorAll('.checkbox-asistencia');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = true;
      cambiarTexto(checkbox);
    });
  }

  function desmarcarTodos() {
    var checkboxes = document.querySelectorAll('.checkbox-asistencia');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
      cambiarTexto(checkbox);
    });
  }