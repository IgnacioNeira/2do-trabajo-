import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddView from "../views/AddStudentView.vue";
import ProfileView from "../views/ProfileStudentView.vue";
import DeleteView from "../views/DelStudentView.vue";
import ListView from "../views/ListStudentView.vue";
import ContactView from "../views/ContactView.vue";
import ListContactView from "../views/ListContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: HomeView,
    },
    {
      path: "/registerstudent",
      name: "RegisterStudent",
      component: AddView,
    },
    {
      path: "/profilestudentedit/:id/:ed",
      name: "ProfileStudentEdit",
      component: ProfileView,
    },
    {
      path: "/profilestudentupdate/:id/:ed",
      name: "ProfileStudentUpdate",
      component: ProfileView,
    },
    {
      path: "/profilestudentdelete/:id",
      name: "ProfileStudentDelete",
      component: DeleteView,
    },
    {
      path: "/liststudents",
      name: "ListStudents",
      component: ListView,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactView,
    },
    {
      path: "/listContact",
      name: "ListContact",
      component: ListContactView,
    },
  ],
});

export default router;
