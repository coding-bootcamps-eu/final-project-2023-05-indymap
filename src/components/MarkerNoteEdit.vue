<template>
  <section class="marker-edit-container">
    <article class="marker-edit-headline-input-container">
      <label for="marker-name">Please give your Pin a name</label>
      <input
        type="text"
        v-model.trim="header"
        placeholder=" My favourite place"
        id="marker-name"
      />
    </article>
    <article class="marker-edit-text-input-container">
      <label for="marker-description">Please decribe your Pin</label>
      <textarea
        name="marker-description-input"
        v-model.trim="description"
        placeholder=" What is special about this place?"
        id="marker-description"
        cols="10"
        rows="5"
      ></textarea>
    </article>
    <div class="btn-wrapper">
      <router-link class="router-link router-link-save-marker" to="/view-pin">
        <button
          @click="saveMarkerData(), $emit('pin-saved')"
          class="btn-save-pin"
        >
          Save Marker
        </button></router-link
      >
      <router-link class="router-link router-link-back-to-map" to="/map">
        <button class="btn-back-to-map">Back to map</button></router-link
      >
    </div>
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
    return {
      dataStore,
    };
  },
  async created() {
    await this.loadPinData();
  },
  methods: {
    loadPinData() {
      this.currentMapId = this.dataStore.stateMaps.maps[0].id;
      if (this.dataStore.newPin) {
        this.geoLocation = this.dataStore.newPinLocation;
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
        this.dataStore.newPin = true;
      } else {
        this.dataStore.editPin(
          this.currentPinId,
          this.header,
          this.description,
          this.geoLocation,
          this.currentMapId
        );
      }
      this.dataStore.fetchMapPins(this.dataStore.currentMapId);
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
  --clr-btn: rgb(54, 54, 54);
  --clr-btn-hover: rgb(187, 187, 187);
  --clr-btn-active: rgb(0, 0, 0);
  --clr-background: white;
  --clr-text: black;
}
html {
  background-color: var(--clr-background);
  color: var(--clr-text);
}
.marker-edit-container {
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-inline: auto;
}
.marker-edit-headline-input-container,
.marker-edit-text-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
label {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
}
input,
textarea {
  font-size: 1rem;
}
#marker-name {
  padding: 0.5rem;
}
#marker-description {
  height: 5rem;
  width: 100%;
  padding: 0.5rem;
}

.router-link,
.router-link::after {
  color: black;
  text-decoration: none;
}
.btn-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: center;
}

button {
  font-size: 1rem;
  color: white;
  font-weight: 700;
  width: 8rem;
  height: 2.5rem;
  border-radius: 7px;
  border: 0;
  background-color: var(--clr-btn);
  text-align: center;
}

button:hover {
  background-color: var(--clr-btn-hover);
  transition: 150ms;
}

button:active {
  background-color: var(--clr-btn-active);
}
</style>
