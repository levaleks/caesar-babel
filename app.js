import CaesarCipher from './src/caesar';

/**
 * Helpers
 */

/**
 * @desc Render HTML.
 *
 * @param {string|Function} template
 * @param {Object} node
 */
const render = function (template, node) {
  if (!node) {
    return;
  }

  node.innerHTML = typeof template === 'function' ? template() : template;
};

/**
 * App
 */

/**
 * Set alphabet.
 */

const alphabets = [
  { name: 'English', letters: 'abcdefghijklmnopqrstuvwxyz', },
  { name: 'Russian', letters: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя', },
];

let currentAlphabet = alphabets[0];

const App = () => {
  return `
    <div class="main">
      <h1 class="topic">Caesar Demo</h1>
    
      <form class="form">
        <!-- Operation -->
        <label class="form__label">
          <span class="form__label-name">Operation</span>
          
          <select name="operation" class="form__control operation">
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
        </label>
        <!-- /Operation -->
        
        <!-- Alphabet -->
        <label class="form__label">
          <span class="form__label-name">Alphabet</span>
          
          <select name="alphabet" class="form__control alphabet">
             ${alphabets
               .map((a) => `
                 <option
                   value="${a.letters}"
                   ${a.name === currentAlphabet.name ? 'selected' : ''}
                 >
                   ${a.name}
                 </option>`)
               .join('')}  
          </select>          
        </label>
        <!-- /Alphabet -->
        
        <!-- Shift -->
        <label class="form__label">
          <span class="form__label-name">Shift</span>
          
          <select name="shift" class="form__control shift">
            ${Array.from({length: currentAlphabet.letters.length}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
          </select>
        </label>   
        <!-- /Shift -->
        
        <!-- Original text -->
        <label class="form__label">
          <span class="form__label-name">Original text</span>
          
          <textarea class="form__control original-text"></textarea>
        </label>
        <!-- /Original text -->    
        
        <!-- Result text -->
        <label class="form__label">
          <span class="form__label-name">Result text</span>
          
          <textarea class="form__control result-text"></textarea>
        </label>
        <!-- /Result text -->              
      </form>
    </div>
  `;
};

/**
 * @desc Render App.
 */
render(App, document.querySelector('#app'));

/**
 * @desc Init cipher.
 *
 * @type {CaesarCipher}
 */
let caesarCipher = new CaesarCipher(0, currentAlphabet.letters);

/**
 * Get elements.
 */

const operationSelectElement = document.querySelector('.operation');
const alphabetSelectElement = document.querySelector('.alphabet');
const shiftSelectElement = document.querySelector('.shift');
const textInputElement = document.querySelector('.original-text');
const textOutputElement = document.querySelector('.result-text');

/**
 * Handlers.
 */

const onInputChange = () => {
  let result = '';

  switch (operationSelectElement.value) {
    case 'encode':
      result = caesarCipher.encode(textInputElement.value);
      break;
    case 'decode':
      result = caesarCipher.decode(textInputElement.value);
      break;
    default:
      result = '';
  }

  textOutputElement.value = result;
};

const onSettingsChange = () => {
  if (currentAlphabet.letters !== alphabetSelectElement.value) {
    currentAlphabet = alphabets.find((alphabet_) => alphabet_.letters === alphabetSelectElement.value);

    shiftSelectElement.options.length = 0;

    for (let i = 0; i < currentAlphabet.letters.length; i++) {
      shiftSelectElement.options.add(new Option(i, i, i === 0, i === 0));
    }
  }

  caesarCipher = new CaesarCipher(Number(shiftSelectElement.value), alphabetSelectElement.value);

  onInputChange();
};

/**
 * Attach events.
 */

operationSelectElement.addEventListener('change', onInputChange, false);
alphabetSelectElement.addEventListener('change', onSettingsChange, false);
shiftSelectElement.addEventListener('change', onSettingsChange, false);
textInputElement.addEventListener('input', onInputChange, false);