<template>
  <main>
    <ul>
      <li v-for="match in matches" :key="match.id">
        <Match :index="match.id" />
      </li>
    </ul>
  </main>
</template>

<script>
import Match from "./Match";

import { store } from "../store";

export default {
  name: "Bracket",
  components: {
    Match
  },
  props: {
    numPlayers: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      players: store.players,
      matches: store.matches
    };
  },
  computed: {
    rounds() {
      return Math.sqrt(this.numPlayers);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 1rem;
}
</style>
