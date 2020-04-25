<template>
  <div></div>
</template>

<script>
// import Player from "./Player";

export default {
  name: "Match",
  components: {
    // Player,
  },
  props: {
    remainingPlayers: {
      type: Number,
      required: true
    }
  },
  computed: {
    childMatches() {
      return this.remainingPlayers / 2;
    }
  }
};
</script>

<style></style>
