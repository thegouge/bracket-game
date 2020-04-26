<template>
  <div class="match" :id="deets.id">
    <p>{{deets.id + 1}}</p>
    <div class="players">
      <Player :player="deets.versus[0]" />
      <Player :player="deets.versus[1]" />
    </div>
    <select
      class="winner"
      :id="`${deets.id}-winner`"
      @change="pickWinner"
      :readonly="this.readonly"
    >
      <option value selected>-</option>
      <option
        v-for="player in deets.versus"
        :key="`${player.id}-option`"
        :value="player.id"
      >{{player.name}}</option>
    </select>
    <button v-if="picked" @click="confirmWinner">Game Master Confirm</button>
  </div>
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
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      deets: store.matches[this.index],
      picked: false,
      readonly: false
    };
  },
  methods: {
    pickWinner() {
      this.picked = true;
    },
    confirmWinner() {
      this.picked = false;
      this.readonly = true;
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
  width: 10%;
  padding: 5%;
}
</style>
