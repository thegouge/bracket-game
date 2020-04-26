<template>
  <main>
    <Round v-for="round in rounds" :key="`round-${round.number}`" :round="round" />
  </main>
</template>

<script>
import Round from "./Round";

import { store } from "../store";

export default {
  name: "Bracket",
  components: {
    Round
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
      rounds: store.rounds
    };
  }
};
</script>

<style scoped>
main {
  display: flex;
  text-align: center;
}
</style>
