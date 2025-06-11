type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string) {
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
