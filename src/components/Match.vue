<template>
  <li class="match" :id="deets.id">
    <p>{{deets.id + 1}}</p>
    <div class="players">
      <Player :player="deets.players.p1" />
      <Player :player="deets.players.p2" />
    </div>
    <select v-if="!readonly" class="winner" :id="`${deets.id}-winner`" @change="pickWinner">
      <option value selected>winner</option>
      <option
        v-for="player in players"
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
      picked: false,
      players: this.deets.players
    };
  },
  computed: {
    readonly: {
      get() {
        return this.deets.players.p1.id < 0 && this.deets.players.p2.id < 0;
      },
      set(newValue) {
        return newValue;
      }
    }
  },
  methods: {
    pickWinner(e) {
      this.picked = store.players[e.target.value];
    },
    confirmWinner() {
      store.lockWinner(this.deets.round, this.deets.id, this.picked);
      this.$set(
        this.players,
        "players",
        store.rounds[this.deets.round].matches[this.deets.id].players
      );
      this.picked = false;
    }
  },
  beforeUpdate() {
    console.log("updating Match!");
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
