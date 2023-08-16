import { defineStore } from "pinia";

export const useDataStoreTest = defineStore("state", {
  state() {
    return {
      stateData: {},
    };
  },
  actions: {
    fetchApiData() {
      fetch(
        "http://localhost:3000/users/4a3eac09-f652-4d5e-8f4d-691502a71ef6?_embed=maps"
      )
        .then((response) => response.json())
        .then((data) => (this.stateData = data));
    },
  },
});
