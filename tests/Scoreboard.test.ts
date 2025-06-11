import { Scoreboard } from "../src/Scoreboard";
import { delay } from "../utils/delay";

describe("Scoreboard", () => {
  it("should be defined", () => {
    expect(Scoreboard).toBeDefined();
  });

  it("should start a new match and store it with 0-0 score", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Poland", "Germany");
    const summary = scoreboard.getSummary();

    expect(summary).toHaveLength(1);
    expect(summary[0].homeTeam).toBe("Poland");
    expect(summary[0].awayTeam).toBe("Germany");
    expect(summary[0].homeScore).toBe(0);
    expect(summary[0].awayScore).toBe(0);
  });

  it("should not allow the same match to be started twice", () => {
    const scoreboard = new Scoreboard();
    scoreboard.startMatch("Poland", "Germany");

    expect(() => {
      scoreboard.startMatch("Poland", "Germany");
    }).toThrow("Match already started");
  });

  it("should update the score of an existing match", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Poland", "Germany");
    scoreboard.updateScore("Poland", "Germany", 2, 1);
    const summary = scoreboard.getSummary();

    expect(summary[0].homeScore).toBe(2);
    expect(summary[0].awayScore).toBe(1);
  });

  it("should throw an error when updating a non-existent match", () => {
    const scoreboard = new Scoreboard();

    expect(() => {
      scoreboard.updateScore("Spain", "Brazil", 3, 2);
    }).toThrow("Match not found");
  });

  it("should throw an error when trying to finish a non-existent match", () => {
    const scoreboard = new Scoreboard();

    expect(() => {
      scoreboard.finishMatch("Spain", "Brazil");
    }).toThrow("Match not found");
  });

  it("should remove a match from the scoreboard when finished", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Poland", "Germany");
    const summaryBefore = scoreboard.getSummary();
    expect(summaryBefore).toHaveLength(1);

    scoreboard.finishMatch("Poland", "Germany");
    const summaryAfter = scoreboard.getSummary();
    expect(summaryAfter).toHaveLength(0);
  });

  it("should return matches sorted by total score, then by recency if equal", async () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 0, 5);

    await delay(10);
    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore("Spain", "Brazil", 10, 2);

    await delay(10);
    scoreboard.startMatch("Germany", "France");
    scoreboard.updateScore("Germany", "France", 2, 2);

    await delay(10);
    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);

    await delay(10);
    scoreboard.startMatch("Argentina", "Australia");
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    const summary = scoreboard.getSummary();

    expect(summary[0].homeTeam).toBe("Uruguay");
    expect(summary[1].homeTeam).toBe("Spain");
    expect(summary[2].homeTeam).toBe("Mexico");
    expect(summary[3].homeTeam).toBe("Argentina");
    expect(summary[4].homeTeam).toBe("Germany");
  });
});
