let tareas = [];

function agregarTarea() {
  const inputTarea = document.getElementById("inputTarea");
  const textoTarea = inputTarea.value.trim();
  if (textoTarea !== "") {
    const tarea = {
      texto: textoTarea,
      fechaCreacion: new Date(),
      fechaRealizacion: null,   
      completada: false
    };
    tareas.push(tarea);
    mostrarTareas();
    inputTarea.value = "";
  }
}

function mostrarTareas() {
  const listaTareas = document.getElementById("listaTareas");
  listaTareas.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="alternarTarea(${index})" ${tarea.completada ? 'checked' : ''}>
      <span class="${tarea.completada ? 'completada' : ''}">${tarea.texto}</span>
      <small>Fecha de creación: ${formatoFecha(tarea.fechaCreacion)}</small>
      <small>Fecha de realización: ${tarea.fechaRealizacion ? formatoFecha(tarea.fechaRealizacion) : 'Pendiente'}</small> <!-- Mostrar 'Pendiente' si la tarea aún no se ha realizado -->
    `;
    listaTareas.appendChild(li);
  });
}


function alternarTarea(index) {
  tareas[index].completada = !tareas[index].completada;
  if (tareas[index].completada) {
    tareas[index].fechaRealizacion = new Date(); 
  } else {
    tareas[index].fechaRealizacion = null; 
  }
  mostrarTareas();
}


function formatoFecha(fecha) {
  return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
}

function mostrarTareaRapida() {
  const tareaRapida = tareas.filter(tarea => tarea.completada).sort((a, b) => {
    const tiempoA = a.fechaRealizacion - a.fechaCreacion;
    const tiempoB = b.fechaRealizacion - b.fechaCreacion;
    return tiempoA - tiempoB;
  })[0];
  if (tareaRapida) {
    alert(`La tarea más rápida fue: "${tareaRapida.texto}"`);
  } else {
    alert("No hay tareas completadas aún.");
  }
}

function borrarTodas() {
  tareas = [];
  mostrarTareas();
}
