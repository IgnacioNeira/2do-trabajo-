<template>
  <div class="return">
    <button class="btn-back" @click="pageBack()"><font-awesome-icon icon="rotate-left" /></button>
  </div>
  <div class="form-marco">
    <h2 class="form-titulo">
      {{ edit ? "Editar Perfíl del Estudiante" : "Regístro  de Estudiante" }}
    </h2>
    <form @submit.prevent="guardarstudent()">
      <div class="grupInput">
        <div>
          <label for="dni">Número de Documento (*) </label><br />
          <input
            type="text"
            v-model="student.dni"
            placeholder="Ingrese DNI de identificación"
            required
          />
        </div>
        <div>
          <label for="nombre">Nombres (*)</label>
          <input
            type="text"
            v-model="student.nombre"
            placeholder="Ingrese nombres"
            required
          />
        </div>
        <div>
          <label for="Apellidos">Apellidos (*)</label>
          <input
            type="text"
            v-model="student.apellido"
            placeholder="Ingrese apellidos"
            required
          />
        </div>
      </div>
      <div>
        <label for="direccion">Dirección de Habitación (*) </label>
        <textarea
          id="direccion"
          v-model="student.direccion"
          rows="2"
          placeholder="Ingrese dirección completa"
          required
        >
        </textarea>
      </div>
      <div class="grupInput">
        <div>
          <label for="email">Correo Electrónico (*)</label>
          <input
            type="text"
            v-model="student.email"
            placeholder="Ingrese email de uso habitual"
            required
          />
        </div>

        <div>
          <label for="telefono">Teléfono (*)</label>
          <input
            type="text"
            v-model="student.telefono"
            placeholder="Ingrese núm. de celular de Uso corriente"
            required
          />
        </div>
        <div>
          <label for="nacionalidad">Nacionalidad </label><br />
          <select v-model="student.nacionalidad">
            <option value="">Seleccione el país de procedencia</option>
            <option
              v-for="country in countrys"
              :key="country.id"
              :value="country.id"
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
              :key="ind"
              :value="nivel"
            >
              {{ nivel }}
            </option>
          </select>
        </div>
        <div>
          <label for="edoCivil">Edo. Civíl</label>
          <select v-model="student.edoCivil">
            <option value="">Seleccione su estado civíl</option>
            <option v-for="(item, ind) in edoCivil" :key="ind" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="grupSelect">
        <input type="checkbox" v-model="student.condTermino" class="checkbox" />
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
        <button type="submit">{{ edit ? "Actualizar" : "Registrar" }}</button>
        <button type="button" @click="handlerLimpiar()">Limpiar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { countrys, nivelEducativo, edoCivil } from "./utilStudent";
import Message from "../servicios/Mensaje.vue";
import { useRouter } from "vue-router";
const router = useRouter()

const url = "http://localhost:5000/api";
let edit = false;
let message = ref("");
let show = ref(false);
let processStatus = ref("");
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
    id: student.value.id,
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

  let sendMethod = "POST";
  let api = `${url}/student`;
  console.log(data)
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
      console.log(data)
      if (data.exito) {
        processStatus.value = "success";
      } else {
        processStatus.value = "fail";
      }
      showStatus(true);
   ///   handlerLimpiar();
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
  margin: 0em 7em 3em 7em;
  border: 1px solid black;
  border-radius: 10px;
}

.form-marco > form {
  margin: 20px;  
  border-radius: 0 0 10px 10 px;
}
.grupSelect {
  display: flex;
  justify-content: start;
  margin-top: 10px;
}
/* .form-titulo {
  background-color: black;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 10px 10px 0 0;
} */
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
