<template>
  <div id="app">
    <Create v-if="bracketSize < 1" @create-bracket="initBracket" />
    <Bracket v-else :numPlayers="this.bracketSize" />
  </div>
</template>

<script>
import Create from "./components/Create";
import Bracket from "./components/Bracket";

import { store } from "./store";

export default {
  name: "App",
  components: {
    Create,
    Bracket
  },
  data() {
    return {
      bracketSize: 0,
      players: []
    };
  },
  methods: {
    initBracket(payload) {
      const numPlayers = parseInt(payload);
      store.initPlayers(numPlayers);
      this.bracketSize = numPlayers;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
