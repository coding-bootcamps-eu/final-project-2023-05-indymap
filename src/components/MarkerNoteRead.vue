<template>
  <section class="marker-container">
    <router-link class="router-link router-link-map-view" to="/about">
      <img
        class="icon-left"
        :src="require('@/assets/icons/arrow-left-circle.svg')"
        alt="arrow pointing left"
    /></router-link>

    <h2 class="marker-headline">
      {{ pinData[0].header }}
    </h2>
    <p class="marker-text">
      {{ pinData[0].description }}
    </p>
    <!-- <img src="https://picsum.photos/300/200" alt="image of something amazing" /> -->

    <router-link class="router-link router-link-edit-marker" to="/about"
      ><button>Edit Marker</button></router-link
    >

    <router-link class="router-link router-link-delete-marker" to="/about"
      ><button @click="deleteMarker">Delete Marker</button></router-link
    >
    <!-- <button @click="testStuff">Test</button> -->
  </section>
</template>

<script>
import { useDataStoreTest } from "@/stores/useDataStore";

export default {
  name: "MarkerNoteRead",
  setup() {
    const dataStore = useDataStoreTest();
    const mapData = dataStore.stateData.maps.filter(
      (map) => map.id === "7220e93a-804f-4c9e-880a-8e53e429c1b3"
    );
    console.log(mapData);
    console.log(mapData[0].pins[0]);
    const pinData = mapData[0].pins.filter((pin) => pin.id === 1);
    return {
      pinData,
    };
    // let mapData = dataStore.stateData.maps.filter(
    //   (map) => map.id === "7220e93a-804f-4c9e-880a-8e53e429c1b3"
    // );
    // // let pinData = mapData[0].pins.filter((pin) => pin.id === 1);
    // return {
    //   mapData,
    // };
  },
  methods: {
    deleteMarker() {
      // delete marker from API / storage
    },
    testStuff() {
      // console.log(this.currentData);
      // console.log(this.dataStore.stateData);
      // const mapData = this.dataStore.stateData.maps.filter(
      //   (map) => map.id === "7220e93a-804f-4c9e-880a-8e53e429c1b3"
      // );
      // console.log(mapData);
      // console.log(mapData[0].pins[0]);
      // const pinData = mapData[0].pins.filter((pin) => pin.id === 1);
      // console.log(pinData);
      // console.log(pinData[0].header);
      // console.log(mapData.pins[0]);
    },
  },
  computed: {},
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
