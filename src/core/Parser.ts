import { ASTNode, BranchNode, LoopNode, ProgramNode, TryCatchNode } from "./types";

export function parse(tokens: Token[]): ASTNode {
    const stack: any[] = []; // Stack for parser
    const root: ProgramNode = { type: "Program", body: [] };
  
    const reduce = () => {
      const top = stack.pop();
  
      if (top.type === "if" || top.type === "else") {
        const body: ASTNode[] = [];
        while (stack.length && stack[stack.length - 1].type !== "{") {
          body.unshift(stack.pop());
        }
        stack.pop(); // Remove "{"
        const node: BranchNode = {
          type: "Branch",
          branchType: top.type,
          body,
        };
        stack.push(node);
      } else if (top.type === "while" || top.type === "do" || top.type === "for") {
        const body: ASTNode[] = [];
        while (stack.length && stack[stack.length - 1].type !== "{") {
          body.unshift(stack.pop());
        }
        stack.pop(); // Remove "{"
        const node: LoopNode = {
          type: "Loop",
          loopType: top.type,
          body,
        };
        stack.push(node);
      } else if (top.type === "try" || top.type === "catch") {
        const body: ASTNode[] = [];
        while (stack.length && stack[stack.length - 1].type !== "{") {
          body.unshift(stack.pop());
        }
        stack.pop(); // Remove "{"
        const node: TryCatchNode = {
          type: "TryCatch",
          tryBody: top.type === "try" ? body : [],
          catchBody: top.type === "catch" ? body : [],
        };
        stack.push(node);
      }
    };
  
    tokens.forEach((token) => {
      if (token.type === "{" || token.type === "}") {
        if (token.type === "}") {
          reduce();
        }
      } else {
        stack.push({ type: token.type });
      }
    });
  
    while (stack.length) {
      root.body.push(stack.pop());
    }
  
    return root;
  }
  