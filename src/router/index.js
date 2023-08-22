import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import EditPinView from "@/views/EditPinView.vue";
import MapView from "../views/MapView.vue";
import PinView from "@/views/PinView.vue";
import CreateNewMap from "@/views/CreateNewMapView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },

  {
    path: "/view-pin",
    name: "view pin",
    component: PinView,
  },
  {
    path: "/map/:id",
    name: "map",
    component: MapView,
  },
  {
    path: "/new-map",
    name: "new map",
    component: CreateNewMap,
  },
  {
    path: "/edit-pin",
    name: "edit pin",
    component: EditPinView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
