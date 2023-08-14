import { defineStore } from "pinia";

export const useDataStore = defineStore("state", {
  state() {
    return {
      stateData: {
        dummyMarker1: {
          headline: "This is a maker",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
        },
      },
    };
  },
});
