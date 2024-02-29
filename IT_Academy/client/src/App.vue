<script setup>
import { RouterView } from "vue-router";
import MenuBar from "./components/menu/MenuBar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logo">ACADEMIA IT</div>
      <MenuBar />
    </div>
  </header>
  <RouterView />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

header {
  background-color: rgb(28, 104, 66);
  color: white;
  font-size: 1.5rem;
  border: 0px;
  margin: 0;
  padding: 0;
}

.logo {
  display: block;
  margin: 0 1rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-style: italic;
}

header .wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(28, 104, 66);
}

/* h2 {
  text-align: center;
  font-size: 1.8em;
  padding: 1em 0;
} */

textarea,
select,
input,
input[type] {
  padding: 0.3em;
  font-size: 1.2em;
  border-radius: 5px;
  border: 2px solid rgba(126, 128, 130, 0.5);
  margin-top: 0.2em;
  margin-bottom: 0.5em;
  width: 100%;
}

textarea:focus,
select:focus,
input:focus,
input[type]:focus {
  border: 3px solid rgba(18, 108, 242, 0.5);
  outline: 0 none;
}

label {
  width: 100%;
  font-weight: 900;
  font-size: 1.1em;
}
button {
  border-radius: 10px;
  padding: 0.9em 4rem;
  border: 0.5px solid black;
  cursor: pointer;
  background-color: rgb(28, 104, 66);
  font-weight: 600;
  color: white;
}

button:hover {
  border: 0 solid black;
}
th {
  min-width: 80px;
  max-width: 300px;
}
textarea {
  margin-top: 5px;
}

.grupInput {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1em;
  margin-top: 5px;
}
.text-lf {
  text-align: left;
}
.text-rg {
  text-align: right;
}
.return {
  display: flex;
  justify-content: end;
  align-items: center;
}
.btn-back {
  margin: 10px 20px 0 0;
  padding: 5px 10px;
  background-color: white;
  font-weight: 500;
  color: blue;
  border: 0;
}

.form-titulo {
  background-color: black;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  color: white;
  border-radius: 10px 10px 0 0;
  font-size: 2.2rem;
  padding-left: 2.5rem;
}
.listar {
  margin: 3rem;
  font-size: 1.4em;
  margin: 40px 30px 0;
  min-width: 445px;
}

.listar > h2 {
  border-radius: 10px 10px 0 0;
  background-color: black;
  color: white;
  height: 50px;
  padding-left: 30px;
  display: flex;
  align-items: center;
}

.titulo {
  background-color: rgb(94, 92, 92);
  height: 40px;
  color: white;
}

@media (max-width: 990px) {
  .listar {
    margin: 3rem 2rem;
    font-size: 16px;
  }
  .logo {
    font-size: 1.3rem;
  }
    .form-titulo {
    padding-left: 20;
    font-size: 1.9rem;
  }
}

@media (max-width: 760px) {
  .listar {
    margin: 3rem 1rem;
    font-size: 14px;
  }
  .form-titulo {
    padding-left: 10;
    font-size: 1.4rem;
  }
}

@media (max-width: 550px) {
  .listar {
    font-size: 12px;
    margin: 3rem 0.5rem;
  }
  .logo {
    font-size: 1.05rem;
    margin: 0 1rem;
  }
}

@media (max-width: 740px) {
  body {
    font-size: 10px;
  }
  button {
    padding: 0.9em 2rem;
  }
}

@media (max-width: 370px) {
  button {
    padding: 0.9em 1rem;
  }
  .logo {
    font-size: 0.8rem;
  }
}
</style>
