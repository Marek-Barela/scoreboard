type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): void {
    const exists = this.matches.some(
      match => match.homeTeam === homeTeam && match.awayTeam === awayTeam
    );

    if (exists) {
      throw new Error("Match already started");
    }

    const match: Match = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
    };

    this.matches.push(match);
  }

  getSummary() {
    return this.matches;
  }
}
