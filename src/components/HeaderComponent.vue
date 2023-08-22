<template>
  <header ref="targetElement">
    <h1 class="title" @click="backToHome()">IndyMap</h1>
    <input type="checkbox" id="burgerMenu" v-model="checkboxChecked" />
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
            :class="{ active: map.id === dataStore.currentMapId }"
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
  data() {
    return {
      checkboxChecked: false,
    };
  },
  methods: {
    toggleBurgerMenu() {
      if (this.checkboxChecked === true) {
        this.checkboxChecked = false;
      } else if (this.checkboxChecked === false) {
        this.checkboxChecked = true;
      }
    },

    closeBurgerMenu() {
      this.checkboxChecked = false;
    },

    loadDifferentMap(mapId) {
      this.$router.push({ name: "map", params: { id: mapId } });
      /*       this.dataStore.currentMapId = mapId; */
      this.dataStore.fetchMapPins(mapId);
      this.toggleBurgerMenu();
    },

    backToHome() {
      this.$router.push("/");
    },
    handleClickOutside(event) {
      const targetElement = this.$refs.targetElement;
      if (!targetElement.contains(event.target)) {
        this.closeBurgerMenu();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
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
  cursor: pointer;
}

.active {
  background-color: var(--main-accent-color);
}

.burger-wrapper {
  cursor: pointer;
}
#menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 8000;
  background: var(--clr-green-darker);
  width: 50vmin;
  height: 100%;
  position: fixed;
  right: 0;
  transition-timing-function: cubic-bezier(10, 2, 3, 1);
  transform: translateX(50vmin);
  top: 0;
  transition: 0.5s;
  background-color: var(--header-sidebar-bg-color);
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
  background-color: var(--clr-text-header);
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
  padding-bottom: 0.8rem;
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
  background: var(--main-accent-color);
}

.back-to-home {
  font-size: 1rem;
  color: white;
  font-weight: 700;
  width: 80%;
  height: 3.25rem;
  border-radius: 7px;
  border: none;
  background-color: var(--clr-btn-on-header);
  text-align: center;
  margin-block: 1rem;
  margin-inline: auto;
}
.back-to-home:hover {
  background-color: var(--clr-btn-hover);
}
</style>
