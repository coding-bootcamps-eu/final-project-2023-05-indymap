<template>
  <header>
    <h1 class="title">IndyMap</h1>
    <input type="checkbox" id="burgerMenu" />
    <label id="burger" for="burgerMenu">
      <div></div>
      <div></div>
      <div></div>
    </label>
    <nav id="menu">
      <div class="wrapper">
        <h2 class="nav__title">Map Overview</h2>
        <ul class="map__list">
          <li
            v-for="map in dataStore.stateMaps.maps"
            :key="map.id"
            @click="loadDifferentMap(map.id)"
          >
            {{ map.mapTitle }}
          </li>
        </ul>
      </div>
      <button class="back-to-home" @click="$router.push('/')">
        Back to Main Menu
      </button>
    </nav>
  </header>
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
    loadDifferentMap(mapId) {
      this.dataStore.currentMapId = mapId;
      this.dataStore.fetchMapPins(mapId);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #eee; */
  height: 5rem;
  padding-inline: 1rem;
  font-family: var(--font-header);
  background-color: var(--header-bg-color);
}

.title {
  margin: 0;
  color: var(--clr-text-header);
}

.burger-wrapper {
  cursor: pointer;
}
#menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 8000;
  background: hsl(0, 0%, 20%);
  width: 50vmin;
  height: 100%;
  position: fixed;
  right: 0;
  transition-timing-function: cubic-bezier(10, 2, 3, 1);
  transform: translateX(50vmin);
  top: 0;
  transition: 0.5s;
}
#burgerMenu {
  display: none;
}

#burgerMenu:checked ~ #menu {
  transform: translateX(0rem);
}

#burger {
  position: absolute;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  right: 1rem;
  top: 1.25rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  z-index: 8001;
}

#burger > div {
  height: 2px;
  background-color: #000;
  transition: 0.5s;
  z-index: 999;
}

#burgerMenu:checked ~ #burger > div {
  background-color: #fff;
}

#burgerMenu:checked ~ #burger > div:nth-child(1) {
  transform: translateY(15px) rotate(45deg);
}
#burgerMenu:checked ~ #burger > div:nth-child(2) {
  opacity: 0;
}
#burgerMenu:checked ~ #burger > div:nth-child(3) {
  transform: translateY(-15px) rotate(-45deg);
}

.nav__title {
  font-size: 24px;
  padding-inline: 2rem;
}

.map__list li {
  padding-inline-start: 2rem;
}

.map__list,
.nav__title {
  color: snow;
}

.map__list {
  padding: 0;
}

.map__list li {
  display: flex;
  height: 2rem;
  list-style-type: none;
  cursor: pointer;
  align-items: center;
}

.map__list li:hover {
  background: hsl(0, 0%, 30%);
}

.back-to-home {
  padding-inline: 2rem;
  padding-block: 0.5rem;
  height: 3rem;
}
</style>
