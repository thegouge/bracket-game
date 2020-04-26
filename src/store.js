export const store = {
	players: [],
	rounds: [],
	initPlayers(numPlayers) {
		for (let i = 0; i < numPlayers; i++) {
			this.players.push({
				name: `Player ${i + 1}`,
				id: i,
				icon: "",
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
		let roundMatches = numPlayers * 2;
		let counter = 0;

		for (let i = 0; i < maxRounds; i++) {
			roundMatches /= 2;
			const matches = [];

			for (let j = 0; j < roundMatches; j += 2) {
				const lastRound = this.rounds[i - 1];
				matches.push({
					id: counter++,
					winner: "",
					round: i,
					players: lastRound
						? [
								{
									name: `winner of ${lastRound.matches[j].id + 1}`,
									id: -1,
									winnerOf: lastRound.matches[j].id,
								},
								{
									name: `winner of ${lastRound.matches[j + 1].id + 1 || "???"}`,
									id: -2,
									winnerOf: lastRound.matches[j + 1].id,
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
		const currMatch = this.rounds[round].matches[match];
		currMatch.winner = player;
		this.rounds[round + 1].matches.some((match) => {
			if (match.players[0].winnerOf === currMatch.id) {
				match.players[0] = player;
				return true;
			} else if (match.players[1].winnerOf === currMatch.id) {
				match.players[1] = player;
				return true;
			}
			return false;
		});
	},
};
