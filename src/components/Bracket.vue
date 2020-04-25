<template>
  <main>
    <ul>
      <li v-for="player in players" :key="player.id">
        <Player :player="player" />
      </li>
    </ul>
  </main>
</template>

<script>
// import Match from "./Match";
import Player from "./Player";

import blankImage from "../assets/blank.jpg";

export default {
  name: "Bracket",
  components: {
    // Match,
    Player
  },
  props: {
    numPlayers: {
      type: Number,
      required: true
    }
  },
  computed: {
    matches() {
      return this.numPlayers - 1;
    },
    rounds() {
      return Math.sqrt(this.numPlayers);
    },
    players() {
      const result = [];
      for (let i = 0; i < this.numPlayers; i++) {
        result[i] = { name: "", id: i, icon: blankImage };
      }
      return result;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
