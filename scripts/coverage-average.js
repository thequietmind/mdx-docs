import { readFileSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";

// Read the coverage summary JSON file
const coveragePath = join(process.cwd(), "coverage", "coverage-summary.json");

try {
  const coverageData = JSON.parse(readFileSync(coveragePath, "utf-8"));

  // Read vitest config to get thresholds
  let thresholds = {
    lines: 80,
    statements: 80,
    functions: 80,
    branches: 80
  };

  try {
    const vitestConfigPath = pathToFileURL(join(process.cwd(), "vitest.config.js"));
    const vitestConfig = await import(vitestConfigPath);
    if (vitestConfig.default?.test?.coverage?.thresholds) {
      thresholds = vitestConfig.default.test.coverage.thresholds;
    }
  } catch (error) {
    console.warn("Could not read vitest.config.js, using default thresholds");
  }

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

  // ANSI color codes
  const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    reset: '\x1b[0m'
  };

  // Helper function to colorize based on percentage and metric type
  const colorize = (metricType, value, text) => {
    const threshold = thresholds[metricType] || 80;
    const color = value >= threshold ? colors.green : colors.red;
    return `${color}${text}${colors.reset}`;
  };

  // Calculate average threshold for the average line
  const avgThreshold = (thresholds.lines + thresholds.statements + thresholds.functions + thresholds.branches) / 4;

  // Output results
  console.log("\n========================================");
  console.log("Coverage Summary:");
  console.log("========================================");
  console.log(colorize('lines', metrics.lines, `Lines:      ${metrics.lines.toFixed(2)}%`));
  console.log(colorize('statements', metrics.statements, `Statements: ${metrics.statements.toFixed(2)}%`));
  console.log(colorize('functions', metrics.functions, `Functions:  ${metrics.functions.toFixed(2)}%`));
  console.log(colorize('branches', metrics.branches, `Branches:   ${metrics.branches.toFixed(2)}%`));
  console.log("----------------------------------------");
  console.log(`${average >= avgThreshold ? colors.green : colors.red}Average:    ${average.toFixed(2)}%${colors.reset}`);
  console.log("========================================\n");
} catch (error) {
  console.error("Error reading coverage data:", error.message);
  console.error('Make sure to run "npm run test:coverage" first');
  process.exit(1);
}
