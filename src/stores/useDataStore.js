import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateMaps: { maps: [] },
      statePins: {},
      currentMapId: "",
      currentPinId: "",
      newPin: false,
      newPinLocation: {},
      existingUser: false,
      userId: "",
    };
  },

  actions: {
    checkUser() {
      if (localStorage.getItem("userID")) {
        this.userId = JSON.parse(localStorage.getItem("userID"));
        this.existingUser = true;
      } else {
        this.existingUser = false;
      }
    },

    /* Gets Map Data for one User */
    fetchUserMaps(userID) {
      return fetch(`${process.env.VUE_APP_API_URL}/users/${userID}?_embed=maps`)
        .then((response) => response.json())
        .then((data) => (this.stateMaps = data));
    },

    fetchMapPins(mapID) {
      return fetch(`${process.env.VUE_APP_API_URL}/maps/${mapID}?_embed=pins`)
        .then((response) => response.json())
        .then((data) => (this.statePins = data));
    },

    createNewUser(userName) {
      return fetch(`${process.env.VUE_APP_API_URL}/users`, {
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
        .then((data) => {
          localStorage.setItem("userID", JSON.stringify(data.id));
          this.userId = data.id;
        });
    },

    createNewMap(mapTitle, mapDescription, mapViewLocation, userID) {
      return fetch(`${process.env.VUE_APP_API_URL}/maps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          mapTitle: mapTitle,
          mapDescription: mapDescription,
          mapViewLocation: mapViewLocation,
        }),
      })
        .then((response) => response.json())
        .then((data) => (this.currentMapId = data.id));
    },

    deleteMap(mapID) {
      return fetch(`${process.env.VUE_APP_API_URL}/maps/${mapID}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => window.location.reload());
    },

    createNewPin(header, description, geoLocation, mapId) {
      return fetch(`${process.env.VUE_APP_API_URL}/pins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mapId: mapId,
          header: header,
          description: description,
          geoLocation: geoLocation,
          createdAt: new Date(),
        }),
      })
        .then((response) => response.json())
        .then((data) => (this.currentPinId = data.id));
    },

    editPin(pinId, header, description, geoLocation, mapId) {
      return fetch(`${process.env.VUE_APP_API_URL}/pins/${pinId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mapId: mapId,
          header: header,
          description: description,
          geoLocation: geoLocation,
        }),
      })
        .then((response) => response.json())
        .then((data) => (this.currentMap = data.id));
    },

    deletePin(pinID) {
      return fetch(`${process.env.VUE_APP_API_URL}/pins/${pinID}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => this.fetchMapPins(this.currentMapId));
    },
  },
});
