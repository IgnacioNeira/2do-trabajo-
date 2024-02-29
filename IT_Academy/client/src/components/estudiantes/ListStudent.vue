<template>
  <div class="listar table-wrapper">
    <h2>Listado de Estudiantes</h2>
    <div v-if="ifStudent">
      <h3>Cargando...</h3>
    </div>
    <table v-if="!ifStudent">
      <tr class="titulo">
        <th width="2%">Documento</th>
        <th width="25%">Nombre</th>
        <th width="20%">Email</th>
        <th width="20">Teléfono</th>
        <th colspan="3" width="20%">Acción</th>
      </tr>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <DetalleStudent
            :fila="index"
            :id="student.id"
            :dni="student.dni"
            :nombre="student.nombre"
            :apellido="student.apellido"
            :direccion="student.direccion"
            :email="student.email"
            :telefono="student.telefono"
            :nacionalidad="student.nacionalidad"
            :edoCivil="student.edoCivil"
            :condtermino="student.condtermino"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetalleStudent from "@/components/estudiantes/DetalleStudent.vue";
import Seach from "../servicios/Seach.vue";
const url = "http://localhost:5000/api";

const students = ref([]);
const ifStudent = ref(false);
onMounted(async () => {
  ifStudent.value = true;
  let sendMethod = "GET";
  let api = `${url}/student`;
  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      students.value = data;
      ifStudent.value = false;
    })
    .catch((error) =>
      console.error("Error al cargar la Tabla de Estudiantes:", error)
    );
});
</script>

<style scoped>
h3 {
  widows: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  margin-top: 3rem;
  animation: changeColor 2s linear infinite;
}
table > tbody > tr {
  height: 40px;
  background-color: rgb(220, 219, 219);
}

table > tbody > tr:hover {
  background-color: rgb(169, 165, 165);
}
.buscar {
  width: 100%;
}

.table-wrapper {
  overflow-x: auto;
}

@keyframes changeColor {
  0% {
    color: #1fb161;
  }
  25% {
    color: #ff0000;
  }
  50% {
    color: #300fd4;
  }
  80% {
    color: #fef20d;
  }
}
</style>
