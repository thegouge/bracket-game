<template>
  <li class="match" :id="deets.id">
    <p>{{deets.id + 1}}</p>
    <div class="players">
      <Player
        v-for="player in deets.players"
        :key="player.id"
        :player="player"
        :readonly="deets.round >= 1"
      />
    </div>
    <select v-if="!readonly" class="winner" :id="`${deets.id}-winner`" @change="pickWinner">
      <option value selected>-</option>
      <option
        v-for="player in deets.players"
        :key="`${player.id}-option`"
        :value="player.id"
      >{{player.name}}</option>
    </select>
    <button v-if="picked" @click="confirmWinner">Game Master Confirm</button>

    <div class="bracket-lines" v-if="deets.id % 2 === 1"></div>
  </li>
</template>

<script>
import Player from "./Player";

import { store } from "../store";

export default {
  name: "Match",
  components: {
    Player
  },
  props: {
    deets: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      picked: false
    };
  },
  computed: {
    readonly() {
      return this.deets.players[0].id < 0 && this.deets.players[1].id < 0;
    }
  },
  methods: {
    pickWinner(e) {
      this.picked = store.players[e.target.value];
    },
    confirmWinner() {
      this.readonly = true;
      store.lockWinner(this.deets.round, this.deets.id, this.picked);
      this.picked = false;
    }
  }
};
</script>

<style scoped>
.match {
  width: 100%;
  display: flex;
  align-content: center;
  margin-bottom: 0.5rem;
}
p {
  box-sizing: border-box;
  padding: 5%;
}
</style>
