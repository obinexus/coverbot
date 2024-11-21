export interface AssertionMatrix {
    truePositive: boolean;
    trueNegative: boolean;
    falsePositive: boolean;
    falseNegative: boolean;
  }
  export interface BranchCoverage {
    if: boolean;
    else: boolean;
    do:boolean;
    while: boolean;
    for: boolean;
    try: boolean;
    catch: boolean;
  }
  
  export class Matrix implements AssertionMatrix {
    truePositive: boolean = false;
    trueNegative: boolean = false;
    falsePositive: boolean = false;
    falseNegative: boolean = false;
    
    branches: BranchCoverage = {
      if: false,
      else: false,
      do: false,
      while: false,
      for: false,
      try: false,
      catch: false
    };
  
    validate(): boolean {
      return this.validateAssertions() && this.validateBranches();
    }
  
    private validateAssertions(): boolean {
      return this.truePositive && 
             this.trueNegative && 
             this.falsePositive && 
             this.falseNegative;
    }
  
    private validateBranches(): boolean {
      return Object.values(this.branches).every(branch => branch);
    }
  
    reset(): void {
      this.truePositive = false;
      this.trueNegative = false;
      this.falsePositive = false;
      this.falseNegative = false;
      Object.keys(this.branches).forEach(key => {
        this.branches[key as keyof BranchCoverage] = false;
      });
    }
  
    setBranch(type: keyof BranchCoverage): void {
      this.branches[type] = true;
    }
  }