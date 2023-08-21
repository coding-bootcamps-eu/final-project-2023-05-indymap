<template>
  <main>
    <div v-if="dataStore.existingUser === false" class="new-user-introduction">
      <p>
        Welcome to Indymap new user. Please tell us your name so that we know
        who you are in the future.
      </p>
      <form>
        <label for="username">Username</label
        ><input type="text" name="username" />
        <button @click.prevent="newUserLink()">Submit</button>
      </form>
    </div>
    <div v-else>
      <h1>Welcome back user, select your map to get started:</h1>
      <div
        class="flavor-text-map"
        :map="dataStore.stateMaps"
        :key="map.id"
        v-for="map in dataStore.stateMaps.maps"
      >
        <img src="https://picsum.photos/seed/picsum/100/100" alt="map" />
        <div class="heading-and-description">
          <h2>{{ map.mapTitle }}</h2>
          <p>{{ map.mapDescription }}</p>
          <button class="delete-button">Delete map</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useDataStore } from "@/stores/useDataStore";

export default {
  setup() {
    const dataStore = useDataStore();

    return {
      dataStore,
    };
  },
  methods: {
    newUserLink() {
      const userName = document.querySelector("input").value;
      this.dataStore
        .createNewUser(userName)
        .then(() => this.$router.push("/new-map"));
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
h1 {
  font-size: 1.5rem;
}
h2 {
  font-size: 1rem;
}
.flavor-text-map {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.heading-and-description {
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
}
.delete-button {
  font-size: 0.5rem;
}
</style>
