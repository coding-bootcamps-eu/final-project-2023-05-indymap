<template>
  <HeaderComponent />
  <MapComponent />
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    MapComponent,
  },
};
</script>
