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
});
