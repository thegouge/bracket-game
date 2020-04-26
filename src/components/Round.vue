<template>
  <div>
    <h2>Round {{round.number}}</h2>
    <ul>
      <Match v-for="match in round.matches" :key="match.id" :deets="match" />
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
  }
};
</script>

<style scoped>
ul {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  list-style: none;
  padding: 1rem;
}
</style>