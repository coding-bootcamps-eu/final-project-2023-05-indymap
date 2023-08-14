import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateData: {
        dummyMarker1: {
          headline: "This is a marker",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer...",
        },
      },
    };
  },
});
