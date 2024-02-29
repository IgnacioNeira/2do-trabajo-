<template>
  <div
    class="menu-container"
    :class="{ collapsed: isCollapsed, vertical: isVertical }"
  >
    <button class="iconMenu" @click="toggleCollapse">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>
    <ul class="menu">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        @click.prevent="item.onClick(item)"
      >
        <font-awesome-icon v-if="item.icon" :icon="item.icon" /> {{ item.name }}
        <ul v-if="item.children && item.children.length">
          <li
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            @click.prevent="childItem.onClick(childItem)"
          >
            <font-awesome-icon v-if="childItem.icon" :icon="childItem.icon" />
            {{ childItem.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const isCollapsed = ref(false);
const isVertical = ref(false);

const profileStatus = ref("");
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
const toggleOrientation = () => {
  isVertical.value = !isVertical.value;
};

const handleItemClick = (item) => {
  if (item.params) {
    router.push({ name: item.route, params: item.params });
  } else {
    if (profileStatus.value === item.route) {
      router.push({ name: "ProfileStudentEdit", params: { id: 0, ed: 0 } });
    } else {
      router.push({ name: item.route });
    }
  }
  toggleCollapse();
};

const menuItems = [
  {
    name: "Inicio",
    icon: "home",
    route: "Inicio",
    onClick(item) {
      handleItemClick(item);
    },
  },
  {
    name: "Estudioante",
    icon: "user-pen",
    onClick() {},
    children: [
      {
        name: "Registrar",
        icon: "id-badge",
        route: "RegisterStudent",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Perfíl",
        icon: "id-badge",
        route: "ProfileStudentEdit",
        onClick(item) {
          profileStatus.value = "ProfileStudentEdit";
          handleItemClick(item);
        },
      },
      {
        name: "Listar Estudiantes",
        icon: "list",
        route: "ListStudents",
        onClick(item) {
          handleItemClick(item);
        },
      },
    ],
  },
  {
    name: "Cursos",
    icon: "book",
    onClick() {},
    children: [
      {
        name: "Registrar de Cursos",
        route: "RegistroCurso",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Alúmnos por Cursos",
        route: "ListCursos",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Listar Cursos",
        route: "ListCursos",
        onClick(item) {
          handleItemClick(item);
        },
      },
    ],
  },
  {
    name: "Profesores",
    icon: "fa-user-tie",
    onClick(item) {
      handleItemClick(item);
    },
    children: [
      {
        name: "Registrar",
        route: "RegistroProfesor",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Perfíl",
        route: "PerfilProfesor",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Listar Profesores",
        route: "ListaProfesores",
        onClick(item) {
          handleItemClick(item);
        },
      },
    ],
  },
  {
    name: "Administración",
    icon: "building-circle-exclamation",
    onClick() {},
    children: [
      {
        name: "Listar Alumnos",
        route: "ListaAlumnos",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Listar Cursos",
        route: "ListarCursos",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Listar Proferores",
        route: "ListaProfesores",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Alumnos por Cursos",
        route: "AlumnosCursos",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Profesores por Cursos",
        route: "ProfesoresCursos",
        onClick(item) {
          handleItemClick(item);
        },
      },
      {
        name: "Listado de Contactos",
        route: "ListContact",
        onClick(item) {
          handleItemClick(item);
        },
      },
    ],
  },
  {
    name: "Contacto",
    icon: "address-card",
    route: "Contact",
    onClick(item) {
      handleItemClick(item);
    },
  },
  {
    name: "Salir",
    icon: "forward-step",
  },
];
</script>

<style scoped>
.menu-container {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: #f9f9f9;
  white-space: nowrap;
  height: 60px;
  font-size: 1.1rem;
  background-color: rgb(28, 104, 66);
  font-weight: 300;
  color: WHITE;
  border: 0;
}
.menu {
  list-style: none;
  padding: 2px 0;
}

.menu > li {
  position: relative;
  cursor: pointer;
}

.menu > li:active {
  background-color: rgb(242, 242, 242);
  border-radius: 4px;
  color: black;
}
.menu > li > ul > li:hover {
  background-color: rgb(121, 124, 124);
  cursor: pointer;
}

button {
  position: absolute;
  margin-bottom: 10px;
  padding: 6px 10px;
  color: black;
  border: none;
  top: 20px;
  right: 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:active {
  background-color: #555;
}

.vertical {
  width: 100%;
}

/* Menu Horizontal */
@media (min-width: 980px) {
  .iconMenu {
    display: none;
    color: white;
  }

  .menu-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 0px;
    outline: 0;
  }

  .menu {
    display: flex;
    flex-direction: row;
  }

  .menu > li {
    margin: 0 10px;
    padding: 5px;
  }

  .menu > li:hover > ul {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .menu > li > ul {
    display: none;
    list-style: none;
    padding: 0;
    background-color: #fafafa;
    border: 1px solid #ccc;
    color: black;
    border-radius: 5px;
  }

  .menu > li > ul > li {
    margin-top: 2px;
    padding: 5px 10px;
    cursor: pointer;
  }
  .collapsed .menu > ul {
    display: none;
  }
}

/* Menu Vertical */
@media (max-width: 980px) {
  .menu-container {
    border: 0px solid #ccc;
    width: 200px;
    padding: 2px 0;
    transition: width 0.3s ease-in-out;
  }

  .menu {
    position: relative;
    background-color: rgba(52, 57, 51, 0.9);
    top: 57px;
    left: -151px;
    border: 0px;
  }

  .menu > ul {
    margin-bottom: 15px;
    padding: 3px 10px;
    background-color: rgba(52, 57, 51, 0.9);
  }

  .menu >  li {
    padding: 4px 15px;

  }

  .menu > li > ul {
    display: none;
    position: absolute;
    list-style: none;
    top: -1px;
    left: 198px;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(43, 41, 41, 0.9);
    border: 1px solid #ccc;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 200px;
  }

  .menu > li:hover > ul {
    padding: 0;
    display: block;
    opacity: 1;
    visibility: visible;
    z-index: 999;
  }

  .menu > li > ul > li {
    margin: 2px 0;
    padding: 3px 10px;
  }

  .collapsed .menu {
    display: none;
  }
  .iconwidth {
    width: 20px;
  }
  .icontext {
    width: auto;
  }
}
@media (max-width: 550px) {
  .menu {
    left: -128px;
    font-size: 1rem;
  }
}
@media (max-width: 370px) {
  .menu {
    left: -104px;
  }
}
@media (max-width: 230px) {
  .menu {
    left: -104x;
  }
}
</style>
