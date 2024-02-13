$(document).ready(function () {
    // Función para cargar opciones en un select
    function cargarOpciones(selectElement, data) {
        console.log('Cargando opciones:', data);

        // Limpiar opciones existentes en el select
        selectElement.empty();

        // Iterar sobre los datos y agregar opciones al select
        for (var i = 0; i < data.length; i++) {
            var option = $('<option>');
            // Utilizar la propiedad 'lugar', 'dia' o 'hora' según el contexto
            option.val(data[i].lugar || data[i].dia || data[i].hora);
            option.text(data[i].lugar || data[i].dia || data[i].hora);
            selectElement.append(option);
        }

        selectElement.trigger('change'); // Forzar la actualización visual del select
    }

    // Realizar solicitud AJAX para obtener datos del servidor
    $.ajax({
        url: "../php/buscador.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            // 'data' está definido aquí y se puede usar
            console.log('Datos del servidor:', data);

            // Obtener elementos select como objetos jQuery
            var selectLugar = $("#mi-lugar");
            var selectDia = $("#mi-dia");
            var selectHora = $("#mi-hora");

            // Cargar opciones en los select
            cargarOpciones(selectLugar, data.optionsLugar);
            cargarOpciones(selectDia, data.optionsDia);
            cargarOpciones(selectHora, data.optionsHora);
        },
        error: function (error) {
            console.error("Error al obtener datos del servidor:", error);
        },
    });

    // Manejador de eventos para el botón "Buscar"
    $("#search-btn").on("click", function () {
        // Obtener los valores seleccionados
        var lugarSeleccionado = $("#mi-lugar").val();
        var diaSeleccionado = $("#mi-dia").val();
        var horaSeleccionada = $("#mi-hora").val();

        // Realizar la búsqueda en la base de datos
        buscarEstudiantes(lugarSeleccionado, diaSeleccionado, horaSeleccionada);
    });

    // Función para buscar estudiantes en la base de datos
    function buscarEstudiantes(lugar, dia, hora) {
        // Realizar solicitud AJAX para obtener estudiantes
        $.ajax({
            url: "../php/buscador_estudiantes.php", // Reemplaza con la ruta correcta
            type: "POST", // Puedes usar POST para enviar los datos al servidor
            dataType: "json",
            data: {
                lugar: lugar,
                dia: dia,
                hora: hora
            },
            success: function (result) {
                // Manejar los resultados de la búsqueda
                console.log('Resultados de la búsqueda:', result);
                // Aquí puedes procesar los resultados y mostrarlos en la interfaz de usuario
            },
            error: function (error) {
                console.error("Error al buscar estudiantes:", error);
            },
        });
    }
});
