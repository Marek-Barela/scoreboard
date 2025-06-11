# Scoreboard Library

Simple TypeScript library for managing football matches in memory.
Built with TDD, tested with Jest, and ready to be reused or extended.

## 🚀 Usage

```ts
const scoreboard = new Scoreboard();

scoreboard.startMatch("Poland", "Germany");
scoreboard.updateScore("Poland", "Germany", 2, 1);
scoreboard.finishMatch("Poland", "Germany");

const summary = scoreboard.getSummary();
console.log(summary);
```

## 🧪 Development

```bash
npm install
npm test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## 📂 Structure

```
/src            ← Scoreboard logic
/tests          ← Unit tests
/utils          ← Shared helpers (e.g., delay)
README.md
tsconfig.json
jest.config.js
```

## 📝 Notes

- Designed using test-driven development (TDD)
- Sorted summary logic: total score desc, then recency
- Commit history reflects incremental development
