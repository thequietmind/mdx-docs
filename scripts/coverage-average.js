import { readFileSync } from "fs";
import { join } from "path";

// Read the coverage summary JSON file
const coveragePath = join(process.cwd(), "coverage", "coverage-summary.json");

try {
  const coverageData = JSON.parse(readFileSync(coveragePath, "utf-8"));

  // Get the total coverage metrics
  const total = coverageData.total;

  if (!total) {
    console.error("No total coverage data found");
    process.exit(1);
  }

  // Extract percentages
  const metrics = {
    lines: total.lines.pct,
    statements: total.statements.pct,
    functions: total.functions.pct,
    branches: total.branches.pct,
  };

  // Calculate average
  const average =
    (metrics.lines +
      metrics.statements +
      metrics.functions +
      metrics.branches) /
    4;

  // Output results
  console.log("\n========================================");
  console.log("Coverage Summary:");
  console.log("========================================");
  console.log(`Lines:      ${metrics.lines.toFixed(2)}%`);
  console.log(`Statements: ${metrics.statements.toFixed(2)}%`);
  console.log(`Functions:  ${metrics.functions.toFixed(2)}%`);
  console.log(`Branches:   ${metrics.branches.toFixed(2)}%`);
  console.log("----------------------------------------");
  console.log(`Average:    ${average.toFixed(2)}%`);
  console.log("========================================\n");
} catch (error) {
  console.error("Error reading coverage data:", error.message);
  console.error('Make sure to run "npm run test:coverage" first');
  process.exit(1);
}
