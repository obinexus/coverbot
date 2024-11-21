export type ASTNode =
  | ProgramNode
  | BranchNode
  | LoopNode
  | TryCatchNode;

export interface ProgramNode {
  type: "Program";
  body: ASTNode[];
}
export interface Token {
    type: string;
    value: string;
  }
  
export interface BranchNode {
  type: "Branch";
  branchType: "if" | "else";
  condition?: string;
  body: ASTNode[];
}

export interface LoopNode {
  type: "Loop";
  loopType: "while" | "do" | "for";
  body: ASTNode[];
}

export interface TryCatchNode {
  type: "TryCatch";
  tryBody: ASTNode[];
  catchBody: ASTNode[];
}
