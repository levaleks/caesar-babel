const { assert } = require('chai');
import CaesarCipher from '../src/caesar.js';

describe('Test the CaesarCipher class', function() {
  describe('Test constructor with shifts of invalid type', function() {
    it('should throw TypeError for decimal', function() {
      assert.throws(() => new CaesarCipher(Number.MIN_VALUE), TypeError);
    });

    it('should throw TypeError for string', function() {
      assert.throws(() => new CaesarCipher(''), TypeError);
    });

    it('should throw TypeError for symbol', function() {
      assert.throws(() => new CaesarCipher(Symbol('foo')), TypeError);
    });

    it('should throw TypeError for boolean', function() {
      assert.throws(() => new CaesarCipher(true), TypeError);
    });

    it('should throw TypeError for object', function() {
      assert.throws(() => new CaesarCipher({}), TypeError);
    });
  });

  describe('Test constructor with out-of-range shift', function() {
    it('should throw RangeError for argument lower than 0', function() {
      assert.throws(() => new CaesarCipher(-1), RangeError);
    });
  });

  describe('Test methods with non-string values', function() {
    describe('Test with number as an argument', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.encode(0), TypeError);
        });
      });

      describe('Decode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.decode(0), TypeError);
        });
      });
    });

    describe('Test with boolean as an argument', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.encode(true), TypeError);
        });
      });

      describe('Decode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.decode(true), TypeError);
        });
      });
    });

    describe('Test with symbol as an argument', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.encode(Symbol('foo')), TypeError);
        });
      });

      describe('Decode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.decode(Symbol('foo')), TypeError);
        });
      });
    });

    describe('Test with object as an argument', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.encode({}), TypeError);
        });
      });

      describe('Decode', function() {
        it('should throw TypeError', function() {
          const caesarCipher = new CaesarCipher(0);

          assert.throws(() => caesarCipher.decode({}), TypeError);
        });
      });
    });
  });

  describe('Test methods with in-range shifts', function() {
    describe('Test with shift of 0', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', function() {
        it('should encode with shift of 0', function() {
          assert.strictEqual(caesarCipher.encode('abc'), 'ABC');
        });
      });

      describe('Decode', function() {
        it('should decode with shift of 1', function() {
          assert.strictEqual(caesarCipher.decode('abc'), 'ABC');
        });
      });
    });

    describe('Test with shift of 13', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(13);
      });

      describe('Encode', function() {
        it('should encode with shift of 13', function() {
          assert.strictEqual(caesarCipher.encode('abc'), 'NOP');
        });
      });

      describe('Decode', function() {
        it('should decode with shift of 13', function() {
          assert.strictEqual(caesarCipher.decode('nop'), 'ABC');
        });
      });
    });

    describe('Test with shift of 25', function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(25);
      });

      describe('Encode', function() {
        it('should encode with shift of 25', function() {
          assert.strictEqual(caesarCipher.encode('abc'), 'ZAB');
        });
      });

      describe('Decode', function() {
        it('should decode with shift of 25', function() {
          assert.strictEqual(caesarCipher.decode('zab'), 'ABC');
        });
      });
    });
  });
});