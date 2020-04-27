<template>
  <li class="match" :id="deets.id">
    <div v-if="deets.round > 0" class="next-line"></div>
    <p>{{deets.id}}</p>
    <div class="players">
      <Player
        class="player1"
        :player="deets.players.p1"
        :style="`border-top-right-radius: ${hideDdown ? 'var(--radius)' : ''};`"
      />
      <Player
        class="player2"
        :player="deets.players.p2"
        :style="`border-bottom-right-radius: ${hideDdown ? 'var(--radius)' : ''};`"
      />
    </div>
    <select v-if="!hideDdown" class="winner" :id="`${deets.id}-winner`" @change="pickWinner">
      <option value selected>winner</option>
      <option
        v-for="player in players"
        :key="`${player.id}-option`"
        :value="player.id"
      >{{player.name}}</option>
    </select>
    <button class="confirmation" v-if="picked" @click="confirmWinner">Game Master Confirm</button>
    <div
      v-if="deets.id.charCodeAt(0) % 2 === 0"
      class="bracket-line"
      :style="`height: ${bracketDistance / matches}%;`"
    ></div>
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
    },
    matches: {
      type: Number,
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
    hideDdown() {
      return this.deets.players.p1.id < 0 || this.deets.players.p2.id < 0;
    },
    bracketDistance() {
      const numPlayers = store.players.length;
      switch (numPlayers) {
        case 4:
          return 332;

        case 8:
          return 540;

        case 16:
          return 950;

        default:
          return 1;
      }
    }
  },
  methods: {
    pickWinner(e) {
      this.picked = store.players[e.target.value];
    },
    confirmWinner() {
      store.lockWinner(this.deets.round, this.deets.id, this.picked);
      this.$set(this.players, "players", this.deets.players);
      if (store.champ) {
        this.$emit("champ", this.picked);
      }
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
  --radius: 5px;
  --line-color: 1px solid grey;

  position: relative;
  display: flex;
  align-content: center;
  border: var(--line-color);
  border-radius: var(--radius);
}

.players {
  height: fit-content;
}

.player1 {
  border-bottom: var(--line-color);
  border-left: var(--line-color);
  background-color: rgb(165, 243, 165);
}

.player2 {
  border-left: var(--line-color);
  background-color: rgb(255, 255, 193);
}

p {
  margin: auto;
  padding: 0 1rem;
}

select {
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  border-right: none;
  border-top: none;
  border-bottom: none;
}

.confirmation {
  top: 44%;
  left: 25%;
}
.next-line {
  position: relative;
  width: 2.2rem;
  top: -2rem;
  left: -2.2rem;
  border-bottom: var(--line-color);
}
.bracket-line {
  position: absolute;
  width: 2rem;
  right: -2rem;
  bottom: 2rem;
  border-top: var(--line-color);
  border-bottom: var(--line-color);
  border-right: var(--line-color);
}
</style>
