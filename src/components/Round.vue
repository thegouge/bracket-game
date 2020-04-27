<template>
  <div class="round">
    <h2>Round {{round.number}}</h2>
    <ul>
      <Match
        v-for="match in round.matches"
        :key="match.id"
        :deets="match"
        :matches="round.matches.length"
        @champ="handleChamp"
      />
    </ul>
  </div>
</template>

<script>
import Match from "./Match";

export default {
  name: "Round",
  components: { Match },
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleChamp(player) {
      this.$emit("champ", player.name);
    }
  }
};
</script>

<style scoped>
.round {
  padding: 0 2rem 5%;
}
h2 {
  margin-bottom: 0;
}
ul {
  height: 100%;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  list-style: none;
}
</style>