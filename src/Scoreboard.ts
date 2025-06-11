type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: number;
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
      startTime: Date.now(),
    };

    this.matches.push(match);
  }

  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalA = a.homeScore + a.awayScore;
      const totalB = b.homeScore + b.awayScore;

      if (totalA !== totalB) {
        return totalB - totalA;
      }

      return b.startTime - a.startTime;
    });
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void {
    const match = this.matches.find(
      m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );

    if (!match) {
      throw new Error("Match not found");
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(homeTeam: string, awayTeam: string): void {
    const matchIndex = this.matches.findIndex(
      m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
    );

    if (matchIndex === -1) {
      throw new Error("Match not found");
    }

    this.matches.splice(matchIndex, 1);
  }
}
