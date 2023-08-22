<template>
  <section class="marker-edit-container">
    <div class="pin-input-wrapper">
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
        <router-link class="router-link router-link-back-to-map" to="/map">
          <button class="btn-back-to-map">Back to map</button></router-link
        >
        <button @click="saveMarkerData()" class="btn-save-pin">
          Save Marker
        </button>
      </div>
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
      this.currentMapId = this.dataStore.currentMapId;
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
    async saveMarkerData() {
      if (this.dataStore.newPin) {
        await this.dataStore.createNewPin(
          this.header,
          this.description,
          this.geoLocation,
          this.currentMapId
        );
        this.dataStore.newPin = false;
      } else {
        await this.dataStore.editPin(
          this.currentPinId,
          this.header,
          this.description,
          this.geoLocation,
          this.currentMapId
        );
      }
      await this.dataStore.fetchMapPins(this.dataStore.currentMapId);
      this.$router.push("/view-pin");
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
html {
  background-color: var(--clr-background);
  color: var(--clr-text);
}
.marker-edit-container {
  padding: 1.5rem 0;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-inline: auto;
}
.pin-input-wrapper {
  background-color: var(--main-card-bg-clr);
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
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
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-bg-accent-clr);
}
#marker-name {
  padding: 0.5rem;
}
#marker-description {
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
}

.router-link,
.router-link::after {
  color: black;
  text-decoration: none;
}
.btn-wrapper {
  margin-top: 0.75rem;
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
  height: 3rem;
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
.btn-back-to-map {
  background-color: var(--clr-btn-on-header);
}
</style>
