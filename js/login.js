function iniciarSesion() {
    const formData = new FormData(document.getElementById('loginForm'));

    fetch('php/conexion.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response);  // Agrega esta línea para depurar
        return response.json();
    })
    .then(data => {
        if (data.success) {
            //alert('Inicio de sesión exitoso');
            // Redireccionar a la página según el rol
            if (data.role === 'Administrador') {
                window.location.href = 'role/administrador.html';  // Cambia 'admin.html' por la ruta real del HTML de administrador
            } else if (data.role === 'Profesor') {
                window.location.href = 'role/profesor.html';  // Cambia 'profesor.html' por la ruta real del HTML de profesor
            } else {
                // En caso de un rol desconocido o adicional, puedes manejarlo aquí
                console.error('Rol desconocido:', data.role);
            }
        } else {
            alert('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
