import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateData: {},
    };
  },
});
