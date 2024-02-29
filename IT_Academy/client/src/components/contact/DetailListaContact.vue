<template>
  <td :class="classBgTr">{{ contact.email }}</td>
  <td :class="classBgTr">{{ contact.nombre }}</td>
  <td :class="classBgTr">
    {{ contact.comentario }}
  </td>
  <td :class="classBgTr">{{ contact.telefono }}</td>
  <td :class="classBgTr">
    <a @click="editContact(contact.id)" class="btn">
      <font-awesome-icon icon="eye" />
    </a>
  </td>
  <td :class="classBgTr">
    <a @click="borrarContact(contact.id)" class="btn">
      <font-awesome-icon icon="trash-can" />
    </a>
  </td>
</template>

<script setup>
import { computed } from "vue";
const contact = defineProps({
  fila: Number,
  id: Number,
  email: String,
  nombre: String,
  comentario: String,
  telefono: String,
});

const emitsContact = defineEmits(["handleredit", "handlerborrar"]);
const classBgTr = computed(() => {
  if (contact.fila % 2 === 0) {
    return "BgDack";
  }
  return "BgLight";
});
const editContact = (id) => {
  emitsContact("handleredit", id);
};
const borrarContact = (id) => {
  emitsContact("handlerborrar", id);
};
</script>

<style scoped>
.BgLight {
  background-color: rgb(192, 229, 238);
}
.BgDack {
  background-color: rgb(238, 239, 239);
}
.btn {
  padding: 0.2em 0.9em;

}

.accion-a {
  width: 3%;
  min-width: 2em;
}
.accion-b {
  width: 3%;
  min-width: 2em;
}

@media (max-width: 800px) {
  .btn {
    padding: 0.2em 0.5em;
    font-size: 1em;
  }
}
@media (max-width: 580px) {
  .btn {
    padding: 0.2em 0.3em;
    font-size: 0.9em;
  }
}
</style>
