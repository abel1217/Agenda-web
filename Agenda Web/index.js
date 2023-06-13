
// Función para mostrar la sección "Crear Contactos"
function mostrarCrearContactos() {
  document.getElementById('seccionCrearContactos').style.display = 'block';
  document.getElementById('seccionMostrarContactos').style.display = 'none';
}

// Función para mostrar la sección "Mostrar Contactos"
function mostrarMostrarContactos() {
  document.getElementById('seccionCrearContactos').style.display = 'none';
  document.getElementById('seccionMostrarContactos').style.display = 'block';
  obtenerContactos();
}

// Función para mostrar la sección de inicio
function mostrarInicio() {
  document.getElementById('seccionCrearContactos').style.display = 'none';
  document.getElementById('seccionMostrarContactos').style.display = 'none';
}

// Función para obtener los contactos mediante fetch
function obtenerContactos() {
  fetch('https://railway-node-express-production-3b13.up.railway.app/scrape')
    .then(response => response.json())
    .then(data => {
      const tablaContactos = document.getElementById('tablaContactos');
      tablaContactos.innerHTML = '';

      data.forEach(contacto => {
        const fila = `<tr>
                        <td>${contacto.nombre}</td>
                        <td>${contacto.apellido}</td>
                        <td>${contacto.telefono}</td>
                      </tr>`;
        tablaContactos.innerHTML += fila;
      });
    });
}

// Función para enviar el formulario y guardar el contacto
document.getElementById('formularioCrearContacto').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;

  const contacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
  };

  fetch('https://railway-node-express-production-3b13.up.railway.app/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contacto)
  })
    .then(response => response.json())
    .then(data => {
      alert('Contacto guardado correctamente');
      document.getElementById('formularioCrearContacto').reset();
      mostrarMostrarContactos();
    })
    .catch(error => {
      alert('Error al guardar el contacto');
    });
});
