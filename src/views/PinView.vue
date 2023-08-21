<template>
  <HeaderComponent />
  <marker-note-read />
</template>

<script>
import MarkerNoteRead from "@/components/MarkerNoteRead.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    MarkerNoteRead,
  },
};
</script>
