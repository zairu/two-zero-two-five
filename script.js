/*
const currentNumberDisplay = document.getElementById('currentNumber');
const randomNumberDisplay1 = document.getElementById('randomNumber_1');
const randomNumberDisplay2 = document.getElementById('randomNumber_2');
const randomNumberDisplay3 = document.getElementById('randomNumber_3');
const randomNumberDisplay4 = document.getElementById('randomNumber_4');
const randomNumberDisplay5 = document.getElementById('randomNumber_5');
*/
release = 0; // DEBUG用

const calcContainer = document.getElementById('calculation-container');
const nextContainer = document.getElementById('next-container');
const opeContainer = document.getElementById('operator-container');
const turnDisplay = document.getElementById('turn');
const scoreDisplay = document.getElementById('score');
const addedScoreDisplay = document.getElementById('added-score');

const operatorImgDisplay1 = document.getElementById('img-operator1');
const operatorImgDisplay2 = document.getElementById('img-operator2');
const operatorImgDisplay3 = document.getElementById('img-operator3');
const operatorElement1 = document.getElementById('div-operator1');
const operatorElement2 = document.getElementById('div-operator2');
const operatorElement3 = document.getElementById('div-operator3');
const operatorButtonDisplay1 = document.getElementById('select-operator1');
const operatorButtonDisplay2 = document.getElementById('select-operator2');
const operatorButtonDisplay3 = document.getElementById('select-operator3');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomNumber() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return 0;
    case 1:
      return 2;
    case 2:
      return 5;
  }
  return generateRandomNumber;
}

function generateRandomOperator() {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return 'plus';
    case 1:
      return 'minus';
    case 2:
      return 'multiply';
    case 3:
      return 'divide';
  }
  return generateRandomOperator();
}

function selectButton(buttonId) {
  if (runningAnim != 0 || finished != 0) return;
  switch (buttonId) {
    case 'select-operator1':
      if (getRandomNumber() == 0 && randomOperator1 == 'divide') {
        notSelectable(operatorElement1);
      } else {
        calculate(operatorElement1, operatorImgDisplay1,
          randomOperator1, (v) => randomOperator1 = v);
      }
      break;
    case 'select-operator2':
      if (getRandomNumber() == 0 && randomOperator2 == 'divide') {
        notSelectable(operatorElement2);
      } else {
        calculate(operatorElement2, operatorImgDisplay2,
          randomOperator2, (v) => randomOperator2 = v);
      }
      break;
    case 'select-operator3':
      if (getRandomNumber() == 0 && randomOperator3 == 'divide') {
        notSelectable(operatorElement3);
      } else {
        calculate(operatorElement3, operatorImgDisplay3,
          randomOperator3, (v) => randomOperator3 = v);
      }
      break;
    case 'reset':
      resetGame();
      break;
  }
}

function getRandomNumber() {
  return randomNumber1 * 10 + randomNumber2;
}

async function calculate(opeElem, opeImg, operator, setOperator)
{
  runningAnim = 1;

  // logic
  randomNumber = getRandomNumber();
  switch (operator) {
    case 'plus':
      currentNumber += randomNumber;
      break;
    case 'minus':
      currentNumber -= randomNumber;
      break;
    case 'multiply':
      currentNumber *= randomNumber;
      break;
    case 'divide':
      if (randomNumber === 0 && release == 1) {
        alert('0で割ることはできません');
        break;
      }
      currentNumber /= randomNumber;
      currentNumber = Math.floor(currentNumber);
      break;
  }

  randomNumber1 = randomNumber3;
  randomNumber2 = randomNumber4;
  randomNumber3 = randomNumber5;
  randomNumber4 = generateRandomNumber();
  randomNumber5 = generateRandomNumber();
  var newOpe = generateRandomOperator();
  setOperator(newOpe);
  if (currentNumber < 2025) {
    addedScore = currentNumber;
  } else if (currentNumber == 2025) {
    addedScore = 10000;
    finished = 1;
  } else {
    addedScore = Math.max(4050 - currentNumber, 0);
  }
  score += addedScore;
  --turn;
  if (turn <= 0) finished = 1;

  // anim
  fadeout(opeElem);
  calcOpeDisplay.src = generateOpeImgSrc(operator);
  fadein(calcOpeElement);
  await delay(600);

  fadeout(calcOpeElement);
  fadeout(randomNumberElement1);
  fadeout(randomNumberElement2);
  await delay(400);
  currentNumberDisplay.textContent = currentNumber;
  await delay(700);

  scoreDisplay.textContent = score;
  addedScoreDisplay.textContent = '(+' + addedScore + ')';
  addedScoreDisplay.classList.remove('animated-fade-out');
  addedScoreDisplay.classList.add('animated-fade-in');
  addedScoreDisplay.style.animationDuration = '0.3s';

  randomNumberDisplay1.src = generateNumberImgSrc(randomNumber1);
  randomNumberDisplay2.src = generateNumberImgSrc(randomNumber2);
  fadeout(randomNumberElement3);
  fadeout(randomNumberElement4);
  await delay(200);
  fadein(randomNumberElement1);
  fadein(randomNumberElement2);
  await delay(300);

  randomNumberDisplay3.src = generateNumberImgSrc(randomNumber3);
  fadeout(randomNumberElement5);
  fadein(randomNumberElement3);
  await delay(200);
  randomNumberDisplay4.src = generateNumberImgSrc(randomNumber4);
  fadein(randomNumberElement4);
  await delay(200);
  randomNumberDisplay5.src = generateNumberImgSrc(randomNumber5);
  fadein(randomNumberElement5);
  await delay(200);

  opeImg.src = generateOpeImgSrc(newOpe);
  fadein(opeElem);

  turnDisplay.textContent = turn;
  addedScoreDisplay.classList.remove('animated-fade-in');
  addedScoreDisplay.classList.add('animated-fade-out');
  addedScoreDisplay.style.animationDuration = '0.3s';
  
  runningAnim = 0;

  if (finished) {
    alert('ゲーム終了');
  }
}

