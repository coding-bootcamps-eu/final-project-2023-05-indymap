<template>
  <section class="marker-container">
    <h2 class="marker-headline">
      {{ dataStore.stateData.dummyMarker1.headline }}
    </h2>
    <p class="marker-text">
      {{ dataStore.stateData.dummyMarker1.description }}
    </p>
    <button @click="editMarker">Edit Marker</button>
    <button @click="deleteMarker">Delete Marker</button>
  </section>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  name: "MarkerNoteRead",
  setup() {
    const dataStore = useDataStore();
    return {
      dataStore,
    };
  },
  data() {
    return {
      dummyValues: {
        headline: "Markerheadline",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ",
      },
    };
  },
  methods: {
    editMarker() {
      // go to edit marker view
    },
    deleteMarker() {
      // delete marker from API / storage
    },
  },
  computed: {},
};
</script>
<style>
.marker-container {
  padding: 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
}
.marker-text {
  text-align: justify;
}
</style>
