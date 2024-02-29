<template>
  <div class="listar">
    <h2>Listado de Contactos</h2>
    <table>
      <tr class="titulo">
        <th width="25%_">Correo Electrónico</th>
        <th width="30%">Nombre</th>
        <th width="40%">Comentário</th>
        <th width="10%">Teléfono</th>
        <th colspan="2" width="15%">Acción</th>
      </tr>
      <tbody>
        <tr v-for="(contacto, index) in Contactos" :key="contacto.email">
          <DetalleListaContact
            :fila="index"
            :id="contacto.id"
            :email="contacto.email"
            :nombre="contacto.nombre"
            :comentario="contacto.comentario"
            :telefono="contacto.telefono"
            @Handleredit="editProd"
            @Handlerborrar="borrarProd"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import DetalleListaContact from "./DetailListaContact.vue";
import Message from "../servicios/Mensaje.vue";
const url = "http://localhost:5000/api";
let show = ref(false);
let processStatus = ref("");
let datosProds = ref([]);
let contacto = ref({
  id: 0,
  email: "",
  nombre: "",
  comentario: "",
  telefono: "",
});
let Contactos = ref([]);
let message = ref("");

onBeforeMount(async () => {
  cargarContacts();
});

const editProd = async (id) => {
  let sendMethod = "GET";
  let api = `${url}/contact/${id}`;
  await fetch(api, {
    method: sendMethod,
  })
    .then((response) => response.json())
    .then((data) => {
      contacto.value.id = data.contact.id;
      contacto.value.email = data.contact.email;
      contacto.value.nombre = data.contact.nombre;
      contacto.value.comentario = data.contact.comentario;
      contacto.value.telefono = data.contact.telefono;
    })
    .catch((error) => console.error("Error al editar Contactos:", error));
};

const borrarProd = async (id) => {
  let api = `${url}/contact/${id}`;
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
      handlerLimpiar();
      cargarContacts();
    })
    .catch((error) => {
      console.error("Error al eliminar Contactos:", error);
    });
};
const cargarContacts = async () => {
  let api = `${url}/contact`;
  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      Contactos.value = data;
      datosProds.value = data;
    })
    .catch((error) => console.error("Error al cargar registros:", error));
};

const handlerLimpiar = () => {
  (contacto.value.id = ""),
    (contacto.value.email = ""),
    (contacto.value.nombre = ""),
    (contacto.value.comentario = ""),
    (contacto.value.telefono = "");
};

const showStatus = (valor) => {
  show.value = valor;
};
</script>

<style scoped>
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
</style>
