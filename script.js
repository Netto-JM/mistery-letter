const letterTextEl = document.getElementById('carta-texto');
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
  const noTextEntered = !letterTextEl.value.trim();
  if (noTextEntered) {
    appendTextNode(createdLetterEl, 'Por favor, digite o conteúdo da carta.');
    return true;
  }
}

function createLetter() {
  createdLetterEl.textContent = '';
  let wordCount = 0;
  if (isInputEmpty()) return;
  const letterTextArray = letterTextEl.value.split(' ');
  for (let index = 0; index < letterTextArray.length; index += 1) {
    const word = letterTextArray[index];
    if (word !== '') {
      completeElementBuilder('span', word, createdLetterEl);
      appendTextNode(createdLetterEl, ' ');
      wordCount += 1;
    }
  }
  wordCountEl.textContent = wordCount;
}

createLetterButtonEl.addEventListener('click', createLetter);
