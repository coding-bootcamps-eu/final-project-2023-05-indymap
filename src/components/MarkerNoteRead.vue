<template>
  <div>
    <section class="marker-container">
      <router-link class="router-link router-link-map-view" to="/about">
        <img
          class="icon-left"
          :src="require('@/assets/icons/arrow-left-circle.svg')"
          alt="arrow pointing left"
      /></router-link>

      <h2 class="marker-headline">
        {{ this.header }}
      </h2>
      <p class="marker-text">
        {{ this.description }}
      </p>
      <router-link class="router-link router-link-edit-marker" to="/edit-pin"
        ><button>Edit Marker</button></router-link
      >

      <router-link
        @click="deletePinMethod()"
        class="router-link router-link-delete-marker"
        to="/map"
        ><button>Delete Marker</button></router-link
      >
    </section>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  name: "MarkerNoteRead",
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
  created() {
    this.loadPinData();
  },

  methods: {
    loadPinData() {
      this.currentPinId = this.dataStore.currentPinId;
      console.log(this.currentPinId);
      const currentPin = this.dataStore.statePins.pins.filter(
        (pin) => pin.id === this.currentPinId
      );
      console.log(currentPin);
      this.currentMapId = this.dataStore.stateMaps.maps[0].id;
      this.geoLocation = currentPin[0].geoLocation;
      this.header = currentPin[0].header;
      this.description = currentPin[0].description;
    },
    deletePinMethod() {
      this.dataStore.deletePin(this.currentPinId);
      this.dataStore.currentPin = "";
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
.marker-container {
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
}
.router-link-map-view {
  position: absolute;
  align-self: flex-start;
}
.icon-left {
  width: 1.5rem;
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
