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
        
        <!-- Shift -->
        <label class="form__label">
          <span class="form__label-name">Shift</span>
          
          <select name="shift" class="form__control shift">
            ${Array.from({length: 26}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
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
let caesarCipher = new CaesarCipher(0);

/**
 * Get elements.
 */

const operation = document.querySelector('.operation');
const shift = document.querySelector('.shift');
const input = document.querySelector('.original-text');
const output = document.querySelector('.result-text');

/**
 * Handlers.
 */

const onInputChange = () => {
  let result = '';

  switch (operation.value) {
    case 'encode':
      result = caesarCipher.encode(input.value);
      break;
    case 'decode':
      result = caesarCipher.decode(input.value);
      break;
    default:
      result = '';
  }

  output.value = result;
};

const onShiftChange = () => {
  caesarCipher = new CaesarCipher(Number(shift.value));

  onInputChange();
};

/**
 * Attach events.
 */

operation.addEventListener('change', onInputChange, false);
shift.addEventListener('change', onShiftChange, false);
input.addEventListener('input', onInputChange, false);