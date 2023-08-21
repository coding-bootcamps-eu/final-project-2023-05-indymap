<template>
  <HeaderComponent />
  <marker-note-edit />
</template>

<script>
import MarkerNoteEdit from "@/components/MarkerNoteEdit.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
    MarkerNoteEdit,
  },
};
</script>
