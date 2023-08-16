<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <RouterLink to="/start">Landing</RouterLink> |
    <router-link to="/about">About</router-link> |
    <RouterLink to="/edit-marker">Edit Marker</RouterLink> |
    <RouterLink to="/view-marker">View Marker</RouterLink> |
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
    dataStore.fetchApiData("4a3eac09-f652-4d5e-8f4d-691502a71ef6");
  },
};
</script>
