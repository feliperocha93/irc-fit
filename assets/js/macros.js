import { inputNumber, setResult } from './generic.js';

const getmacrosForm = document.getElementById('getmacros-form');
getmacrosForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const calories = inputNumber('calories');
  const carbo = inputNumber('carbo');
  const protein = inputNumber('protein');
  const fat = inputNumber('fat');

  if (carbo + protein + fat !== 100) alert('A soma dos macro-nutrientes deve ser 100!');

  const gCarbo = (calories * (carbo / 100)) / 4;
  const gProtein = (calories * (protein / 100)) / 4;
  const gFat = (calories * (fat / 100)) / 9;


  const layout = `
  <h2>Aqui está o resultado:</h2>

  <div class="result-content">
    <ul>
      <li>
        Você deve consumir <strong>${gCarbo.toFixed(2)}g de carboidrato</strong>.
      </li>
      <li>
        Você deve consumir <strong>${gProtein.toFixed(2)}g de proteína</strong>.
      </li>
      <li>
        Você deve consumir <strong>${gFat.toFixed(2)}g de gordura</strong>.
      </li>
    </ul>
  </div>
  `;

  setResult('macros-result', layout);
}

