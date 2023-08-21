import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateMaps: {},
      statePins: {},
      currentMapId: "7220e93a-804f-4c9e-880a-8e53e429c1b3",
      currentPinId: "9623d39d-55f4-434f-bd31-3c776952d7a4",
      newPin: false,
      newPinLocation: {},
    };
  },
  actions: {
    /* Gets Map Data for one User */
    fetchUserMaps(userID) {
      fetch(
        `https://23-mai.indymap.api.cbe.uber.space/users/${userID}?_embed=maps`
      )
        .then((response) => response.json())
        .then((data) => (this.stateMaps = data));
    },

    fetchMapPins(mapID) {
      fetch(
        `https://23-mai.indymap.api.cbe.uber.space/maps/${mapID}?_embed=pins`
      )
        .then((response) => response.json())
        .then((data) => (this.statePins = data));
    },

    createNewUser(userName) {
      fetch("https://23-mai.indymap.api.cbe.uber.space/users", {
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
      fetch("https://23-mai.indymap.api.cbe.uber.space/maps", {
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
      fetch(`https://23-mai.indymap.api.cbe.uber.space/maps/${mapID}`, {
        method: "DELETE",
      }).then((response) => response.json());
    },

    createNewPin(header, description, geoLocation, mapId) {
      fetch("https://23-mai.indymap.api.cbe.uber.space/pins", {
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
      fetch(`https://23-mai.indymap.api.cbe.uber.space/pins/${pinId}`, {
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
      fetch(`https://23-mai.indymap.api.cbe.uber.space/pins/${pinID}`, {
        method: "DELETE",
      }).then((response) => response.json());
    },
  },
});
