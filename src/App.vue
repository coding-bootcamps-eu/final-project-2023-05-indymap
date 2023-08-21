<template>
  <nav>
    <RouterLink to="/">Landing</RouterLink> |
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
    dataStore.checkUser;
    if (dataStore.existingUser === true) {
      dataStore.fetchUserMaps(dataStore.userId);
    }
  },
};
</script>
