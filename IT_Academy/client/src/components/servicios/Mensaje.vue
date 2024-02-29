<template>
  <div v-if="isVisible" class="message" :class="classStatus">
    <h4>{{ message }}</h4>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
const isVisible = ref(true);

const props = defineProps({
  message: String,
  status: String,
});
const emit = defineEmits(["blockShow"]);
const classStatus = computed(() => {
  if (props.status === "success") {
    return "successClass";
  }
  if (props.status === "warning") {
    return "warningClass";
  }
  if (props.status === "fail") {
    return "failClass";
  }
});
onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
    emit("blockShow", false);
  }, 3000);
});
</script>

<style scoped>
.message {
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
}
.warningClass {
  color: orange;
}
.successClass {
  color: green;
}
.failClass {
  color: red;
}
</style>