async function notSelectable(opeElem) {
  runningAnim = 1;
  fadeout(opeElem);
  await delay(300);
  fadein(opeElem);
  await delay(300);
  runningAnim = 0;
}

function fadein(elem) {
  elem.classList.remove('animated-fadein');
  elem.classList.remove('animated-fadeout');
  elem.classList.add('animated-fadein');
  elem.style.animationDuration = '0.3s';
}

function fadeout(elem) {
  elem.classList.remove('animated-fadein');
  elem.classList.remove('animated-fadeout');
  elem.classList.add('animated-fadeout');
  elem.style.animationDuration = '0.3s';
}

// 各ボタンにクリックイベントを登録
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    selectButton(button.id);
  });
});

function generateNumberImgSrc(number) {
  return 'img/num_' + number + '.png';
}

function generateNumberImageElement(number) {
  const img = document.createElement('img');
  img.src = generateNumberImgSrc(number);
  img.alt = 'number';
  return img;
}

function generateOpeImgSrc(operator) {
  return 'img/ope_' + operator + '.png';
}

function generateOperatorImageElement(operator) {
  const img = document.createElement('img');
  img.src = generateOpeImgSrc(operator);
  img.alt = 'operator';
  return img;
}

function generateFlexElement(child) {
  const div = document.createElement('div');
  if (child != null) {
    div.appendChild(child);
  }
  div.classList.add('element');
  div.classList.add('animated-fadein');
  return div;
}

function initGame() {
  if (inited === 1) { return; }

  // 計算式表示要素
  calcContainer.innerHTML = '';

  currentNumberDisplay = generateFlexElement();
  currentNumberDisplay.classList.add('text');
  calcContainer.appendChild(currentNumberDisplay);

  calcOpeDisplay = generateOperatorImageElement('plus');
  calcOpeElement = generateFlexElement(calcOpeDisplay);
  calcContainer.appendChild(calcOpeElement);

  randomNumberDisplay1 = generateNumberImageElement(randomNumber1);
  randomNumberElement1 = generateFlexElement(randomNumberDisplay1);
  calcContainer.appendChild(randomNumberElement1);

  randomNumberDisplay2 = generateNumberImageElement(randomNumber2);
  randomNumberElement2 = generateFlexElement(randomNumberDisplay2);
  calcContainer.appendChild(randomNumberElement2);

  // ネクスト表示要素
  nextContainer.innerHTML = '';
  nextInfoDisplay = generateFlexElement();
  nextInfoDisplay.textContent = "Next:";
  nextInfoDisplay.classList.add('text');
  nextContainer.appendChild(nextInfoDisplay);

  randomNumberDisplay3 = generateNumberImageElement(randomNumber3);
  randomNumberElement3 = generateFlexElement(randomNumberDisplay3);
  nextContainer.appendChild(randomNumberElement3);

  randomNumberDisplay4 = generateNumberImageElement(randomNumber4);
  randomNumberElement4 = generateFlexElement(randomNumberDisplay4);
  nextContainer.appendChild(randomNumberElement4);

  randomNumberDisplay5 = generateNumberImageElement(randomNumber5);
  randomNumberElement5 = generateFlexElement(randomNumberDisplay5);
  nextContainer.appendChild(randomNumberElement5);

  inited = 1;
}

function resetGame() {
  // ゲームデータ
  currentNumber = 100;
  randomNumber1 = generateRandomNumber();
  randomNumber2 = generateRandomNumber();
  randomNumber3 = generateRandomNumber();
  randomNumber4 = generateRandomNumber();
  randomNumber5 = generateRandomNumber();
  randomOperator1 = 'plus'; // 初手ゼロ除算で積まないように固定
  randomOperator2 = generateRandomOperator();
  randomOperator3 = generateRandomOperator();
  turn = 25;
  score = 0;
  finished = 0;

  initGame();

  currentNumberDisplay.textContent = currentNumber;

  calcOpeElement.classList.remove('animated-fadein');
  calcOpeElement.classList.add('animated-fadeout');
  calcOpeElement.style.animationDuration = '0s';

  randomNumberDisplay1.src = generateNumberImgSrc(randomNumber1);
  randomNumberDisplay2.src = generateNumberImgSrc(randomNumber2);
  randomNumberDisplay3.src = generateNumberImgSrc(randomNumber3);
  randomNumberDisplay4.src = generateNumberImgSrc(randomNumber4);
  randomNumberDisplay5.src = generateNumberImgSrc(randomNumber5);

  // 選択肢表示要素
  operatorImgDisplay1.src = generateOpeImgSrc(randomOperator1);
  operatorImgDisplay2.src = generateOpeImgSrc(randomOperator2);
  operatorImgDisplay3.src = generateOpeImgSrc(randomOperator3);

  // other param
  turnDisplay.textContent = turn;
  scoreDisplay.textContent = score;
}

inited = 0;
runningAnim = 0;
resetGame();
