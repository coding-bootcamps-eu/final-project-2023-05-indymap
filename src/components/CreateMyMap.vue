<template>
  <div class="container">
    <h1 class="title">Indymap</h1>
    <div class="input-group">
      <i class="fas fa-map-marker-alt"></i>
      <input
        type="text"
        v-model="mapLocation"
        placeholder="Ort auf Google Maps"
      />
    </div>
    <div class="input-group">
      <i class="fas fa-pen"></i>
      <input type="text" v-model="note" placeholder="Kurzbeschreibung" />
    </div>
    <div class="input-group">
      <i class="fas fa-location-arrow"></i>
      <input type="text" v-model="userLocation" placeholder="Dein Standort" />
    </div>
    <button @click="createMap">Go!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapLocation: "",
      note: "",
      userLocation: "",
    };
  },
  methods: {
    createMap() {
      // der Code für das Erstellen der Karte
      const apiUrl = "http://localhost:3000/maps";

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Code, um die empfangenen Daten zu verarbeiten und anzuzeigen
          console.log(data);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Daten:", error);
        });
    },
  },
};
</script>

<style scoped>
/*kompletter CSS-Code  */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.container {
  background-color: #c4edd6;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-group i {
  margin-right: 10px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: 1px solid #a3c6b3;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ffffff;
  color: #333;
}

button {
  background-color: #52b788;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #338f5d;
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }

  .input-group input {
    font-size: 18px;
  }
}
</style>
