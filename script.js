let tareas = [];

function agregarTarea() {
  const inputTarea = document.getElementById("inputTarea");
  const textoTarea = inputTarea.value.trim();
  if (textoTarea !== "") {
    const tarea = {
      texto: textoTarea,
      tiempo: new Date(),
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
      <small>${formatoFecha(tarea.tiempo)}</small>
    `;
    listaTareas.appendChild(li);
  });
}

function alternarTarea(index) {
  tareas[index].completada = !tareas[index].completada;
  mostrarTareas();
}

function formatoFecha(fecha) {
  return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
}

function mostrarTareaRapida() {
  const tareaRapida = tareas.filter(tarea => tarea.completada).sort((a, b) => {
    return a.tiempo - b.tiempo;
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
