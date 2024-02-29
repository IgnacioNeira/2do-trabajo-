<template>
  <div class="grupContac">
    <div class="contacto">
      <h2 class="form-titulo">Contactos</h2>
      <form @submit.prevent="guardarContacto()" class="form">
        <input type="hidden" v-model="contacto.id" />
        <div>
          <label for="email">Correo Electrónico (*)</label><br />
          <input type="text" v-model="contacto.email" />
        </div>
        <div>
          <label for="nombre">Nombre (*)</label>
          <input type="text" v-model="contacto.nombre" />
        </div>
        <div>
          <label for="telefono">Teléfono (*)</label>
          <input type="text" v-model="contacto.telefono" />
        </div>
        <div>
          <label for="comentario">Comentário (*)</label>
          <textarea id="comentario" v-model="contacto.comentario" rows="3">
          </textarea>
        </div>

        <Message
          v-if="show"
          :message="message"
          :status="processStatus"
          @blockShow="showStatus"
        />
        <div class="botones">
          <button class="btn-primary" type="submit">Enviar</button>
        </div>
      </form>
    </div>

    <div class="comentario">
      <h2>ENVIANOS TUS COMENTARIOS</h2>
      <br /><br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet odit
        nostrum veritatis officia maiores libero et voluptates cupiditate,
        praesentium reprehenderit laboriosam cumque. Tempore illo maiores
        obcaecati magnam omnis laboriosam modi..
      </p>
      <br /><br />
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Message from "../servicios/Mensaje.vue";
const url = "http://localhost:5000/api";
let show = ref(false);
let processStatus = ref("");
let contacto = ref({
  id: 0,
  email: "",
  nombre: "",
  comentario: "",
  telefono: "",
});
let message = ref("");

const guardarContacto = () => {
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
    "email",
    "nombre",
    "comentario",
    "telefono",
  ];
  return camposObligatorios.some((campo) => !contacto.value[campo]);
});

const emailNoValido = computed(() => {
  return !/^\S+@\S+\.\S+$/.test(contacto.value.email);
});

const enviarDatosEstudiante = async () => {
  const data = {
    id: contacto.value.id,
    email: contacto.value.email,
    nombre: contacto.value.nombre,
    comentario: contacto.value.comentario,
    telefono: contacto.value.telefono,
  };
  let sendMethod = "POST";
  let api = `${url}/contact`;
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
      showStatus(true);
      handlerLimpiar();
    })
    .catch((error) =>
      console.error("Error al grabar Info.del Estudiante:", error)
    );
};

const showStatus = (valor) => {
  show.value = valor;
};

const handlerLimpiar = () => {
  (contacto.value.id = ""),
    (contacto.value.email = ""),
    (contacto.value.nombre = ""),
    (contacto.value.comentario = ""),
    (contacto.value.telefono = "");
};

function mostrarError(mensaje, status) {
  message.value = mensaje;
  processStatus.value = status;
  showStatus(true);
}
</script>

<style scoped>
h2 {
  text-align: left;
}
p {
  font-size: 1.3rem;
}
.grupContac {
  margin: 22px 20px;
  display: flex;
}
.contacto {
  padding: 2rem;
  border-radius: 10px;
  width: 50%;
}
.comentario {
  display: block;
  align-items: center;
  padding: 50px 30px;
  text-align: left;
  width: 50%;
}

.form {
  padding: 40px;
  /* border: 1px solid black; */
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
.titulo {
  background-color: rgb(165, 171, 176);
}

.botones {
  margin: 0.9em 0;
  display: flex;
  justify-content: space-around;
}

.btn-primary {
  color: white;
  background-color: rgb(237, 43, 9);
  font-size: 1em;
  font-weight: 500;
  border-radius: 8px;
  border: 0;
}

.btn-primary:hover {
  border: 1px solid rgb(237, 43, 9);
  background-color: rgb(61, 60, 60);
}

.btn-segundary {
  background-color: rgb(95, 147, 100);
}

@media (max-width: 780px) {
  .grupContac {
    flex-direction: column;
  }
  .contacto {
    width: 100%;
   padding: 0rem;
 }
  .comentario {
    width: 100%;
    padding: 40px 0px;
  }
}
</style>
