<template>
  <section class="marker-edit-container">
    <article class="marker-edit-headline-input-container">
      <p>Please give your Marker a name</p>
      <input
        type="text"
        v-model.trim="dataStore.stateData.dummyMarker1.newHeadline"
      />
    </article>
    <article class="marker-edit-text-input-container">
      <p>Please decribe your marker</p>
      <input
        type="text"
        v-model.trim="dataStore.stateData.dummyMarker1.newDescription"
      />
    </article>
    <article class="marker-edit-image-input-container">
      <p>Upload an image</p>
      <button>Upload Image</button>
    </article>
    <router-link class="router-link router-link-save-marker" to="/about">
      <button @click="saveMarkerData">Save Marker</button></router-link
    >
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
      // check if marker alrady exists or if existing marker is edited
      //    (check if marker with same location data exists in user data???)
      // if new marker, POST to API:
      // {
      //   fetch("http://exampleURL", {
      //     method: "POST",
      //     headers: { "content-type": "application/json" },
      //     body: JSON.stringify(examplePiniaStrore.exampleUser.newMarker),
      //   })
      //     .then((res) => res.json())
      //     .then((newMarkerFromApi) => {
      //       examplePiniaStore.push(newMarkerFromApi);
      //       // synchronize with local storage
      //     });
      // }
      // if existing marker being edited, PUT:
      // fetch("http://exampleURL", {
      //   method: "PUT",
      //   headers: { "content-type": "application/JSON" },
      //   body: JSON.stringify(examplePiniaStrore.exampleUser.existingMarker),
      // })
      //   .then((res) => res.json())
      //   .then((updatedMarker) => {
      //     // synch with local storage
      //   });
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

.marker-edit-headline-input-container,
.marker-edit-text-input-container,
.marker-edit-image-input-container {
  display: flex;
  flex-direction: column;
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
