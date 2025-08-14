import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import MoviesComponent from "./components/Movies/MoviesComponent.vue";
import TvComponent from "./components/Television/TvComponent.vue";
import PeopleComponent from "./components/People/PeopleComponent.vue";
import ViewMovieComponent from "./components/Movies/ViewMovieComponent.vue";
import ViewTvComponent from "./components/Television/ViewTvComponent.vue";
import ViewCelebComponent from "./components/People/ViewCelebComponent.vue";
import ListComponent from "./components/ListComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: LoginPage },
    { path: "/home", component: HomePage },
    { path: "/movies", component: MoviesComponent },
    { path: "/movies/:id", component: ViewMovieComponent },
    { path: "/tv", component: TvComponent },
    { path: "/tv/:id", component: ViewTvComponent },
    { path: "/celebs", component: PeopleComponent },
    { path: "/celebs/:id", component: ViewCelebComponent },
    { path: "/list", component: ListComponent },
    // { path: '/:notFound(.*)', component: NotFound }
  ],
});

//Navigation Guards
router.beforeEach(async (to) => {
  console.log(to, localStorage.getItem("access-token"));
  if (
    to.fullPath !== "/login" &&
    localStorage.getItem("access-token") === null
  ) {
    return { fullPath: "/login" };
  }
});

export default router;
