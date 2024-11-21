// tests/core/runner.test.ts
import { TestRunner } from '../../src/core/runner';
import { Assertions } from '../../src/core/assertions';

export function testRunner() {
  const runner = new TestRunner();

  runner.add('Simple Pass Test', (assert: Assertions) => {
    assert.expect(1 + 1).toBe(2);
  });

  runner.add('Simple Fail Test', (assert: Assertions) => {
    try {
      assert.expect(1 + 1).toBe(3);
    } catch (error) {
      if (!error.message.includes('Expected 3 but got 2')) {
        throw new Error('Test failed, but error message was incorrect');
      }
    }
  });

  runner.run().catch((error) => {
    console.error('Test Runner failed:', error);
  });
}
