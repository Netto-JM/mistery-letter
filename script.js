const letterTextInputEl = document.getElementById('carta-texto');
const wordCountEl = document.getElementById('carta-contador');
const createLetterButtonEl = document.getElementById('criar-carta');
const createdLetterEl = document.getElementById('carta-gerada');

function appendTextNode(element, text) {
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
}

function addClassesToElement(element, classArray) {
  element.classList.add(...classArray);
}

function createElementWithText(element, text) {
  const newElement = document.createElement(element);
  if (text) appendTextNode(newElement, text);
  return newElement;
}

function completeElementBuilder(element, text, parent, classArray) {
  const newElement = createElementWithText(element, text);
  if (classArray) addClassesToElement(newElement, classArray);
  if (parent) parent.appendChild(newElement);
  return newElement;
}

function isInputEmpty() {
  const noTextEntered = !letterTextInputEl.value.trim();
  if (noTextEntered) {
    appendTextNode(createdLetterEl, 'Por favor, digite o conteúdo da carta.');
    return true;
  }
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomIndex];
  return randomElement;
}

function generateRandomClasses() {
  const styleGroup = ['newspaper', 'magazine1', 'magazine2'];
  const sizeGroup = ['medium', 'big', 'reallybig'];
  const rotationGroup = ['rotateleft', 'rotateright'];
  const inclinationGroup = ['skewleft', 'skewright'];
  const randomStyle = getRandomElement(styleGroup);
  const randomSize = getRandomElement(sizeGroup);
  const randomRotation = getRandomElement(rotationGroup);
  const randomInclination = getRandomElement(inclinationGroup);
  const randomClasses = [randomStyle, randomSize, randomRotation, randomInclination];
  return randomClasses;
}

function createLetter() {
  createdLetterEl.textContent = '';
  let wordCount = 0;
  if (isInputEmpty()) return;
  const letterTextArray = letterTextInputEl.value.split(' ');
  for (let index = 0; index < letterTextArray.length; index += 1) {
    const word = letterTextArray[index];
    if (word !== '') {
      completeElementBuilder('span', word, createdLetterEl, generateRandomClasses());
      appendTextNode(createdLetterEl, ' ');
      wordCount += 1;
    }
  }
  wordCountEl.textContent = wordCount;
}

function changeRandomClasses(event) {
  const clickedElement = event.target.closest('span');
  const clickedWhiteSpace = !clickedElement;
  if (clickedWhiteSpace) return;
  clickedElement.className = '';
  addClassesToElement(clickedElement, generateRandomClasses());
}

createLetterButtonEl.addEventListener('click', createLetter);
createdLetterEl.addEventListener('click', changeRandomClasses);
