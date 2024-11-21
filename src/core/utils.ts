import { Matrix } from "./matrix";
import { ASTNode } from "./types";

export function formatAssertionError(expected: any, received: any): string {
    return `
  Expected: ${JSON.stringify(expected, null, 2)}
  Received: ${JSON.stringify(received, null, 2)}
    `.trim();
  }
  
  export function createTestSuite(name: string): TestSuite {
    return new TestSuite(name);
  }
  
  class TestSuite {
    private tests: Array<{ name: string, fn: Function }> = [];
  
    constructor(private name: string) {}
  
    test(name: string, fn: Function): void {
      this.tests.push({ name, fn });
    }
  
    run(): void {
      console.log(`\nRunning suite: ${this.name}`);
      this.tests.forEach(({ name, fn }) => {
        try {
          fn();
          console.log(`  ✓ ${name}`);
        } catch (error) {
          console.log(`  ✗ ${name}\n    ${error.message}`);
        }
      });
    }
  }

  
  
  export function analyzeCoverage(ast: ASTNode, matrix: Matrix): void {
    const traverse = (node: ASTNode) => {
      if (node.type === "Branch") {
        matrix.setBranch(node.branchType as keyof typeof matrix.branches);
      } else if (node.type === "Loop") {
        matrix.setBranch(node.loopType as keyof typeof matrix.branches);
      } else if (node.type === "TryCatch") {
        matrix.setBranch("try");
        matrix.setBranch("catch");
      }
  
      if ("body" in node) {
        (node.body || []).forEach((child) => traverse(child));
      }
    };
  
    traverse(ast);
  }
  