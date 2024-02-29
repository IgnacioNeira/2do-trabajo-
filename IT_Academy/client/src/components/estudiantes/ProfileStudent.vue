<template>
  <div class="return">
    <button class="btn-back" @click="pageBack()">
      <font-awesome-icon icon="rotate-left" />
    </button>
  </div>
  <div class="form-marco">
    <h2 v-if="isEdit" class="form-titulo">Editar información del Estudiante</h2>
    <h2 v-else class="form-titulo">Detalle Informatívo del Estudiante</h2>

    <form @submit.prevent="isGrabar ? guardarstudent() : ''">
      <div class="grupInput">
        <div>
          <label for="dni">Número de Documento (*)</label><br />
          <input
            type="text"
            v-model="student.dni"
            :disabled="!isEditDni"
            placeholder="Ingrese DNI de identificación"
            @input="handleInputChange"
            @keydown="handleEnterPress"
          />
        </div>
        <div>
          <label for="nombre">Nombres (*)</label>
          <input
            type="text"
            v-model="student.nombre"
            placeholder="Ingrese nombres"
            :disabled="!isEdit"
          />
        </div>
        <div>
          <label for="Apellidos">Apellidos (*)</label>
          <input
            type="text"
            :disabled="!isEdit"
            v-model="student.apellido"
            placeholder="Ingrese apellidos"
          />
        </div>
      </div>
      <div>
        <label for="direccion">Dirección de Habitación (*) </label>
        <textarea
          id="direccion"
          v-model="student.direccion"
          rows="2"
          :disabled="!isEdit"
          placeholder="Ingrese dirección completa"
        >
        </textarea>
      </div>
      <div class="grupInput">
        <div>
          <label for="email">Correo Electrónico (*)</label>
          <input
            type="text"
            v-model="student.email"
            :disabled="!isEdit"
            placeholder="Ingrese email de uso habitual"
          />
        </div>

        <div>
          <label for="telefono">Teléfono (*)</label>
          <input
            type="text"
            v-model="student.telefono"
            placeholder="Ingrese núm. de celular de Uso corriente"
            :disabled="!isEdit"
          />
        </div>
        <div>
          <label for="nacionalidad">Nacionalidad </label><br />
          <select v-model="student.nacionalidad">
            <option value="">Seleccione el país de procedencia</option>
            <option
              v-for="(country, index) in countrys"
              :selected="country.id === student.nacionalidad"
              :key="country.id"
              :value="country.id"
              :disabled="!isEdit"
            >
              {{ country.pais }}
            </option>
          </select>
        </div>
      </div>
      <div class="grupInput">
        <div>
          <label for="nivelEducativo">Nivel Educatívo </label>
          <select v-model="student.nivelEducativo">
            <option value="">Seleccione su nivel educatívo</option>
            <option
              v-for="(nivel, ind) in nivelEducativo"
              :selected="nivel === student.nivelEducativo"
              :key="ind"
              :value="nivel"
              :disabled="!isEdit"
            >
              {{ nivel }}
            </option>
          </select>
        </div>
        <div>
          <label for="edoCivil">Edo. Civíl</label>
          <select v-model="student.edoCivil">
            <option value="">Seleccione su estado civíl</option>
            <option
              v-for="(item, ind) in edoCivil"
              :selected="item === student.edoCivil"
              :key="ind"
              :value="item"
              :disabled="!isEdit"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="grupSelect">
        <input
          type="checkbox"
          :disabled="!isEdit"
          v-model="student.condTermino"
          class="checkbox"
        />
        <label for="condiciones">
          Acepta las condiciones y terminos de la Empresa</label
        >
      </div>
      <Message
        v-if="show"
        :message="message"
        :status="processStatus"
        @blockShow="showStatus"
      />
      <div class="botones">
        <button v-if="isEdit" :disabled="!isEdit" type="submit" @keydown.enter.prevent>
          {{ isEdit ? "Actualizar" : "Volver" }}
        </button>
        <button  v-if="isEdit"  :disabled="!isEdit" type="button" @click="handlerLimpiar()">
          Limpiar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { countrys, nivelEducativo, edoCivil } from "./utilStudent";
import Message from "../servicios/Mensaje.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
const url = "http://localhost:5000/api";

// Busco parametros de la ruta
const route = useRoute();
let message = ref("");
let seatchStudents = ref(false);
let seatchStudent = "";
let studentID = ref(route.params.id);
let student = ref({
  dni: "",
  nombre: "",
  apellido: "",
  direccion: "",
  email: "",
  telefono: "",
  nacionalidad: "",
  nivelEducativo: "",
  edoCivil: "",
  condTermino: false,
});
let isEdit = ref(1);
let isGrabar = ref(false);
let isEditDni = ref(true);
let itemed = route.params.ed;
let show = ref(false);
let processStatus = ref("");

