<template>
  <main class="landing-page">
    <div v-if="dataStore.existingUser === false" class="wrapper">
      <p class="welcome-msg-new-user">
        Welcome to Indymap!<br />
        Please, tell us your name to get started.
      </p>
      <form>
        <label for="username">Username</label
        ><input
          type="text"
          v-model.trim="userName"
          name="username"
          class="username-input"
          required
        />
        <small class="check"
          ><p :style="{ visibility: !inputValidation ? 'visible' : 'hidden' }">
            Username must be min. 5 characters long
          </p></small
        >
        <button class="submit-button" @click.prevent="newUserLink">
          Submit
        </button>
      </form>
    </div>
    <div class="wrapper" v-else>
      <h1 class="welcome-message">
        <span>Welcome back</span
        ><span class="text-username">{{ dataStore.stateMaps.name }}.</span>
        <span>Select your map to get started:</span>
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
            src="https://picsum.photos/seed/picsum/250/300"
            alt="map"
          />
          <div class="heading-and-description">
            <h2 class="map-title">{{ map.mapTitle }}</h2>
            <p class="map-description">{{ map.mapDescription }}</p>
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
                class="delete-icon"
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
      inputValidation: false,
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

  watch: {
    userName(newUserName) {
      this.inputValidation = newUserName.length > 5;
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
  background-color: var(--main-bg-color);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 500;
}

.map-title {
  font-size: 1rem;
  margin: 0;
}

.map-description {
  margin: 0;
  margin-top: 0.7rem;
}

.submit-button {
  font-size: 1rem;
  color: white;
  font-weight: 700;
  min-width: min-content;
  height: 2.5rem;
  border-radius: 7px;
  border: 0;
  background-color: var(--clr-btn);
  text-align: center;

  margin-top: 1rem;
}

button:hover {
  background-color: var(--clr-btn-hover);
  transition: 150ms;
}

button:active {
  background-color: var(--clr-btn-active);
}

.landing-page {
  height: 100%;
}
.wrapper,
.new-user-introduction {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.username-input {
  border-radius: 5px;
  padding: 0.5rem;
}

.welcome-message,
.welcome-msg-new-user {
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
  background: var(--main-bg-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 80%;
}
.text-username {
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 1rem;
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
  height: 10rem;
  max-height: 20%;
  border-radius: 10px;
  background-color: var(--main-card-bg-clr);
  box-shadow: 0px 0px 5px 2px hsla(0, 0%, 50%, 0.3);
  transition: background-color 100ms ease;
}

.flavor-text-map:hover {
  background-color: var(--main-card-bg-clr-hover);
  box-shadow: 0px 0px 7px 0px var(--header-bg-color);
}

.heading-and-description {
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
}

.map-image {
  border-radius: 10px 0 0 10px;
  object-fit: contain;
}
.delete-icon {
  width: 1rem;
  transition: width 100ms ease;
}
.delete-icon:hover {
  width: 1.25rem;
}
.delete-button {
  position: absolute;
  border: none;
  background: transparent;

  bottom: 0.2rem;
  right: 0.2rem;
}
.delete-button:hover {
  background-color: transparent;
}

.add-new-map-button {
  border: none;
  background: transparent;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  border-radius: 90%;
}
.add-new-map-button:hover {
  background: transparent;
}

.add-new-map-icon {
  width: 48px;
  height: 48px;
  background-color: transparent;
  border-radius: 90%;
}

.add-new-map-icon:hover {
  background-color: var(--header-bg-color);
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

.check p {
  margin: 0;
}
</style>
