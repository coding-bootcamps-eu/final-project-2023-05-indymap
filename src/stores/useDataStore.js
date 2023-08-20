import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateMaps: {},
      statePins: {},
      currentMap: "7220e93a-804f-4c9e-880a-8e53e429c1b3",
      currentPin: "",
      currentPinId: "60ab73fa-1737-4e65-9c0d-dc9c5fc6b3c1",
      newPin: false,
      newPinLocation: {},
    };
  },
  actions: {
    /* Gets Map Data for one User */
    fetchUserMaps(userID) {
      fetch(`http://localhost:3000/users/${userID}?_embed=maps`)
        .then((response) => response.json())
        .then((data) => (this.stateMaps = data));
    },

    fetchMapPins(mapID) {
      fetch(`http://localhost:3000/maps/${mapID}?_embed=pins`)
        .then((response) => response.json())
        .then((data) => (this.statePins = data));
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

    createNewMap(mapTitle, mapDescription, userID) {
      fetch("http://localhost:3000/maps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          mapTitle: mapTitle,
          mapDescription: mapDescription,
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

    createNewPin(header, description, geoLocation, mapId) {
      fetch("http://localhost:3000/pins", {
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
      fetch(`http://localhost:3000/pins/${pinId}`, {
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
      fetch(`http://localhost:3000/pins/${pinID}`, {
        method: "DELETE",
      }).then((response) => response.json());
    },
  },
});
