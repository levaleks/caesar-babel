const assert = require('assert');
import { caesar } from '../src/caesar.js';

describe('caesar', function() {
  it('should convert abc to bcd if key is 1', () => {
    assert.equal(caesar('abc', 1), 'bcd')
  });
  // a, 1  => b
  // z, 1  => a
  // ! => !
  // key 356 
})