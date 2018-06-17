const { assert } = require('chai');
import CaesarCipher from '../src/caesar.js';

describe('Test the CaesarCipher class', function() {

  /*********************************************************************************************************************
   * Test constructor
   ********************************************************************************************************************/

  /**
   * Negative cases.
   */

  describe('Test constructor with invalid types of arguments', function() {
    describe('Test "offset"', function() {
      const invalidOffsetTypes = [
        { name: 'decimal', value: Number.MIN_VALUE },
        { name: 'string', value: '' },
        { name: 'symbol', value: Symbol('foo') },
        { name: 'boolean', value: true },
        { name: 'object', value: {} },
      ];

      invalidOffsetTypes.forEach((type) => {
        it(`should throw TypeError for ${type.name}`, function() {
          assert.throws(() => new CaesarCipher(type.value), TypeError);
        });
      });

      it('should throw RangeError for offset lower than 0', function() {
        assert.throws(() => new CaesarCipher(-1), RangeError);
      });
    });

    describe('Test "alphabet"', function() {
      const invalidAlphabetTypes = [
        { name: 'number', value: 0 },
        { name: 'empty string', value: '' },
        { name: 'symbol', value: Symbol('foo') },
        { name: 'boolean', value: true },
        { name: 'object', value: {} },
      ];

      invalidAlphabetTypes.forEach((type) => {
        it(`should throw TypeError for ${type.name}`, function() {
          assert.throws(() => new CaesarCipher(0, type.value), TypeError);
        });
      });
    });
  });

  /**
   * Positive cases.
   */

  describe('Test constructor with valid types of arguments', function() {
    it('should apply offset 0 and default (English) alphabet', function() {
      const ENGLISH_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

      const caesarCipher = new CaesarCipher(0);

      assert.strictEqual(caesarCipher._shift, 0);
      assert.strictEqual(caesarCipher._alphabet, ENGLISH_ALPHABET);
    });

    it('should apply offset 16 and provided (Russian) alphabet', function() {
      const RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

      const caesarCipher = new CaesarCipher(0, RUSSIAN_ALPHABET);

      assert.strictEqual(caesarCipher._shift, 0);
      assert.strictEqual(caesarCipher._alphabet, RUSSIAN_ALPHABET);
    });
  });

  /*********************************************************************************************************************
   * Test methods
   ********************************************************************************************************************/

  /**
   * Negative cases.
   */

  describe('Test methods with invalid types of arguments', function() {
    const invalidTypes = [
      { name: 'number', value: 0 },
      { name: 'symbol', value: Symbol('foo') },
      { name: 'boolean', value: true },
      { name: 'object', value: {} },
    ];

    invalidTypes.forEach((type) => {
      describe(`Test with ${type.name} as an argument`, function() {
        let caesarCipher;

        before(function () {
          caesarCipher = new CaesarCipher(0);
        });

        describe('Encode', function() {
          it('should throw TypeError', function() {
            const caesarCipher = new CaesarCipher(0);

            assert.throws(() => caesarCipher.encode(type.value), TypeError);
          });
        });

        describe('Decode', function() {
          it('should throw TypeError', function() {
            const caesarCipher = new CaesarCipher(0);

            assert.throws(() => caesarCipher.decode(type.value), TypeError);
          });
        });
      });
    });
  });

  /**
   * Positive cases.
   */

  describe('Test methods with valid types of arguments', function() {
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