onBeforeMount(async () => {
  if (itemed != 0) {
    isEdit.value = !isEdit.value;
  }
  if (studentID.value > 0) {
    await getStudent(studentID.value);
  }
  seatchStudents.value = !seatchStudents.value;
});

const getStudent = async (id) => {
  let sendMethod = "GET";
  let api = `${url}/student/${id}`;
  await fetch(api, {
    method: sendMethod,
  })
    .then((response) => response.json())
    .then((data) => {
      isEditDni.value = !isEditDni.value;
      isGrabar.value = true;
      student.value = data.student;
    })
    .catch((error) =>
      console.error("Error al editar info. del Estudiante:", error)
    );
};

const getStudentDni = async (dni) => {
  let sendMethod = "GET";
  let api = `${url}/studentdni/${dni}`;
  await fetch(api, {
    method: sendMethod,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exito) {
        isEditDni.value = false;
        processStatus.value = "success";
        student.value = data.student;
        isGrabar.value = true;
      } else {
        message.value = data.message;
        alert(message.value);
        processStatus.value = "fail";
        handlerLimpiar();
      }
      ///  showStatus(true);
    })
    .catch((error) =>
      console.error("Error al editar info. del Estudiante:", error)
    );
};

const handlerLimpiar = () => {
  (student.value.dni = ""),
    (student.value.nombre = ""),
    (student.value.apellido = ""),
    (student.value.direccion = ""),
    (student.value.email = ""),
    (student.value.telefono = ""),
    (student.value.nacionalidad = ""),
    (student.value.nivelEducativo = ""),
    (student.value.edoCivil = ""),
    (student.value.condTermino = false);
  isEditDni.value = true;
};

const handleInputChange = (event) => {
  seatchStudent = event.target.value;
};

const handleEnterPress = (event) => {
  if (event.key === "Enter" && seatchStudent) {
    getStudentDni(seatchStudent);
    seatchStudent = "";
  }
};

const showStatus = (valor) => {
  show.value = valor;
};

const guardarstudent = () => {
  if (camposObligatoriosIncompletos.value) {
    mostrarError("Los campos con (*) son requeridos", "warning");
  } else {
    if (emailNoValido.value) {
      mostrarError("El correo electrónico no es válido", "warning");
    } else {
      enviarDatosEstudiante();
    }
  }
};

const camposObligatoriosIncompletos = computed(() => {
  const camposObligatorios = [
    "dni",
    "nombre",
    "apellido",
    "direccion",
    "email",
    "telefono",
  ];
  return camposObligatorios.some((campo) => !student.value[campo]);
});

const emailNoValido = computed(() => {
  return !/^\S+@\S+\.\S+$/.test(student.value.email);
});

const enviarDatosEstudiante = async () => {
  const data = {
    id: student.value.id ? student.value.id : 0,
    dni: student.value.dni,
    nombre: student.value.nombre.trim(),
    apellido: student.value.apellido.trim(),
    direccion: student.value.direccion.trim(),
    email: student.value.email.trim(),
    telefono: student.value.telefono.trim(),
    nacionalidad: student.value.nacionalidad,
    nivelEducativo: student.value.nivelEducativo,
    edoCivil: student.value.edoCivil,
    condTermino: student.value.condTermino,
  };

  let sendMethod = "PUT";
  let api = `${url}/student/${student.value.id}`;
  await fetch(api, {
    method: sendMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      message.value = data.message;
      if (data.exito) {
        processStatus.value = "success";
      } else {
        processStatus.value = "fail";
      }
      isGrabar.value = false;
      showStatus(true);
      if (studentID.value > 0) {
        alert(data.message);
        pageBack();
      }
      handlerLimpiar();
    })
    .catch((error) =>
      console.error("Error al grabar Info.del Estudiante:", error)
    );
};

function mostrarError(mensaje, status) {
  message.value = mensaje;
  processStatus.value = status;
  showStatus(true);
}

const pageBack = () => {
  router.back();
};
</script>

<style scoped>
table {
  max-width: 100%;
  font-size: 1.2em;
}
.titulo {
  background-color: rgb(165, 171, 176);
}

table tr {
  height: 45px;
}

.form-marco {
  margin: 0em 7em;
  border: 1px solid black;
  border-radius: 10px;
}

.form-marco > form {
  margin: 20px;
  border-radius: 0 0 10px 10px;
}

.grupSelect {
  display: flex;
  justify-content: start;
  margin-top: 10px;
}

.botones {
  margin: 0.6em 0;
  display: flex;
  justify-content: space-around;
  font-size: 1.3em;
  font-weight: 600;
}

.checkbox {
  width: auto;
}

@media (max-width: 740px) {
  .form-marco {
    margin: 3em 4em;
  }
}
@media (max-width: 370px) {
  .form-marco {
    margin: 3em 2em;
  }
}
</style>
