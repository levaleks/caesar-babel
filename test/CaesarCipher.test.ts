import { assert } from 'chai';
import { describe, it, before } from 'mocha';
import CaesarCipher from '../src/CaesarCipher';

describe('Test the CaesarCipher class', () => {

  /**
   * Test constructor
   */

  /**
   * Negative cases.
   */

  describe('Test constructor with invalid types of arguments', () => {
    describe('Test "offset"', () => {
      const invalidOffsetTypes: { name: string, value: any }[] = [
        { name: 'decimal', value: Number.MIN_VALUE },
        { name: 'string', value: '' },
        { name: 'symbol', value: Symbol('foo') },
        { name: 'boolean', value: true },
        { name: 'object', value: {} },
      ];

      invalidOffsetTypes.forEach((type) => {
        it(`should throw TypeError for ${type.name}`, () => {
          assert.throws(() => new CaesarCipher(type.value), TypeError);
        });
      });

      it('should throw RangeError for offset lower than 0', () => {
        assert.throws(() => new CaesarCipher(-1), RangeError);
      });
    });

    describe('Test "alphabet"', () => {
      const invalidAlphabetTypes: { name: string, value: any }[] = [
        { name: 'number', value: 0 },
        { name: 'empty string', value: '' },
        { name: 'symbol', value: Symbol('foo') },
        { name: 'boolean', value: true },
        { name: 'object', value: {} },
      ];

      invalidAlphabetTypes.forEach((type) => {
        it(`should throw TypeError for ${type.name}`, () => {
          assert.throws(() => new CaesarCipher(0, type.value), TypeError);
        });
      });
    });
  });

  /**
   * Test methods
   */

  /**
   * Negative cases.
   */

  describe('Test methods with invalid types of arguments', () => {
    const invalidTypes: { name: string, value: any }[] = [
      { name: 'number', value: 0 },
      { name: 'symbol', value: Symbol('foo') },
      { name: 'boolean', value: true },
      { name: 'object', value: {} },
    ];

    invalidTypes.forEach((type) => {
      describe(`Test with ${type.name} as an argument`, () => {
        let caesarCipher: CaesarCipher;

        before(() => {
          caesarCipher = new CaesarCipher(0);
        });

        describe('Encode', () => {
          it('should throw TypeError', () => {
            assert.throws(() => caesarCipher.encode(type.value), TypeError);
          });
        });

        describe('Decode', () => {
          it('should throw TypeError', () => {
            assert.throws(() => caesarCipher.decode(type.value), TypeError);
          });
        });
      });
    });
  });

  /**
   * Positive cases.
   */

  describe('Test methods with valid types of arguments', () => {
    describe('Test with shift of 0', () => {
      let caesarCipher: CaesarCipher;

      before(() => {
        caesarCipher = new CaesarCipher(0);
      });

      describe('Encode', () => {
        it('should encode with shift of 0', () => {
          assert.strictEqual(caesarCipher.encode('abc'), 'ABC');
        });
      });

      describe('Decode', () => {
        it('should decode with shift of 1', () => {
          assert.strictEqual(caesarCipher.decode('abc'), 'ABC');
        });
      });
    });

    describe('Test with shift of 13', () => {
      let caesarCipher: CaesarCipher;

      before(() => {
        caesarCipher = new CaesarCipher(13);
      });

      describe('Encode', () => {
        it('should encode with shift of 13', () => {
          assert.strictEqual(caesarCipher.encode('abc'), 'NOP');
        });
      });

      describe('Decode', () => {
        it('should decode with shift of 13', () => {
          assert.strictEqual(caesarCipher.decode('nop'), 'ABC');
        });
      });
    });

    describe('Test with shift of 25', () => {
      let caesarCipher: CaesarCipher;

      before(() => {
        caesarCipher = new CaesarCipher(25);
      });

      describe('Encode', () => {
        it('should encode with shift of 25', () => {
          assert.strictEqual(caesarCipher.encode('abc'), 'ZAB');
        });
      });

      describe('Decode', () => {
        it('should decode with shift of 25', () => {
          assert.strictEqual(caesarCipher.decode('zab'), 'ABC');
        });
      });
    });
  });
});
