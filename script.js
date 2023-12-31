'use strict';
const slider = document.getElementById('radiusSlider');
const gradientImage = document.querySelector('.gradient-image');
const result = document.getElementById('result');
const arrowButtons = document.querySelectorAll('.direction');
const centerarrowButton = document.querySelector('.center');
const patternButtons = document.querySelectorAll('.pattern');
const shapeButtons = document.querySelectorAll('.shape');
const randomButton = document.getElementById('random');
const colorButton1 = document.getElementById('color-1');
const colorButton2 = document.getElementById('color-2');
const switchButton = document.querySelector('.switch');
const footer = document.getElementById('footer');
const bodyBG = document.querySelector('body');
const headingText = document.getElementById('heading');
const allButtons = document.querySelectorAll('.btn');
const headerBG = document.querySelector('header');
const lightIcon = document.getElementById('light');
const nightIcon = document.getElementById('night');
const logoImage = document.querySelector('.logo');
const links = document.querySelectorAll('a');
const copyButton = document.getElementById('hex');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const bg = document.getElementById('bg');
const screenWidth = window.innerWidth;



let currentDirection,
  currentPattern,
  currentShape,
  color1,
  color2,
  theme = 'light',
  copiedText;

slider.addEventListener('input', function () {
  const sliderValue = slider.value;
  const borderRadiusValue = sliderValue + 'px';
  gradientImage.style.borderRadius = borderRadiusValue;
});
copyButton.addEventListener('click', function () {
  copyToClipBoard();
  copyButton.innerHTML = 'copied! <i class="fa-solid fa-check"></i>';
  setTimeout(() => {
    copyButton.innerHTML = 'Copy code <i class="fa-regular fa-clipboard"></i>';
  }, 3000); // 3000 milliseconds (3 seconds)
});

const copyToClipBoard = function () {
  navigator.clipboard.writeText(
    `background: ${gradientImage.style.background};`
  );
};
const changeGradient = function () {
  console.log(currentDirection, currentPattern);
  if (currentPattern === 'linear')
    gradientImage.style.background = `${currentPattern}-gradient(${currentDirection}, ${color1}, ${color2})`;
  else if (currentPattern === 'radial') {
    const degreeToPosition = { '0deg': 'top', '45deg': 'right top', '90deg': 'right', '135deg': 'right bottom', '180deg': 'bottom',
      '225deg': 'left bottom', '270deg': 'left', '315deg': 'left top'};
      const current = degreeToPosition[currentDirection];


    gradientImage.style.background = `${currentPattern}-gradient(circle at ${current}, ${color1}, ${color2})`;
    console.log(`${currentPattern}-gradient(circle at ${current}, ${color1}, ${color2})`) ;
  } else
    gradientImage.style.background = `${currentPattern}-gradient(from ${currentDirection}, ${color1}, ${color2})`;

  console.log(
    (gradientImage.style.background = `${currentPattern}-gradient(${currentDirection}, ${color1}, ${color2})`)
  );
};

const selectButton = function (buttons, pressedButton) {
  console.log(` selectButton ${theme}-pressed`);

  if (!pressedButton.classList.contains(`${theme}-pressed`)) {
    buttons.forEach((button) => {
      button.classList.remove(`${theme}-pressed`);
    });
    pressedButton.classList.add(`${theme}-pressed`);
    return false;
  } else {
    return true;
  }
};
const selectButtonThemeChange = function (button, changedFrom) {
  button.classList.remove(`${changedFrom}-pressed`);
  button.classList.add(`${theme}-pressed`);
};

patternButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectButton(patternButtons, button);
    currentPattern = button.id;
    currentPattern === 'radial'
      ? centerarrowButton.classList.remove('hidden')
      : centerarrowButton.classList.add('hidden');

    console.log(currentPattern);
    changeGradient();
  });
});

arrowButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectButton(arrowButtons, button);
    currentDirection = button.id;
    console.log(currentDirection);
    changeGradient();
  });
});
shapeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isPressed = selectButton(shapeButtons, button);
    currentShape = button.id;

    if (!isPressed) {
      shapeButtons.forEach((button) => {
        gradientImage.classList.remove(`${button.id}`);
      });
      gradientImage.classList.add(currentShape);
      if (currentShape === 'line') {
        slider.max = '50';
        slider.step = '10';
      } else {
        slider.max = '250';
        slider.step = '25';
      }
    }
  });
});

window.addEventListener('load', function () {
  init();
});

const generate = function () {
  color1 = colorButton1.value;
  color2 = colorButton2.value;
  changeGradient();
};
colorButton1.addEventListener('input', generate);
colorButton2.addEventListener('input', generate);

randomButton.addEventListener('click', function () {
  console.log('random clicked');
  colorButton1.value = randomColor();
  colorButton2.value = randomColor();
  generate();
});

const init = function () {
  colorButton1.value = randomColor();
  colorButton2.value = randomColor();

  const arrowButton = document.querySelector('.top-right');
  const shapeButton = document.getElementById('rectangle');
  const patternButton = document.getElementById('linear');

  selectButton(arrowButtons, arrowButton);
  selectButton(shapeButtons, shapeButton);
  selectButton(patternButtons, patternButton);

  currentDirection = arrowButton.id;
  currentShape = shapeButton.id;
  currentPattern = patternButton.id;
  generate();
};

switchButton.addEventListener('click', function () {
  let otherTheme, color;
  if (theme === 'light') {
    theme = 'dark';
    otherTheme = 'light';
    color = 'white';
  } else {
    theme = 'light';
    otherTheme = 'dark';
    color = '#333';
  }
  console.log(theme, otherTheme);
  footer.classList.toggle('light-pressed');
  bodyBG.classList.toggle('dark-bg');
  bodyBG.classList.toggle('dark-color');
  headingText.classList.toggle('dark-color');
  lightIcon.classList.toggle('removed');
  nightIcon.classList.toggle('removed');
  logoImage.src = `${otherTheme}.png`;
  links.forEach((button) => {
    button.style.color = color;
  });
  allButtons.forEach((button) => {
    button.classList.toggle('dark-btn');

    if (button.classList.contains(`${otherTheme}-pressed`)) {
      button.classList.remove(`${otherTheme}-pressed`);
      button.classList.add(`${theme}-pressed`);
    }
  });
});

if (screenWidth <= 768) {
  bodyBG.classList.toggle('dark-color');
}

function downloadImage() {
  canvas.width = 3000;
  canvas.height = 1500;

  gradientImage.onload = function () {
    // Draw the linear background onto the canvas
    context.drawImage(
      gradientImage.innerHTML,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Create a data URL and download link after the image has loaded
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'gradient-background.png';
    link.click();
  };
}

const downloadButton = document.getElementById('download-btn');

downloadButton.addEventListener('click', () => {
  downloadImage();
});

function drawRectangle() {
  context.fillStyle = 'blue';
  context.roundRect(10, 20, 150, 100, [40]);

  context.fill();
}
