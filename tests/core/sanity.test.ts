// tests/core/sanity.test.ts
import { Assertions, TestRunner } from '../../src';

export function sanityTest() {
  const runner = new TestRunner();

  runner.add('Sanity Test', (assert: Assertions) => {
    // True Positive
    assert.expect(true).toBe(true);

    // True Negative
    assert.expect(false).not().toBe(true);

    // False Positive
    try {
      assert.expect(false).toBe(true);
    } catch (error) {
      assert.matrix.falsePositive = true;
    }

    // False Negative
    try {
      assert.expect(true).not().toBe(true);
    } catch (error) {
      assert.matrix.falseNegative = true;
    }
  });

  runner.run().catch((error) => {
    console.error('Sanity Test failed:', error);
  });
}
