<?php
session_start();

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "salsatan_facturacion";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];
$role = $_POST['role'];  // Agregamos la variable para el campo role


// Utiliza consultas preparadas para evitar inyecciones SQL
$stmt = $conn->prepare('SELECT * FROM salsatan_facturacion.salsatan_login WHERE email=? AND password=? AND role=?');
$stmt->bind_param("sss", $usuario, $contrasena, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Credenciales válidas
    $row = $result->fetch_assoc();
    $_SESSION['usuario'] = $usuario;
    $_SESSION['role'] = $row['role']; // Agregar el role a la sesión
    echo json_encode(array('success' => true, 'role' => $row['role']));
} else {
    // Credenciales incorrectas
    echo json_encode(array('success' => false));
}

$stmt->close();
$conn->close();
?>

