<template>
  <div class="wrapper">
    <div class="search__wrapper">
      <div class="search__input__wrapper" v-if="notes">
        <div class="search__icon">
          <img
            :src="require('@/assets/icons/search-icon.svg')"
            alt="searchIcon"
          />
        </div>
        <input
          class="search__input"
          type="text"
          v-model="filterValue"
          placeholder="Filter your Pins"
        />
      </div>
      <div class="search__input__wrapper" v-else>
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>Loading Data...</p>
      </div>
      <button class="reset-map-view" @click="resetMapView">
        To Startlocation
      </button>
    </div>
    <div id="map" @click="closeNotePopup"></div>
    <div v-if="notePopupContent" class="note__popup__container">
      <div class="note__popup">
        <img
          class="note__popup__image"
          src="https://picsum.photos/200/300"
          :alt="notePopupContent.description"
        />
        <div class="note__popup__content">
          <div class="note__content_wrapper">
            <h2 class="note__popup_title">{{ notePopupContent.header }}</h2>
            <p class="note__popup__text">
              {{ notePopupContent.description.substring(0, 50) }}
            </p>
          </div>
          <div class="note__popup__button">
            <button class="details" @click="$router.push('/view-pin')">
              Details
            </button>
          </div>
        </div>
        <button class="note__popup__close__button" @click="closeNotePopup">
          <img
            class="note__popup__close"
            :src="require('@/assets/icons/close-icon.svg')"
            alt="close-icon"
          />
        </button>
      </div>
    </div>
    <div
      v-if="contextMenuVisible"
      class="context__menu"
      :style="{
        top: contextMenuPosition.y + 'px',
        left: contextMenuPosition.x + 'px',
      }"
    >
      <p class="add__marker__location">
        {{ contextMenuPosition.lat.toFixed(4) }},
        {{ contextMenuPosition.lng.toFixed(4) }}
      </p>
      <button class="add__marker" @click="$router.push('/edit-pin')">
        Add New Pin
      </button>
    </div>
  </div>
</template>

<script>
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDataStore } from "@/stores/useDataStore";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const dataStore = useDataStore();

    const mapId = route.params.id;
    dataStore.currentMapId = mapId;

    dataStore.fetchMapPins(mapId);

    return {
      dataStore,
      mapId,
    };
  },
  name: "MapComponent",
  data() {
    return {
      map: null,
      currentLocation: null,
      notePopupContent: null,
      filteredNotes: [],
      filterValue: null,
      markers: [],
      contextMenuVisible: false,
      contextMenuPosition: { x: 0, y: 0, lat: 0, lng: 0 },
    };
  },
  computed: {
    notes() {
      let pinData = this.dataStore.statePins.pins;
      return pinData;
    },
    mapRenderLocation() {
      let mapData = this.dataStore.stateMaps.maps;
      let locationData = mapData.filter(
        (map) => map.id === this.dataStore.currentMapId
      );

      return locationData.length
        ? locationData[0].mapViewLocation
        : { lat: 0, lng: 0 };
    },
  },
  methods: {
    /* Fetches the user's geolocation from the browers if they grant permission*/
    /* fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }, */

    /* Creates a leaflet map instance and renders it in div#map */
    renderMap() {
      this.map = L.map("map", { zoomControl: false });

      this.map.setView(
        [this.mapRenderLocation.lat, this.mapRenderLocation.lng],
        10
      );

      if (localStorage.getItem("darkMode") === "enabled") {
        L.tileLayer(
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/dark_all/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
          }
        ).addTo(this.map);
      } else {
        L.tileLayer(
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution: "© OpenStreetMap",
          }
        ).addTo(this.map);
      }

      this.map.on("contextmenu", this.showContextMenu);
    },

    /* Goes through the notes array and adds a marker for each pin note*/
    addMarker() {
      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
      let markerIcon = L.icon({
        iconUrl: require("@/assets/icons/marker-icon.svg"),
        iconSize: [40, 40],
      });

      for (let note of this.filteredNotes) {
        let marker = new L.marker(
          [note.geoLocation.lat, note.geoLocation.lng],
          {
            icon: markerIcon,
            id: note.id,
          }
        );
        marker.on("click", (e) => this.showNotePopup(e));
        this.markers.push(marker);
      }

      this.markers.forEach((marker) => {
        marker.addTo(this.map);
      });
    },

    resetMapView() {
      this.map.setView(
        [
          this.dataStore.statePins.mapViewLocation.lat,
          this.dataStore.statePins.mapViewLocation.lng,
        ],
        10
      );
    },

    /* Opens a popup of the pin note with a little preview of the note contents*/
    showNotePopup(e) {
      e.originalEvent.preventDefault();
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === e.target.options.id) {
          this.notePopupContent = this.notes[i];
          this.dataStore.currentPinId = this.notes[i].id;
          break;
        }
      }
    },

    /* Closes the popup again*/
    closeNotePopup() {
      this.notePopupContent = null;
      this.dataStore.currentPin = "";
    },

    /* Filters all the pin notes based on the text provided in the input field*/
    filterNotes() {
      this.filteredNotes = [];
      this.notes.forEach((note) => {
        if ((this.filterValue === null) | (this.filterValue === "")) {
          this.filteredNotes = this.notes;
        } else if (
          note.description
            .toLowerCase()
            .includes(this.filterValue.toLowerCase()) |
          note.header.toLowerCase().includes(this.filterValue.toLowerCase())
        ) {
          this.filteredNotes.push(note);
        } else {
          return;
        }
      });
    },

    showContextMenu(e) {
      this.contextMenuPosition = {
        x: e.originalEvent.clientX,
        y: e.originalEvent.clientY,
        ...e.latlng,
      };
      this.contextMenuVisible = true;
      this.dataStore.newPinLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
      this.dataStore.newPin = true;

      // Close the context menu when clicked outside
      document.addEventListener("click", this.closeContextMenu, { once: true });
    },

    closeContextMenu() {
      this.contextMenuVisible = false;
      this.dataStore.newPinLocation = {};
    },
  },
  created() {
    /* this.fetchLocation(); */
  },
  mounted() {
    this.renderMap();
  },
  watch: {
    mapRenderLocation(newLocation) {
      this.map.setView([newLocation.lat, newLocation.lng], 10);
    },
    notes(newNotes) {
      if (newNotes) {
        this.filterNotes();
        this.addMarker();
      }
    },
    filterValue() {
      this.filterNotes();
      this.addMarker();
    },
    "$route.params.id": {
      async handler() {
        this.dataStore.currentMapId = this.$route.params.id;
        await this.dataStore.fetchMapPins(this.$route.params.id);
        this.map.setView([
          this.dataStore.statePins.mapViewLocation.lat,
          this.dataStore.statePins.mapViewLocation.lng,
        ]);
      },
    },
  },
};
</script>

