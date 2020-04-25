<template>
	<div>
		<h3>Hello Game master!</h3>
		<label for="size-pick">
			How large would you like your bracket?
			<br />
			<select name="bracket-size" id="size-pick" v-model="bracketSize">
				<option value="4">4</option>
				<option value="8">8</option>
				<option value="16">16</option>
			</select>
			players
		</label>
		<button @click="createBracket(bracketSize)">Create!</button>
	</div>
</template>

<script>
export default {
	name: "Create",
	data() {
		return {
			bracketSize: "4",
		};
	},
	methods: {
		createBracket(size) {
			this.$emit("create-bracket", size);
		},
	},
};
</script>

<style scoped></style>
