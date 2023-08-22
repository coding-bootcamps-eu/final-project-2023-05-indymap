<template>
  <router-view />
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  setup() {
    const dataStore = useDataStore();

    return {
      dataStore,
    };
  },
  async created() {
    this.dataStore.checkUser();
    await this.dataStore.fetchUserMaps(this.dataStore.userId);
  },
};
</script>
