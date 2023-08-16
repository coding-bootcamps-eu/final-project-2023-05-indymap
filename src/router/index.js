import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";
import MarkerNoteRead from "@/components/MarkerNoteRead.vue";
import CreateNewMap from "@/views/CreateNewMapView.vue";

const routes = [
  {
    path: "/start",
    name: "start",
    component: LandingView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/view-marker",
    name: "view marker",
    component: MarkerNoteRead,
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
  },
  {
    path: "/new-map",
    name: "new map",
    component: CreateNewMap,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
