<template>
  <HeaderComponent />
  <CreateMyMap />
</template>

<script>
import CreateMyMap from "@/components/CreateMyMap.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    CreateMyMap,
  },
};
</script>
