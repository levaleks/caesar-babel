/**
 * @desc Variation of Caesar cipher.
 *
 * @see {@link https://en.wikipedia.org/wiki/Caesar_cipher}
 */
export default class CaesarCipher {
  private alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  private shift: number;

  /**
   * @desc Class constructor.
   *
   * @param {number} shift
   * @throws {TypeError}
   * @throws {RangeError}
   */
  constructor(shift: number) {
    if (!Number.isInteger(shift)) {
      throw new TypeError();
    }

    if (shift < 0) {
      throw new RangeError();
    }

    this.shift = shift;
  }

  /**
   * @desc Encode method.
   *
   * @param {string} value
   * @throws {TypeError}
   * @returns {string}
   */
  encode(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError();
    }

    let result: string = '';

    const encodeLetter = (letter: string): string => {
      if (this.alphabet.includes(letter.toLowerCase())) {
        const indexOfCurrentLetter: number = this.alphabet.indexOf(letter.toLowerCase());
        const indexOfEncodedLetter: number = (indexOfCurrentLetter + this.shift) % this.alphabet.length;

        const encodedLetter: string = this.alphabet[indexOfEncodedLetter];

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
  decode(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError();
    }

    let result: string = '';

    const decodeLetter = (letter: string): string => {
      if (this.alphabet.includes(letter.toLowerCase())) {
        const indexOfCurrentLetter: number = this.alphabet.indexOf(letter.toLowerCase());
        const indexOfDecodedLetter: number = (indexOfCurrentLetter - this.shift + this.alphabet.length) % this.alphabet.length;

        const decodedLetter: string = this.alphabet[indexOfDecodedLetter];

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