//variables
const formulario = document.querySelector('#formulario');
const notasContenedor = document.querySelector('#contenedor__tareas');
let notas = [];

//eventos
document.addEventListener('DOMContentLoaded', () => {
  notas = JSON.parse(localStorage.getItem('notas')) || [];
  crearHTML();
});

eventListener();
function eventListener() {
  formulario.addEventListener('submit', agregarNota);
}

//funciones
function agregarNota(e) {
  e.preventDefault();
  const inputText = document.querySelector('.input__formulario-header').value;

  if (inputText === '') {
    const error = document.querySelector('.error');
    error.classList.add('error2');
    setTimeout(() => {
      error.classList.remove('error2');
    }, 3000);
    return;
  }

  //agregar nota al html
  let textObjet = {
    id: Date.now(),
    texto: inputText,
  };

  notas = [...notas, textObjet];

  crearHTML();
  formulario.reset();
}

//crear el html

function crearHTML() {
  limpiarHTML();

  if (notas.length > 0) {
    notas.forEach((not) => {
      const li = document.createElement('li');
      const icono = document.createElement('i');
      icono.classList = 'fa-solid fa-trash-can';

      //borrar el html
      icono.onclick = () => {
        borrar(not.id);
      };

      li.innerHTML = not.texto;
      li.appendChild(icono);
      notasContenedor.appendChild(li);
    });
  }

  guardarStorage();
}

//limpiar html

function limpiarHTML() {
  while (notasContenedor.firstChild) {
    notasContenedor.removeChild(notasContenedor.firstChild);
  }
}

//borrar tarea
function borrar(id) {
  notas = notas.filter((not) => not.id != id);
  crearHTML();
}

//crear local storage

function guardarStorage() {
  localStorage.setItem('notas', JSON.stringify(notas));
  console.log(guardarStorage);
}
