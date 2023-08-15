<template>
  <div class="search__wrapper">
    <div class="search__input__wrapper">
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
        placeholder="Search for Marker"
      />
    </div>
  </div>
  <div class="wrapper">
    <div id="map" @click="closeNotePopup"></div>
    <div v-if="notePopupContent" class="note__popup__container">
      <div class="note__popup">
        <img
          class="note__popup__image"
          src="https://picsum.photos/200/300"
          :alt="notePopupContent.description"
        />
        <div class="note__popup__content">
          <h2>{{ notePopupContent.header }}</h2>
          <p class="note__popup__text">
            {{ notePopupContent.description.substring(0, 50) }}
          </p>
          <button class="details">Details</button>
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
  </div>
</template>

<script>
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDataStore } from "@/stores/useDataStoreDominic";

export default {
  setup() {
    const dataStore = useDataStore();

    let mapData = dataStore.stateData.maps.filter(
      (map) => map.id === "7220e93a-804f-4c9e-880a-8e53e429c1b3"
    );

    /*     Komponente braucht die konkrete MapID von der Startseite zum rendern der richtigen Map*/
    const notes = mapData[0].pins;

    return {
      notes,
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
    };
  },
  methods: {
    /* Fetches the user's geolocation from the browers if they grant permission*/
    fetchLocation() {
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
    },

    /* Creates a leaflet map instance and renders it in div#map */
    renderMap() {
      this.map = L.map("map", { zoomControl: false });

      this.map.setView([51.3127114, 9.4797461], 10);

      L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }
      ).addTo(this.map);

      this.map.on("contextmenu", (e) => this.createNewMarker(e));
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

    /* Opens a popup of the pin note with a littel preview of the note contents*/
    showNotePopup(e) {
      e.originalEvent.preventDefault();
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === e.target.options.id) {
          this.notePopupContent = this.notes[i];
          break;
        }
      }
    },

    /* Closes the popup again*/
    closeNotePopup() {
      this.notePopupContent = null;
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

    /* Gets the geolocation information from a user's click and forwards user to the "create new pin" page*/
    createNewMarker(e) {
      let clickLocation = e.latlng;
      console.log(clickLocation);
    },
  },
  created() {
    this.fetchLocation();
    this.filterNotes();
  },
  mounted() {
    this.renderMap();
    this.addMarker();
  },
  watch: {
    currentLocation(newLocation) {
      this.map.setView([newLocation.lat, newLocation.lng], 13);
    },
    filterValue() {
      this.filterNotes();
      this.addMarker();
    },
  },
};
</script>

<style scoped>
h2,
p {
  margin: 0;
}

.search__wrapper {
  position: fixed;
  display: flex;
  justify-content: center;

  top: 0;
  width: 100%;

  padding-top: 2rem;

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
  border: 2px solid black;
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
}

.wrapper {
  height: 100%;
}

#map {
  height: 100%;
}

.note__popup__container {
  position: absolute;
  display: flex;

  width: 100%;
  max-height: 20%;

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
  background-color: snow;
  color: black;

  margin-bottom: 1.5rem;
}

.note__popup__image {
  border-radius: 10px 0 0 10px;
  object-fit: contain;
}

.note__popup__content {
  max-width: 60%;
  padding: 0.5rem;
}

.note__popup__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.details {
  border-radius: 10px;
  border: none;
  background-color: #23a7b9;
  color: snow;

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
</style>
