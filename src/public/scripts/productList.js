const botonesEliminar = document.querySelectorAll('.eliminarBtn');
const formLink = document.getElementById('formLink');
const closeSessionBtn = document.getElementById('closeSession');

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const url = '/products/' + e.target.value;
        const requestOptions = {
            method: 'DELETE'
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    alert('Recurso eliminado con éxito');
                    window.location.reload();
                } else {
                    alert('Error al eliminar el recurso');
                }
            })
            .catch(error => {
                alert('Error en la solicitud DELETE:', error);
            });
    });
});

//Función para borrar la cookie. La cookie se borra si o si con una fecha de expiración que, en caso de ser pasada, hace que la cookie se borre automáticamente:
function borrarCookie(nombre) {
    document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

closeSessionBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    borrarCookie('userLoged');
    borrarCookie('userName');
    borrarCookie('userAvatar');
    window.location.reload();
})