<template>
  <div class="container">
    <h1 class="title">Create your map</h1>
    <div class="input-group">
      <i class="fas fa-map-marker-alt"></i>
      <input
        type="text"
        v-model="mapTitle"
        placeholder="Enter Map Title"
        id="map-title"
      />
      <small class="check"
        ><label for="map-title">Please enter a title</label></small
      >
    </div>
    <div class="input-group">
      <i class="fas fa-pen"></i>
      <input
        type="text"
        v-model="mapDescription"
        placeholder="Short Description"
        id="map-description"
      />
      <small class="check"
        ><label for="map-description">Please enter a description</label></small
      >
    </div>
    <div class="input-group">
      <i class="fas fa-location-arrow"></i>
      <input
        type="text"
        v-debounce:500ms="returnCoordinates"
        v-model="mapLocation"
        placeholder="Location"
        id="map-location"
      />
      <small class="check"
        ><label for="map-location">Please enter a valid city name</label></small
      >
    </div>
    <button
      @click="createNewMap"
      :disabled="
        validCityName === false || mapTitle === '' || mapDescription === ''
      "
    >
      Create
    </button>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { vue3Debounce } from "vue-debounce";

export default {
  directives: {
    debounce: vue3Debounce({ lock: true }),
  },
  setup() {
    const dataStore = useDataStore();

    return {
      dataStore,
    };
  },
  data() {
    return {
      mapTitle: "",
      mapLocation: "",
      mapDescription: "",
      mapViewLocation: {},
      validCityName: false,
    };
  },

  methods: {
    async createNewMap() {
      await this.dataStore.createNewMap(
        this.mapTitle,
        this.mapDescription,
        this.mapViewLocation,
        this.dataStore.userId
      );
      await this.dataStore.fetchUserMaps(this.dataStore.userId);
      if (this.dataStore.currentMapId) {
        this.$router.push({
          name: "map",
          params: { id: this.dataStore.currentMapId },
        });
      }
    },

    returnCoordinates() {
      const provider = new OpenStreetMapProvider();
      provider.search({ query: this.mapLocation }).then((result) => {
        if (result.length > 0) {
          const { x, y } = result[0];
          this.mapViewLocation = { lat: y, lng: x };
          this.validCityName = true;
        } else {
          this.validCityName = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--main-bg-color);
  padding: 1rem;
  /* border-radius: 20px; */
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); */
  align-content: center;
  min-width: 350px;
  max-width: 800px;
  height: 100%;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-family: var(--font-header);
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  width: 100%;
}

.input-group i {
  margin-right: 10px;
}

.check label {
  margin: 0;
  margin-inline-start: 5px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: 1px solid #a3c6b3;
  border-radius: 5px;
  font-size: 16px;
  background-color: #ffffff;
  color: #333;
}

button {
  background-color: var(--clr-btn);
  color: var(--main-card-bg-clr);
  border: none;
  padding: 15px;
  height: 2.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  width: 10rem;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: center;
}

button:disabled {
  background-color: grey;
}

button:hover:disabled {
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: var(--clr-btn-hover);
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }

  .input-group input {
    font-size: 18px;
  }
}
</style>