<style scoped>
h2,
p {
  margin: 0;
}

#map {
  height: calc(100dvh - 5rem);
}

.context__menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;

  z-index: 5000;
}

.add__marker {
  width: 100%;
  padding: 10px;

  border: none;
  background-color: transparent;

  text-align: start;

  cursor: pointer;
}

.add__marker:hover {
  background-color: hsla(0, 0%, 50%, 0.15);
}

.add__marker__location {
  padding: 10px;
}

.search__wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  top: 1rem;
  width: 100%;

  z-index: 4000;
}

.search__input__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;

  max-width: 80%;
  min-width: 50%;
  height: 60px;

  background-color: snow;
  border: 1px solid grey;
  border-radius: 50px;

  padding: 1rem;
}
.search__icon {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
}

.search__input {
  height: 100%;
  width: 100%;
  border: transparent;
  background-color: snow;
}

.reset-map-view {
  background: snow;
  border: 1px solid grey;
  border-radius: 50px;

  padding-inline: 0.5rem;

  height: 2rem;
}

.wrapper {
  position: relative;
  height: 100%;
}

.note__popup__container {
  position: absolute;
  display: flex;

  width: 100%;
  max-height: 150px;

  background-color: transparent;
  bottom: 0;
  z-index: 3000;

  justify-content: center;
}

.note__popup {
  position: relative;
  display: flex;

  gap: 1rem;
  max-width: 80%;

  border-radius: 10px;
  background-color: var(--main-card-bg-clr);
  color: var(--clr-text);

  margin-bottom: 1.5rem;
  box-shadow: var(--clr-text) 0 0 5px 0px;
}

.note__popup__image {
  border-radius: 10px 0 0 10px;
  object-fit: contain;
}

.note__popup_title {
  font-size: 1rem;
  padding-inline-end: 1rem;
}

.note__popup__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 0;

  overflow: hidden;
}

.note__popup__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note__popup__button {
  display: flex;
  justify-content: center;
  width: 100%;
}

.details {
  border-radius: 10px;
  border: none;
  background-color: var(--clr-btn);
  color: snow;
  height: 1.5rem;
  width: 70%;
  padding-inline: 0.5rem;
  margin-top: 0.5rem;
}

.note__popup__close__button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  padding: 0;

  background-color: transparent;
  border: none;
}

.note__popup__close {
  height: 30px;
  width: 30px;
}

@media screen and (min-width: 625px) {
  .note__popup {
    max-width: 500px;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 0;
  border: 2px solid black;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
