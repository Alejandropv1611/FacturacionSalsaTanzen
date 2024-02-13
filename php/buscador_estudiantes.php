<?php
session_start();

// Verificar si se han proporcionado los datos necesarios
if (isset($_POST['lugar']) && isset($_POST['dia']) && isset($_POST['hora'])) {
    $lugarSeleccionado = $_POST['lugar'];
    $diaSeleccionado = $_POST['dia'];
    $horaSeleccionada = $_POST['hora'];

    // Conectar a la base de datos (ajusta las credenciales según tu configuración)
    $servername = "localhost:3306";
    $username = "root";
    $password = "";
    $dbname = "salsatan_facturacion";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Consulta para buscar estudiantes
        $queryEstudiantes = "SELECT estudiantes.*
                             FROM estudiantes
                             JOIN cursos c ON estudiantes.cursos_id = c.id
                             WHERE c.lugar = :lugar
                               AND c.dia = :dia
                               AND c.hora = :hora";

        // Preparar y ejecutar la consulta
        $stmt = $conn->prepare($queryEstudiantes);
        $stmt->bindParam(':lugar', $lugarSeleccionado);
        $stmt->bindParam(':dia', $diaSeleccionado);
        $stmt->bindParam(':hora', $horaSeleccionada);
        $stmt->execute();

        // Obtener resultados como array asociativo
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Devolver resultados como JSON
        echo json_encode($resultados);
    } catch (PDOException $e) {
        // Manejar errores de conexión o consulta
        echo json_encode(['error' => 'Error de conexión o consulta']);
    } finally {
        // Cerrar la conexión
        $conn = null;
    }
} else {
    // Si no se proporcionaron los datos necesarios
    echo json_encode(['error' => 'Datos insuficientes']);
}
?>
