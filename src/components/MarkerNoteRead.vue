<template>
  <section class="marker-container">
    <router-link class="router-link router-link-map-view" to="/map">
      <img
        class="icon-left"
        :src="require('@/assets/icons/arrow-left-circle.svg')"
        alt="arrow pointing left"
    /></router-link>
    <div class="note-content-wrapper">
      <h2 class="marker-headline">
        {{ this.header }}
      </h2>
      <p class="marker-text">
        {{ this.description }}
      </p>
    </div>

    <div class="btn-wrapper">
      <button class="btn-delete-pin" @click="this.deleteModal = true">
        Delete Pin
      </button>
      <router-link class="router-link router-link-edit-marker" to="/edit-pin"
        ><button class="btn-edit-pin">Edit Pin</button></router-link
      >
      <div v-if="this.deleteModal" class="delete-pin-modal">
        <p class="modal-text">Do you really want to delete this pin?</p>
        <div class="btn-wrapper">
          <button @click="this.deleteModal = false" class="btn-deny-delete">
            Cancel
          </button>
          <button @click="deletePinMethod" class="btn-confirm-delete">
            Delete Pin
          </button>
        </div>
      </div>
    </div>
  </section>
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
      deleteModal: false,
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
      this.currentPinId = this.dataStore.currentPinId;

      const currentPin = this.dataStore.statePins.pins.filter(
        (pin) => pin.id === this.currentPinId
      );

      this.currentMapId = this.dataStore.currentMapId;
      this.header = currentPin[0].header;
      this.geoLocation = currentPin[0].geoLocation;

      this.description = currentPin[0].description;
    },
    async deletePinMethod() {
      await this.dataStore.deletePin(this.currentPinId);
      this.dataStore.currentPin = "";
      this.$router.push("/map");
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

.marker-container {
  border-radius: 5px;
  /* box-shadow: var(--clr-text) 0 0 3px; */
  margin: 2rem;
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-card-bg-clr);
}
.router-link-map-view {
  position: absolute;
  align-self: flex-start;
}
.icon-left {
  width: 2rem;
  background-color: none;
  border-radius: 90%;
  transition: 150ms;
}
.icon-left:hover {
  box-shadow: var(--clr-text) 0 0 2px;
  background-color: var(--header-bg-color);
}
.icon-left:active {
  box-shadow: var(--clr-text) 0 0 2px;
  background-color: var(--clr-icon-back-to-map);
}
.note-content-wrapper {
  padding-inline: 0.5rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  width: 100%;
}
.marker-headline {
  margin-inline: 2rem;
  text-align: center;
}
.marker-text {
  text-align: center;
  margin-bottom: 1rem;
  background-color: var(--card-bg-accent-clr);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
}

.router-link,
.router-link::after {
  color: black;
  text-decoration: none;
}
.btn-delete-pin {
  background-color: var(--clr-btn-alert-minor);
}
.delete-pin-modal {
  box-shadow: var(--clr-text) 0 0 5px 0px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  margin-inline: auto;
  left: 3rem;
  right: 3rem;
  text-align: center;
  top: 30%;
  background: var(--main-card-bg-clr);
  border-radius: 0.5rem;
  opacity: 100%;
  transition: opacity 1s;
}

.btn-close-deletion-modal {
  border-radius: 90%;
  width: 1.8rem;
  height: 1.8rem;
  background: none;
  position: absolute;
  align-self: flex-start;
}
.btn-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: center;
}
.btn-confirm-delete {
  background-color: var(--clr-btn-alert);
}

button {
  font-size: 1rem;
  color: var(--clr-background);
  font-weight: 700;
  width: 7rem;
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
