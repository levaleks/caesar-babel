export interface CipherOptions {
  operation: 'encode'|'decode';
  alphabet?: string;
  shift: number;
  text: string;
}

/**
 * @desc Variation of Caesar cipher.
 * PAY ATTENTION to the return value - it will always be in upper case.
 *
 * @example
 * // returns 'BCD'
 * caesarCipher({ operation: 'encode', shift: 1, text: 'abc' });
 * @example
 * // returns 'ZAB'
 * caesarCipher({ operation: 'decode', shift: 1, text: 'abc' });
 * @throws {TypeError}
 * @throws {RangeError}
 * @see {@link https://en.wikipedia.org/wiki/Caesar_cipher}
 */
export default function caesarCipher(
  {
    operation,
    alphabet = 'abcdefghijklmnopqrstuvwxyz',
    shift,
    text,
  }: CipherOptions): string {
  if (!Number.isInteger(shift)) {
    throw new TypeError('Shift must be an integer');
  }

  if (shift < 0) {
    throw new RangeError('Shift must be a positive integer');
  }

  if (alphabet.trim() === '' || text.trim() === '') {
    return text;
  }

  return text.replace(new RegExp(`[${alphabet}]`, 'gi'), (letter) => {
    if (alphabet.includes(letter.toLowerCase())) {
      const indexOfProvidedLetter: number = alphabet.indexOf(letter.toLowerCase());

      let indexOfConvertedLetter: number;

      if (operation === 'encode') {
        indexOfConvertedLetter = (indexOfProvidedLetter + shift) % alphabet.length;
      } else {
        indexOfConvertedLetter = (indexOfProvidedLetter - shift + alphabet.length)
          % alphabet.length;
      }

      const convertedLetter: string = alphabet[indexOfConvertedLetter];

      return convertedLetter.toUpperCase();
    }

    return letter;
  });
}
