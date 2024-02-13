<?php
session_start();

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "salsatan_facturacion";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener opciones para el select de lugares
$queryLugares = "SELECT DISTINCT lugar FROM cursos";
$resultLugares = $conn->query($queryLugares);
$optionsLugar = obtenerColumna($resultLugares, 'lugar');

// Obtener opciones para el select de días
$queryDias = "SELECT DISTINCT dia FROM cursos";
$resultDias = $conn->query($queryDias);
$optionsDia = obtenerColumna($resultDias, 'dia');

// Obtener opciones para el select de horas
$queryHoras = "SELECT DISTINCT hora FROM cursos";
$resultHoras = $conn->query($queryHoras);
$optionsHora = obtenerColumna($resultHoras, 'hora');

$conn->close();

// Configurar el encabezado para indicar que estamos enviando datos JSON
header('Content-Type: application/json');

// Devolver los resultados como un único objeto JSON
echo json_encode([
    'optionsLugar' => $optionsLugar,
    'optionsDia' => $optionsDia,
    'optionsHora' => $optionsHora
]);

// Función para obtener una columna específica de los resultados de una consulta
function obtenerColumna($result, $columna) {
    $columnaArray = array();
    while ($row = $result->fetch_assoc()) {
        $columnaArray[] = $row[$columna];
    }
    return $columnaArray;
}
?>
