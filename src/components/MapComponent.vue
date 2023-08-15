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
          :src="notePopupContent.image"
          :alt="notePopupContent.description"
        />
        <div class="note__popup__content">
          <h2>{{ notePopupContent.heading }}</h2>
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

export default {
  name: "MapComponent",
  data() {
    return {
      map: null,
      currentLocation: null,
      notePopupContent: null,
      filteredNotes: [],
      filterValue: null,
      markers: [],
      notes: [
        {
          id: 1,
          heading: "Coole Weinbar",
          description:
            "Hier kann man gut und günstig Wein trinken. Musik nicht zu laut. Gemütliche Stühle.",
          location: { lat: 49.99041501874332, lng: 6.905250549316407 },
          image:
            "https://images.pexels.com/photos/1666025/pexels-photo-1666025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: 2,
          heading: "Lorem Ipsum",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.",
          location: { lat: 49.978935813535564, lng: 6.890487670898438 },
          image:
            "https://images.pexels.com/photos/17788275/pexels-photo-17788275/free-photo-of-city-street-building-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
    };
  },
  methods: {
    fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
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
    },

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
        let marker = new L.marker([note.location.lat, note.location.lng], {
          icon: markerIcon,
          id: note.id,
        });
        marker.on("click", (e) => this.showNotePopup(e));
        this.markers.push(marker);
      }

      this.markers.forEach((marker) => {
        marker.addTo(this.map);
      });
    },

    showNotePopup(e) {
      e.originalEvent.preventDefault();
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === e.target.options.id) {
          this.notePopupContent = this.notes[i];
          break;
        }
      }
    },

    closeNotePopup() {
      this.notePopupContent = null;
    },

    filterNotes() {
      this.filteredNotes = [];
      this.notes.forEach((note) => {
        if ((this.filterValue === null) | (this.filterValue === "")) {
          this.filteredNotes = this.notes;
        } else if (
          note.description
            .toLowerCase()
            .includes(this.filterValue.toLowerCase()) |
          note.heading.toLowerCase().includes(this.filterValue.toLowerCase())
        ) {
          this.filteredNotes.push(note);
        } else {
          return;
        }
      });
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
      this.map.setView([newLocation.latitude, newLocation.longitude], 13);
    },
    filterValue() {
      this.filterNotes();
      this.addMarker();
    },
  },
};
</script>

<style scoped>
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

input {
  height: 100%;
  width: 100%;
}

.search {
  border: 1px solid black;
  margin-left: 1rem;
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
  background-color: #23a7b9;
  color: snow;

  padding-inline: 0.5rem;
  margin-top: 0.5rem;
}

.note__popup__close__button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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
