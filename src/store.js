import blankImage from "./assets/blank.jpg";

export const store = {
	players: [],
	matches: [],
	initPlayers(numPlayers) {
		for (let i = 0; i < numPlayers; i++) {
			this.players.push({
				name: "",
				id: i,
				icon: blankImage,
			});
		}
		this.initMatches();
	},
	updatePlayerImage(index, image) {
		this.players[index].icon = image;
	},
	initMatches() {
		let counter = 0;
		const total = this.players.length;
		for (let i = 0; i < total; i++) {
			if (this.players[i]) {
				this.matches.push({
					id: counter++,
					winner: "",
					versus: [this.players[i], this.players[i + 1]],
				});
				i++;
			} else {
				// this.matches.push({
				//   id: counter++,
				// 	winner: "",
				// 	versus: [this.matches[].winner, this.matches[].winner],
				// });
			}
		}
		console.log(this.matches);
	},
};
