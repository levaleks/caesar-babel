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
   * @param {string} alphabet
   * @throws {TypeError}
   * @throws {RangeError}
   */
  constructor(shift, alphabet = 'abcdefghijklmnopqrstuvwxyz') {
    if (!Number.isInteger(shift)) {
      throw new TypeError('Shift must be an integer');
    }

    if (shift < 0) {
      throw new RangeError('Shift must be a positive integer');
    }

    if (typeof alphabet !== 'string' || !alphabet.length) {
      throw new TypeError('Alphabet must be a non-empty string');
    }

    /**
     * @type {number}
     * @private
     */
    this._shift = shift;

    /**
     * @type {string}
     * @private
     */
    this._alphabet = alphabet.trim();
  }

  /**
   * @desc Encode or decode text. PAY ATTENTION to the return value - it will be always in upper case.
   *
   * @param {('encode'|'decode')} operation
   * @param {string} text
   * @returns {string}
   * @private
   */
  _convertText(operation, text) {
    if (!(['encode', 'decode'].includes(operation))) {
      throw new TypeError('Invalid type of converting operation');
    }

    if (typeof text !== 'string') {
      throw new TypeError('Text must be a string');
    }

    return text.replace(new RegExp(`[${this._alphabet}]`, 'gi'), (letter) => {
      if (this._alphabet.includes(letter.toLowerCase())) {
        const indexOfProvidedLetter = this._alphabet.indexOf(letter.toLowerCase());

        let indexOfConvertedLetter;

        if (operation === 'encode') {
          indexOfConvertedLetter = (indexOfProvidedLetter + this._shift) % this._alphabet.length;
        } else {
          indexOfConvertedLetter = (indexOfProvidedLetter - this._shift + this._alphabet.length) % this._alphabet.length;
        }

        const convertedLetter = this._alphabet[indexOfConvertedLetter];

        return convertedLetter.toUpperCase();
      }

      return letter;
    });
  }

  /**
   * @desc Encode method.
   *
   * @example
   * // returns 'BCD'
   * (new CaesarCipher(1)).encode('abc');
   * @param {string} text
   * @throws {TypeError}
   * @returns {string}
   */
  encode(text) {
    if (typeof text !== 'string') {
      throw new TypeError();
    }

    return this._convertText('encode', text);
  }

  /**
   * @desc Decode method.
   *
   * @example
   * // returns 'ZAB'
   * (new CaesarCipher(1)).decode('abc');
   * @param {string} text
   * @throws {TypeError}
   * @returns {string}
   */
  decode(text) {
    if (typeof text !== 'string') {
      throw new TypeError();
    }

    return this._convertText('decode', text);
  }
}