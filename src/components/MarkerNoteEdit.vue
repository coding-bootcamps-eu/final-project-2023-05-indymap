<template>
  <section class="marker-edit-container">
    <article class="marker-edit-headline-input-container">
      <label for="marker-name">Please give your Marker a name</label>
      <input
        type="text"
        v-model.trim="header"
        placeholder=" Your Marker"
        id="marker-name"
      />
    </article>
    <article class="marker-edit-text-input-container">
      <label for="marker-description">Please decribe your marker</label>
      <textarea
        name="marker-description-input"
        v-model.trim="description"
        placeholder=" What did you mark?"
        id="marker-description"
        cols="10"
        rows="5"
      ></textarea>
    </article>
    <router-link class="router-link router-link-save-marker" to="/view-pin">
      <button @click="saveMarkerData(), $emit('pin-saved')">
        Save Marker
      </button></router-link
    >
    <router-link class="router-link router-link-back-to-map" to="/map">
      <button>Back to map</button></router-link
    >
  </section>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  name: "MarkerNoteEdit",
  emits: ["pin-saved"],
  data() {
    return {
      header: "",
      description: "",
      currentPinId: "",
      currentMapId: "",
      geoLocation: {},
    };
  },
  setup() {
    const dataStore = useDataStore();
    dataStore.fetchMapPins(dataStore.currentMap);
    return {
      dataStore,
    };
  },
  async created() {
    await this.loadPinData();
    await this.dataStore.fetchMapPins(this.dataStore.currentMap);
  },
  methods: {
    loadPinData() {
      this.currentMapId = this.dataStore.stateMaps.maps[0].id;
      if (this.dataStore.newPin) {
        this.geoLocation = this.dataStore.newLocation;
      } else {
        this.currentPinId = this.dataStore.currentPinId;
        const currentPin = this.dataStore.statePins.pins.filter(
          (pin) => pin.id === this.currentPinId
        );
        this.header = currentPin[0].header;
        this.description = currentPin[0].description;
        this.geoLocation = currentPin[0].geoLocation;
      }
    },
    saveMarkerData() {
      if (this.dataStore.newPin) {
        this.dataStore.createNewPin(
          this.header,
          this.description,
          this.geoLocation,
          this.currentMapId
        );
        this.dataStore.fetchMapPins(this.dataStore.currentMap);
      } else {
        this.dataStore.editPin(
          this.currentPinId,
          this.header,
          this.description,
          this.geoLocation,
          this.currentMapId
        );
        this.dataStore.fetchMapPins(this.dataStore.currentMap);
      }
    },
  },
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
.marker-edit-text-input-container {
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
