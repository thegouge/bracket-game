<template>
  <main>
    <h1 v-if="champ">{{champ}} has won the tournament!</h1>
    <Round
      v-for="round in rounds"
      :key="`round-${round.number}`"
      :round="round"
      @champ="handleChamp"
    />
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
      rounds: store.rounds,
      champ: false
    };
  },
  methods: {
    handleChamp(champ) {
      this.champ = champ;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  text-align: center;
}
</style>
