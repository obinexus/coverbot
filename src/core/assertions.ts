import { AssertionMatrix, BranchCoverage, Matrix } from './matrix';

export interface AssertionResult {
  passed: boolean;
  message: string;
}

  // Enhanced Matrix with Branch Coverage
  interface EnhancedMatrix extends AssertionMatrix {
    branches: BranchCoverage;
    validateBranches(): boolean;
  }
export class Assertions {
  getMatrix() {
    throw new Error('Method not implemented.');
  }
   matrix!: Matrix;

  coverBranch(type: keyof BranchCoverage): void {
    this.matrix.setBranch(type);
  }

  assertBranchFlow(fn: () => void): void {
    if (true) {
      this.matrix.setBranch('if');
    } else {
      this.matrix.setBranch('else');
    }

    do {
      this.matrix.setBranch('do');
      break;
    } while (true);

    while (false) {
      this.matrix.setBranch('while');
    }

    for (let i = 0; i < 1; i++) {
      this.matrix.setBranch('for');
    }

    try {
      this.matrix.setBranch('try');
      fn();
    } catch {
      this.matrix.setBranch('catch');
    }
  }
}

class AssertionBuilder {
  matrix: Matrix;
  value: any;
  constructor( value: any,  matrix: Matrix) {
    this.value = value;
    this.matrix = matrix;

  }

  toBe(expected: any): AssertionResult {
    if (this.value === expected) {
      this.matrix.truePositive = true;
      return { passed: true, message: 'Assertion passed' };
    }
    return { passed: false, message: `Expected ${expected} but got ${this.value}` };
  }

  not(): AssertionBuilder {
    return new NegativeAssertionBuilder(this.value, this.matrix);
  }
}

class NegativeAssertionBuilder extends AssertionBuilder {
  toBe(expected: any): AssertionResult {
    if (this.value !== expected) {
      this.matrix.trueNegative = true;
      return { passed: true, message: 'Negative assertion passed' };
    }
    return { passed: false, message: `Expected ${this.value} to not be ${expected}` };
  }
}