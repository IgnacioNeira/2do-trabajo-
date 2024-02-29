<template>
  <div class="return">
    <button class="btn-back"  @click="pageBack()"><font-awesome-icon icon="rotate-left" /></button>
  </div>
  <div class="form-marco">
    <h2 class="form-titulo">Eliminar Informatívo del Estudiante</h2>
    <div class="del_marco">
      <h3>Está Seguro(a) de Querrer Eliminar</h3>
      <h3>La información del Estudiante</h3>
    </div>
    <Message
      v-if="show"
      :message="message"
      :status="processStatus"
      @blockShow="showStatus"
    />
    <div class="botones">
      <button type="button" @click="borrarProd(studentID.value)">
        Eliminar
      </button>
      <button type="button" @click="pageBack()">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Message from "../servicios/Mensaje.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

const url = "http://localhost:5000/api";

// Busco parametros de la ruta
const route = useRoute();
let message = ref("");
let studentID = ref(route.params.id);
let show = ref(false);
let processStatus = ref("");

const pageBack = () => {
  router.back();
};
const borrarProd = async (id) => {
  let api = `${url}/student/${studentID.value}`;
  fetch(api, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exito) {
        message.value = data.message;
        processStatus.value = "success";
      } else {
        processStatus.value = "fail";
      }
      showStatus(true);
    })
    .catch((error) => {
      console.error("Error al eliminar info. del Estudieante", error);
    });
};

const showStatus = (valor) => {
  show.value = valor;
};
</script>

<style scoped>
h3 {
  font-size: 1.4em;
  text-align: center;
}
.titulo {
  background-color: rgb(165, 171, 176);
}

.form-marco {
  margin: 1em 7em 3em 7em;
  border: 1px solid black;
  border-radius: 10px ;
  height: 450px;
}

.form-marco > form {
  margin: 20px;
}

.del_marco {
  margin: auto auto;
  padding: 80px;
}
.botones {
  margin: 0.3em 0;
  display: flex;
  justify-content: space-around;
  font-size: 1.3em;
  font-weight: 600;
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
