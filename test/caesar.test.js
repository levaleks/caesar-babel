const { assert } = require('chai');
import CaesarCipher from '../src/caesar.js';

describe("Test the CaesarCipher class", function() {
  describe("Test constructor with shifts of invalid type", function() {
    it("should throw TypeError for decimal", function() {
      try {
        const caesarCipher = new CaesarCipher(Number.MIN_VALUE);

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof TypeError);
      }
    });

    it("should throw TypeError for string", function() {
      try {
        const caesarCipher = new CaesarCipher('');

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof TypeError);
      }
    });

    it("should throw TypeError for symbol", function() {
      try {
        const caesarCipher = new CaesarCipher(Symbol('foo'));

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof TypeError);
      }
    });

    it("should throw TypeError for boolean", function() {
      try {
        const caesarCipher = new CaesarCipher(true);

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof TypeError);
      }
    });

    it("should throw TypeError for object", function() {
      try {
        const caesarCipher = new CaesarCipher({});

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof TypeError);
      }
    });
  });

  describe("Test constructor with out-of-range shift", function() {
    it("should throw RangeError for argument lower than 0", function() {
      try {
        const caesarCipher = new CaesarCipher(-1);

        assert.ok(false);
      } catch (error) {
        assert.ok(error instanceof RangeError);
      }
    });
  });

  describe("Test methods with non-string values", function() {
    describe("Test with number as an argument", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe("Encode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.encode(0)

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });

      describe("Decode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.decode(0)

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });
    });

    describe("Test with boolean as an argument", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe("Encode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.encode(true)

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });

      describe("Decode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.decode(true)

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });
    });

    describe("Test with symbol as an argument", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe("Encode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.encode(Symbol('foo'));

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });

      describe("Decode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.decode(Symbol('foo'));

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });
    });

    describe("Test with object as an argument", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe("Encode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.encode({})

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });

      describe("Decode", function() {
        it("should throw TypeError", function(){
          try {
            const caesarCipher = new CaesarCipher(0);

            caesarCipher.decode({})

            assert.ok(false);
          } catch (error) {
            assert.ok(error instanceof TypeError);
          }
        });
      });
    });
  });

  describe("Test methods with in-range shifts", function() {
    describe("Test with shift of 0", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(0);
      });

      describe("Encode", function() {
        it("should encode with shift of 0", function(){
          assert.strictEqual(caesarCipher.encode('abc'), "ABC");
        });
      });

      describe("Decode", function() {
        it("should decode with shift of 1", function(){
          assert.strictEqual(caesarCipher.decode('abc'), "ABC");
        });
      });
    });

    describe("Test with shift of 13", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(13);
      });

      describe("Encode", function() {
        it("should encode with shift of 13", function(){
          assert.strictEqual(caesarCipher.encode('abc'), "NOP");
        });
      });

      describe("Decode", function() {
        it("should decode with shift of 13", function(){
          assert.strictEqual(caesarCipher.decode('nop'), "ABC");
        });
      });
    });

    describe("Test with shift of 25", function() {
      let caesarCipher;

      before(function () {
        caesarCipher = new CaesarCipher(25);
      });

      describe("Encode", function() {
        it("should encode with shift of 25", function(){
          assert.strictEqual(caesarCipher.encode('abc'), "ZAB");
        });
      });

      describe("Decode", function() {
        it("should decode with shift of 25", function(){
          assert.strictEqual(caesarCipher.decode('zab'), "ABC");
        });
      });
    });
  });
});