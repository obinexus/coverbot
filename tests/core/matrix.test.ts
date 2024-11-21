// tests/core/matrix.test.ts
import { Matrix } from '../../src/core/matrix';

export function testMatrix() {
  const matrix = new Matrix();

  // Initial state validation
  if (matrix.validate()) {
    throw new Error('New matrix should not be valid');
  }

  // Setting all coverage flags
  matrix.truePositive = true;
  matrix.trueNegative = true;
  matrix.falsePositive = true;
  matrix.falseNegative = true;

  if (!matrix.validate()) {
    throw new Error('Complete matrix should be valid');
  }

  // Resetting the matrix
  matrix.reset();

  // Validate reset state
  if (matrix.validate()) {
    throw new Error('Reset matrix should not be valid');
  }
}
