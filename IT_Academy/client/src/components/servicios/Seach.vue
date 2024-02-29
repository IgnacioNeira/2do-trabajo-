<template>
  <div class="buscar">
    <input
      type="text"
      class="buscar"
      placeholder="Buscar por nombre"
      v-on:input="buscarName"
      />
      <!-- v-model="buscar" -->
      <!-- <button class="btn" @:click="buscarName">Burcar</button> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
let buscar = ref("");
const props = defineProps({
  propData: Array,
});
const emit = defineEmits(["filtrarDatos"]);

const buscarName = (event) => {
  const valorBuscar = event.target.value;
  // const datosSalida = [];

  const datosSalida = props.propData.filter((element) =>
    element.name.toLowerCase().includes(valorBuscar.toLowerCase())
  );
  emit("filtrarDatos", datosSalida);
  // console.log(buscar.value);
  // if (buscar.value) {
  //   const datosSalida = props.propData.filter((element) =>
  //     element.nombre.toLowerCase().includes(buscar.value.toLowerCase())
  //   );
  //   emit("filtrarDatos", datosSalida);
  // } else {

  // }
};
</script>

<style scoped>
div {
  margin: 0 40px 0 0;
}
input {
  padding: 0.3em 0.5em;
  font-size: 1.2em;
  border-radius: 10px;
  border: 3.3px solid rgba(126, 128, 130, 0.5);
  margin-top: 0.2em;
  margin-bottom: 0.5em;
  width: 100%;
}

input:focus {
  border: 3.4px solid rgba(18, 108, 242, 0.5);
  outline: 0 none;
}
.buscar {
  position: relative;
}
.btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 6px;
  right: 4px;
  max-width: 100px;
  border: 0;
  border-radius: 0 5px 5px 0;
  height: 2.6rem;
}
@media (max-width: 600px) {
  .btn {
    height: 1.6rem;
  }
}
</style>
