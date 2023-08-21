<template>
  <main class="landing-page">
    <div v-if="dataStore.existingUser === false" class="new-user-introduction">
      <p>
        Welcome to Indymap new user. Please tell us your name so that we know
        who you are in the future.
      </p>
      <form>
        <label for="username">Username</label
        ><input type="text" v-model="userName" name="username" />
        <button @click.prevent="newUserLink">Submit</button>
      </form>
    </div>
    <div class="wrapper" v-else>
      <h1 class="welcome-message">
        Welcome back {{ dataStore.stateMaps.name }}, select your map to get
        started:
      </h1>
      <div class="card-container">
        <div
          @click="navigateToMap(map.id)"
          class="flavor-text-map"
          :key="map.id"
          v-for="map in dataStore.stateMaps.maps"
        >
          <img
            class="map-image"
            src="https://picsum.photos/seed/picsum/200/300"
            alt="map"
          />
          <div class="heading-and-description">
            <h2>{{ map.mapTitle }}</h2>
            <p>{{ map.mapDescription }}</p>
            <button
              class="delete-button"
              @click.stop="
                this.deleteModal = true;
                this.mapToDelete = map.id;
              "
            >
              <img
                :src="require('@/assets/icons/delete-icon.svg')"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </div>
      <button class="add-new-map-button" @click="$router.push('/new-map')">
        <img
          class="add-new-map-icon"
          :src="require('@/assets/icons/add-icon.svg')"
          alt="addNewMap"
        />
      </button>
    </div>
    <div v-if="this.deleteModal" class="delete-map-modal">
      <p class="modal-text">Do you really want to delete this map?</p>
      <div class="btn-wrapper">
        <button @click="this.deleteModal = false" class="btn-deny-delete">
          Cancel
        </button>
        <button @click="deleteMap(this.mapToDelete)" class="btn-confirm-delete">
          Delete Map
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  setup() {
    const dataStore = useDataStore();
    dataStore.fetchUserMaps(dataStore.userId);

    return {
      dataStore,
    };
  },
  data() {
    return {
      userName: "",
      deleteModal: false,
      mapToDelete: "",
    };
  },
  methods: {
    async newUserLink() {
      await this.dataStore.createNewUser(this.userName);
      this.$router.push("/new-map");
    },

    navigateToMap(mapId) {
      this.dataStore.currentMapId = mapId;
      this.$router.push("/map");
    },

    async deleteMap(mapId) {
      await this.dataStore.deleteMap(mapId);
      await this.dataStore.fetchUserMaps(this.dataStore.userId);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
*,
:before,
:after {
  box-sizing: border-box;
}
html {
  height: 100%;
}
main {
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1rem;
}

.landing-page {
  height: 100%;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.welcome-message {
  font-size: 1.5rem;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 0;

  background: lightblue;
}

.card-container {
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 80%;
  height: 100%;

  background-color: var(--main-bg-color);
}

.flavor-text-map {
  position: relative;
  display: flex;
  max-height: 15%;

  border-radius: 10px;
  background-color: snow;
  color: black;

  box-shadow: 0px 0px 5px 2px hsla(0, 0%, 50%, 0.3);
}

.heading-and-description {
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
}

.map-image {
  border-radius: 10px 0 0 10px;
  object-fit: contain;
}

.delete-button {
  position: absolute;
  border: none;
  background: transparent;

  bottom: 1rem;
  right: 1rem;
}

.add-new-map-button {
  border: none;
  background: transparent;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
}

.add-new-map-icon {
  width: 48px;
  height: 48px;
}

.delete-map-modal {
  border: 2px solid black;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  margin-inline: auto;
  left: 3rem;
  right: 3rem;
  top: 200px;
  text-align: center;

  background: white;
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
  width: 100%;
  align-items: center;
  justify-items: center;
}
.btn-confirm-delete {
  background-color: var(--clr-btn-alert);
}

.btn-deny-delete {
  background-color: rgb(148, 148, 148);
}

.btn-confirm-delete,
.btn-deny-delete {
  font-size: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  height: 2.5rem;
  border-radius: 7px;
  border: 0;

  text-align: center;
}

.btn-confirm-delete:hover,
.btn-deny-delete:hover {
  background-color: var(--clr-btn-hover);
  transition: 150ms;
}

.btn-confirm-delete:active,
.btn-deny-delete:active {
  background-color: var(--clr-btn-active);
}
</style>
