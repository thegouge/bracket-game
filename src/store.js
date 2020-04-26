export const store = {
	players: [],
	rounds: [],
	champ: false,
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
						? {
								p1: {
									name: `winner of ${lastRound.matches[j].id + 1}`,
									id: -1,
									winnerOf: lastRound.matches[j].id,
								},
								p2: {
									name: `winner of ${lastRound.matches[j + 1].id + 1 || "???"}`,
									id: -2,
									winnerOf: lastRound.matches[j + 1].id,
								},
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: { p1: this.players[j], p2: this.players[j + 1] },
				});
			}

			this.rounds.push({
				number: i + 1,
				matches,
			});
		}
	},
	lockWinner(round, match, player) {
		const currMatch = this.rounds[round].matches[match] || false;
		if (!currMatch) {
			this.champ = player;
			return;
		}
		currMatch.winner = player;
		this.rounds[round + 1].matches.some((match) => {
			if (match.players.p1.winnerOf === currMatch.id) {
				match.players.p1 = player;
				return true;
			} else if (match.players.p2.winnerOf === currMatch.id) {
				match.players.p2 = player;
				return true;
			}
			return false;
		}, this.rounds[round + 1].matches);
	},
};
