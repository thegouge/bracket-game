import blankImage from "./assets/blank.jpg";

export const store = {
	players: [],
	rounds: [],
	initPlayers(numPlayers) {
		for (let i = 0; i < numPlayers; i++) {
			this.players.push({
				name: `Player ${i + 1}`,
				id: i,
				icon: blankImage,
			});
		}
		this.initRounds();
	},
	updatePlayerImage(index, image) {
		this.players[index].icon = image;
	},
	initRounds() {
		const numPlayers = this.players.length;
		const maxRounds = Math.sqrt(numPlayers);
		let roundMatches = numPlayers;
		let counter = 0;

		for (let i = 0; i < maxRounds; i++) {
			roundMatches /= 2;
			const matches = [];

			for (let j = 0; j < roundMatches + 1; j += 2) {
				matches.push({
					id: counter++,
					winner: "",
					round: i,
					players: this.rounds[i - 1]
						? [
								{
									name: `winner of ${this.rounds[i - 1].matches[j].id + 1}`,
									id: 0,
								},
								{
									name: `winner of ${this.rounds[i - 1].matches[j + 1].id + 1}`,
									id: 1,
								},
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ]
						: [this.players[j], this.players[j + 1]],
				});
			}

			this.rounds.push({
				number: i + 1,
				matches,
			});
		}
	},
	lockWinner(round, match, player) {
		this.rounds[round].matches[match].winner = player;
	},
};
