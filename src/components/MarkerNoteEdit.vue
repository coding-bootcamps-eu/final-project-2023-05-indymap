<template>
  <section class="marker-edit-container">
    <article class="marker-edit-headline-input-container">
      <label for="marker-name">Please give your Marker a name</label>
      <input
        type="text"
        v-model.trim="placeholderTitle"
        placeholder=" Your Marker"
        id="marker-name"
      />
    </article>
    <article class="marker-edit-text-input-container">
      <label for="marker-description">Please decribe your marker</label>
      <textarea
        name="marker-description-input"
        v-model.trim="placeholderDescription"
        placeholder=" What did you mark?"
        id="marker-description"
        cols="10"
        rows="5"
      ></textarea>
    </article>
    <article class="marker-edit-image-input-container">
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
  data() {
    return {
      placeholderTitle: "a title",
      placeholderDescription: "a description",
    };
  },
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
<style scoped>
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
#marker-description {
  height: 5rem;
  width: 15rem;
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
