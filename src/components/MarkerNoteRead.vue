<template>
  <section class="marker-container">
    <h2 class="marker-headline">
      {{ dataStore.stateData.dummyMarker1.headline }}
    </h2>
    <p class="marker-text">
      {{ dataStore.stateData.dummyMarker1.description }}
    </p>
    <img src="https://picsum.photos/300/200" alt="image of something amazing" />

    <router-link class="router-link router-link-edit-marker" to="/about"
      ><button>Edit Marker</button></router-link
    >

    <router-link class="router-link router-link-delete-marker" to="/about"
      ><button @click="deleteMarker">Delete Marker</button></router-link
    >
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
  methods: {
    deleteMarker() {
      // delete marker from API / storage
    },
  },
  computed: {},
};
</script>
<style scoped>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.marker-container {
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
}
.marker-text {
  text-align: justify;
}

.router-link,
.router-link::after {
  color: black;
  text-decoration: none;
}

img {
  width: 100%;
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
