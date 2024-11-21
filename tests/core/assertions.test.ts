// tests/core/assertions.test.ts
import { Assertions } from '../../src/core/assertions';
import { Matrix } from '../../src/core/matrix';

export function testAssertions() {
  const matrix = new Matrix();
  const assertions = new Assertions();
  assertions.matrix = matrix;

  // True Positive
  const positiveResult = assertions.expect(true).toBe(true);
  if (!positiveResult.passed) {
    throw new Error(`Expected assertion to pass, but it failed: ${positiveResult.message}`);
  }

  // True Negative
  const negativeResult = assertions.expect(false).not().toBe(true);
  if (!negativeResult.passed) {
    throw new Error(`Expected negative assertion to pass, but it failed: ${negativeResult.message}`);
  }

  // False Positive
  try {
    assertions.expect(false).toBe(true);
  } catch {
    matrix.falsePositive = true;
  }

  // False Negative
  try {
    assertions.expect(true).not().toBe(true);
  } catch {
    matrix.falseNegative = true;
  }

  // Validate matrix state
  if (!matrix.falsePositive || !matrix.falseNegative) {
    throw new Error('Matrix coverage flags not set correctly');
  }
}
