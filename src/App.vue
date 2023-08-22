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
    await this.dataStore.checkUser;
    this.setUserId();
  },

  methods: {
    setUserId() {
      if (this.dataStore.userId) {
        this.dataStore.fetchUserMaps(this.dataStore.userId);
      }
    },
  },
};
</script>
