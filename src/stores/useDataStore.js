import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateData: {},
      currentMap: "",
    };
  },
  actions: {
    /* Gets Map Data for one User */
    fetchApiData(userID) {
      fetch(`http://localhost:3000/users/${userID}?_embed=maps`)
        .then((response) => response.json())
        .then((data) => (this.stateData = data));
    },

    createNewUser(userName) {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          useDarkMode: false,
        }),
      })
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem("userID", JSON.stringify(data.id))
        );
    },

    createNewMap(mapTitle, mapDescripion, userID) {
      fetch("http://localhost:3000/maps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          mapTitle: mapTitle,
          mapDescripion: mapDescripion,
        }),
      })
        .then((response) => response.json())
        .then((data) => (this.currentMap = data.id));
    },

    deleteMap(mapID) {
      fetch(`http://localhost:3000/maps/${mapID}`, {
        method: "DELETE",
      }).then((response) => response.json());
    },
  },
});
