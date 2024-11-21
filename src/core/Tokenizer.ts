import { Token } from "./types";

  export function tokenize(source: string): Token[] {
    const tokenRegex = /\b(if|else|while|do|for|try|catch)\b|[{()}]/g;
    const tokens: Token[] = [];
    let match;
  
    while ((match = tokenRegex.exec(source)) !== null) {
      tokens.push({ type: match[0], value: match[0] });
    }
  
    return tokens;
  }
  