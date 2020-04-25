<template>
	<div id="app">
		<Create v-if="start" @create-bracket="initBracket" />
		<Bracket v-else :numPlayers="this.bracketSize" />
	</div>
</template>

<script>
import Create from "./components/Create";
import Bracket from "./components/Bracket";

export default {
	name: "App",
	components: {
		Create,
		Bracket,
	},
	data() {
		return {
			start: true,
			bracketSize: 0,
		};
	},
	methods: {
		initBracket(payload) {
			this.bracketSize = parseInt(payload);
			this.start = false;
		},
	},
};
</script>

<style></style>
