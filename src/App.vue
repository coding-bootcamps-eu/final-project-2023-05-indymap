<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <RouterLink to="/view-marker">View Marker</RouterLink>
  </nav>
  <router-view />
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  setup() {
    const dataStore = useDataStore();
    dataStore.fetchApiData();
    console.log(dataStore);
  },
};
</script>
