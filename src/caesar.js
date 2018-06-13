/**
 * @desc Store alphabet.
 *
 * @type {WeakMap<Object, any>}
 */
const internalABC = new WeakMap();

/**
 * @desc Store shift.
 *
 * @type {WeakMap<Object, any>}
 */
const internalShift = new WeakMap();

/**
 * @desc Variation of Caesar cipher.
 *
 * @see {@link https://en.wikipedia.org/wiki/Caesar_cipher}
 */
export default class CaesarCipher {
  /**
   * @desc Class constructor.
   *
   * @param {number} shift
   * @throws {TypeError}
   * @throws {RangeError}
   */
  constructor(shift) {
    if (!Number.isInteger(shift)) {
      throw new TypeError();
    }

    if (shift < 0) {
      throw new RangeError();
    }

    internalABC.set(this, 'abcdefghijklmnopqrstuvwxyz');

    internalShift.set(this, shift);
  }

  /**
   * @desc Encode method.
   *
   * @param {string} value
   * @throws {TypeError}
   * @returns {string}
   */
  encode(value) {
    if (typeof value !== 'string') {
      throw new TypeError();
    }

    const alphabet = internalABC.get(this);
    const shift = internalShift.get(this);

    let result = '';

    const encodeLetter = (letter) => {
      if (alphabet.includes(letter.toLowerCase())) {
        const indexOfCurrentLetter = alphabet.indexOf(letter.toLowerCase());
        const indexOfEncodedLetter = (indexOfCurrentLetter + shift) % alphabet.length;

        const encodedLetter = alphabet[indexOfEncodedLetter];

        return encodedLetter.toUpperCase();
      }

      return letter;
    };

    for (let letter of value) {
      result = result.concat(encodeLetter(letter));
    }

    return result;
  }

  /**
   * @desc Decode method.
   *
   * @param {string} value
   * @throws {TypeError}
   * @returns {string}
   */
  decode(value) {
    if (typeof value !== 'string') {
      throw new TypeError();
    }

    const alphabet = internalABC.get(this);
    const shift = internalShift.get(this);

    let result = '';

    const decodeLetter = (letter) => {
      if (alphabet.includes(letter.toLowerCase())) {
        const indexOfCurrentLetter = alphabet.indexOf(letter.toLowerCase());
        const indexOfDecodedLetter = (indexOfCurrentLetter - shift + alphabet.length) % alphabet.length;

        const decodedLetter = alphabet[indexOfDecodedLetter];

        return decodedLetter.toUpperCase();
      }

      return letter;
    };

    for (let letter of value) {
      result = result.concat(decodeLetter(letter));
    }

    return result;
  }
}