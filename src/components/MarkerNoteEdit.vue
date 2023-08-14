<template>
  <section class="marker-edit-container">
    <article class="marker-edit-headline-input-container">
      <p>Please give your Marker a name</p>
      <input type="text" />
    </article>
    <article class="marker-edit-text-input-container">
      <p>Please decribe your marker</p>
      <input type="text" />
    </article>
    <article class="marker-edit-image-input-container">
      <p>Upload an image</p>
      <button>Upload Image</button>
    </article>
    <button @click="saveMarkerData">Save</button>
  </section>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  name: "MarkerNoteEdit",
  setup() {
    const dataStore = useDataStore();
    return {
      dataStore,
    };
  },
  methods: {
    saveMarkerData() {
      // push marker data to API / State
    },
  },
  computed: {},
};
</script>
<style>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.marker-edit-container {
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
}

.router-link,
.router-link::after {
  color: black;
  text-decoration: none;
}

button {
  color: white;
  font-weight: 700;
  width: 8rem;
  height: 2rem;
  border-radius: 10px;
  border: 0;
  background-color: rgb(148, 148, 148);
}
</style>
