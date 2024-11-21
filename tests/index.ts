import { TestRunner } from '../src/core/runner';
import './matrix.test';
import './assertions.test';
import './runner.test';
import './utils.test';

const runner = new TestRunner();
runner.run().catch(console.error);