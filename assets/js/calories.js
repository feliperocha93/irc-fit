import { inputNumber, selected, setResult } from './generic.js';
import { backHome } from './menu.js';

const getckalForm = document.getElementById('getckal-form');
getckalForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const gender = selected('gender');
  const age = inputNumber('age');
  const weight = inputNumber('weight');
  const height = inputNumber('height');
  const activityLevel = selected('activity_level');

  const tmb = Math.round(
    gender === 'female'
      ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
      : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
  );
  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;
  const water = weight * 0.05;

  const layout = `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
        <li>
          Para manter-se hidratado, você precisa beber diariamente <strong>${water}L de água</strong>.
        </li>
      </ul>
    </div>
  `;

  setResult('cal-result', layout);
}
