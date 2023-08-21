<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <RouterLink to="/start">Landing</RouterLink> |
    <router-link to="/about">About</router-link> |
    <RouterLink to="/edit-pin">Edit Pin</RouterLink> |
    <RouterLink to="/view-pin">View Pin</RouterLink> |
    <RouterLink to="/map">Map</RouterLink> |
    <RouterLink to="/new-map">Create New Map</RouterLink>
  </nav>
  <router-view />
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  setup() {
    const dataStore = useDataStore();
    dataStore.checkUser();
    dataStore.fetchUserMaps("4a3eac09-f652-4d5e-8f4d-691502a71ef6");
    dataStore.fetchMapPins("7220e93a-804f-4c9e-880a-8e53e429c1b3");
  },
};
</script>
