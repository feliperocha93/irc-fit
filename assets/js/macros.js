import { alertError, inputNumber, setResult } from './generic.js';

const calories = document.getElementById('calories');
calories.addEventListener('change', caloriesChange)

const changeListenables = document.querySelectorAll('.changeListenable');
changeListenables.forEach(select => select.addEventListener('change', handleChange));

const getmacrosForm = document.getElementById('getmacros-form');
getmacrosForm.addEventListener('submit', handleSubmit);

let objectResult = {
  calories: 0,
  carbo: {
    g: 0,
    p: 0
  },
  protein: {
    g: 0,
    p: 0
  },
  fat: {
    g: 0,
    p: 0
  }
}

function caloriesChange() {
  objectResult.calories = inputNumber('calories');
}

function handleChange(event) {
  const { name, value } = event.target;
  const propertie = name.slice(2);
  const selectValue = name.slice(0, 1);
  const rollBack = objectResult[propertie][selectValue];
  objectResult[propertie][selectValue] = +value;

  try {
    validateChange();
    getOtherNumber(propertie, selectValue);
  } catch (error) {
    console.log(objectResult)
    event.target.value = rollBack > 0 ? rollBack.toFixed() : '';
    objectResult[propertie][selectValue] = rollBack;
    alertError(error.message);
  }
}

function validateChange() {
  const { calories, carbo, protein, fat } = objectResult;

  const blankError = new Error('Você deve inserir o número de <b style="color:#ff7934">calorias</b> primeiro');
  const error = new Error('Você <b style="color:#ff7934">excedeu</b> o número de calorias');

  if (calories === 0) throw blankError;
  if ((carbo.g * 4) + (protein.g * 4) + (fat.g * 9) > calories) throw error;
  if (carbo.p + protein.p + fat.p > 100) throw error;
}

function handleSubmit(event) {
  event.preventDefault();

  try {
    validateChange();
    validateSubmit();
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  } catch (error) {
    alertError(error.message);
  }
}

function validateSubmit() {
  const { carbo, protein, fat } = objectResult;
  const percentageArray = [carbo.p, protein.p, fat.p];
  const percentageTotal = percentageArray.reduce((acc, cur) => acc + cur);

  const percentageError = new Error('A soma das porcentagens deve ser <b style="color: #ff7934">100</b>');

  if (percentageTotal <= 99 || percentageTotal >= 101) throw percentageError;
}

function drawChart() {
  const { carbo, protein, fat } = objectResult;

  const data = google.visualization.arrayToDataTable([
    ['Macro-nutriente', 'calorias'],
    [`Carboidrato ${carbo.g.toFixed()}g`, (carbo.g * 4)],
    [`Proteína ${protein.g.toFixed()}g`, (protein.g * 4)],
    [`Gordura ${fat.g.toFixed()}g`, (fat.g * 9)]
  ]);

  const options = {
    backgroundColor: '#010274',
    colors: ['#9937bf', '#ff3879', '#ff7934'],
    fontSize: 16,
    height: 300,
    chartArea: { top: 50, width: '80%' },
    title: 'Divisão de macro-nutrientes',
    titleTextStyle: { color: '#ffdef3', fontSize: 20 },
    tooltip: { text: 'percentage', textStyle: { color: '#010274' }, showColorCode: true },
    is3D: true,
    legend: { textStyle: { color: '#ffdef3', fontSize: 16 } }
  };

  const chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);

  document.querySelector('#count-content .result-content').classList.remove('hidden');

  const result = document.getElementById('macros-result');
  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function getOtherNumber(propertie, selectValue) {
  const multiplier = propertie === 'fat' ? 9 : 4;
  const onePercent = objectResult.calories * .01;
  let propertieCkal = objectResult[propertie][selectValue];

  if (selectValue === 'g') {
    propertieCkal *= multiplier;
    objectResult[propertie]['p'] = propertieCkal / onePercent;
    document.getElementById(`p-${propertie}`).value = objectResult[propertie]['p'].toFixed();
  }

  else {
    propertieCkal /= multiplier;
    objectResult[propertie]['g'] = propertieCkal * onePercent;
    document.getElementById(`g-${propertie}`).value = objectResult[propertie]['g'].toFixed();
  }
}
