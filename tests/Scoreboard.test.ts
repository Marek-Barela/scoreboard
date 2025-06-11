import { Scoreboard } from "../src/Scoreboard";

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
});
