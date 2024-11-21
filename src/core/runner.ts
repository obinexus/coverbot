import { Assertions } from './assertions';

export interface TestCase {
  name: string;
  fn: (assert: Assertions) => void;
}

export class TestRunner {
  tests: any;
  async run(): Promise<void> {
    for (const test of this.tests) {
      const assertions = new Assertions();
      try {
        await Promise.resolve(test.fn(assertions));
        const matrix = assertions.getMatrix();
        
        if (!matrix.validate()) {
          console.error(`❌ ${test.name}: Incomplete coverage`);
          this.reportCoverage(matrix);
          continue;
        }
        console.log(`✅ ${test.name}`);
      } catch (error) {
        console.error(`❌ ${test.name}: ${error.message}`);
      }
    }
  }

  private reportCoverage(matrix: Matrix): void {
    console.log('\nBranch Coverage:');
    Object.entries(matrix.branches).forEach(([branch, covered]) => {
      console.log(`${branch}: ${covered ? '✓' : '✗'}`);
    });
  }
}