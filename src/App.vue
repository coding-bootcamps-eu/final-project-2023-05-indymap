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
import { useDataStoreTest } from "@/stores/useDataStore";
import { useDataStore } from "@/stores/useDataStoreDominic";

export default {
  setup() {
    const dataStoreTest = useDataStoreTest();
    dataStoreTest.fetchApiData();
    const dataStore = useDataStore();
    dataStore.fetchApiData();
  },
};
</script>
