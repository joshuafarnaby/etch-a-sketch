const sketchBox = document.getElementById('sketch-box');

const settingsBtn = document.getElementById('settings');
const clearGridBtn = document.getElementById('clear-grid');
const toggleBtn = document.getElementById('toggle-grid');

const settingsModal = document.querySelector('.modal');
const okBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');

const initialHeight = 16;
const initialWidth = 16;
let count = 0;

// FUNCTIONS

window.onload = createGrid(initialWidth, initialHeight);

function createDiv() {
  let div = document.createElement('div');
  div.id = 'grid-square';
  return div;
}

function createGrid(x, y) {
  let gridArea = x * y;

  for (i = 0; i < gridArea; i++) {
    sketchBox.appendChild(createDiv());
  }

  sketchBox.style.gridTemplateColumns = `
    repeat(${ gridArea / Math.sqrt(gridArea) } , 1fr)
    `;
}

function changeSquareColor(e) {
  let color = document.getElementById('color-scheme').value;

  if (color == 'rainbow' && e.target.id == 'grid-square') {
    e.target.style.background = randomRGB();
  } else if (e.target.id == 'grid-square') {
    e.target.style.background = color;
  }
}

function randomRGB() {
  let o = Math.round,
      r = Math.random,
      s = 255
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function clearDivs() {
  while (sketchBox.firstChild) {
    sketchBox.removeChild(sketchBox.firstChild);
  }
}

function updateGrid(e) {
  e.preventDefault();

  let newHeight = document.getElementById('grid-height').value;
  let newWidth  = document.getElementById('grid-width').value;

  clearDivs();
  createGrid(newHeight, newWidth);
  clearModal();
}

function resetGrid(e) {
  e.preventDefault();
  clearDivs();
  document.getElementById('grid-height').value = 16;
  document.getElementById('grid-width').value = 16;
  document.getElementById('color-scheme').value = 'black';
  createGrid(initialWidth, initialHeight);
  clearModal();
}

function clearGrid() {
  for (i = 0; i < sketchBox.childNodes.length; i++) {
    sketchBox.childNodes[i].style.background = "#fff";
  }
}

function toggleGrid() {
  count++
  if (count % 2 != 0) {
    for (let i = 0; i < sketchBox.childNodes.length; i++) {
      sketchBox.childNodes[i].style.border = '1px solid #000';
    }
  } else {
    for (let i = 0; i < sketchBox.childNodes.length; i++) {
      sketchBox.childNodes[i].style.border = 'none';
    }
  }
}

function showSettingsModal() { 
  settingsModal.style.display = 'block';
}

function clearModal() {
  settingsModal.style.display = 'none';
}


// EVENT LISTENERS

let gridSquares = document.querySelectorAll('#grid-square');
gridSquares.forEach(square => addEventListener('mouseover', changeSquareColor));

settingsBtn.addEventListener('click', showSettingsModal);
clearGridBtn.addEventListener('click', clearGrid);
toggleBtn.addEventListener('click', toggleGrid);

okBtn.addEventListener('click', updateGrid);
resetBtn.addEventListener('click', resetGrid);

