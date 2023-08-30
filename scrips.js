const slider = document.getElementById('radiusSlider');
const gradientImage = document.querySelector('.gradient-image');
const result = document.getElementById('result');
const buttonsContainer = document.querySelector('.buttons-container');
const arrowButtons = buttonsContainer.querySelectorAll('.direction');
const patternButtons = buttonsContainer.querySelectorAll('.pattern');
// const upArrow = document.getElementById('up');
// const leftUpArrow = document.getElementById('left-up');
// const righUpArrow = document.getElementById('right-up');
// const leftArrow = document.getElementById('left');
// const rightArrow = document.getElementById('right');
// const leftDownArrow = document.getElementById('left-down');
// const rightDownArrow = document.getElementById('right-down');
// const downArrow = document.getElementById('down');
let currentDirection, currentPattern;



slider.addEventListener('input', function() {
  const sliderValue = slider.value;
  const borderRadiusValue = sliderValue + 'px';
  gradientImage.style.borderRadius = borderRadiusValue;
  result.textContent = sliderValue;

});


const changeGradient=function(){
  if(currentPattern==='linear-gradient' || currentPattern==='radial-gradient' )
  gradientImage.style.background = `${currentPattern}(${currentDirection}, rgb(1, 233, 92), rgb(132, 50, 197))`;
else
  gradientImage.style.background = `${currentPattern}(from ${currentDirection}, rgb(1, 233, 92), rgb(132, 50, 197))`;
  
  console.log(`to ${currentPattern}(${currentDirection}, rgb(1, 233, 92), rgb(132, 50, 197))`);


  // document.querySelector(`#current--${activePlayer}`).textContent=0;
  // document.querySelector(`#currentLabel--${activePlayer}`).textContent='current';
  // document.querySelector(`#potential--${activePlayer}`).textContent=scores[activePlayer];
  // currentScore=0;
  // activePlayer=activePlayer===0 ? activePlayer=1 : 0;
  // player0El.classList.toggle('player--active');
  // player1El.classList.toggle('player--active');
  // currentCounter=0;
  // currentStrike0El.classList.remove('currentStrike');
  // currentStrike1El.classList.remove('currentStrike');
};

arrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentDirection=button.id;
    changeGradient();

  });
});
patternButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentPattern=button.id;
    changeGradient();

  });
});


// upArrow.addEventListener('click', () => {
//   gradientImage.style.background = 'linear-gradient(135deg, rgb(1, 233, 92), rgb(132, 50, 197))';
// });

// leftUpArrow.addEventListener('click', () => {
//   gradientImage.style.background = 'repeating-linear-gradient(45deg, rgb(1, 233, 92), rgb(132, 50, 197) 50px)';
// });

// rightArrow.addEventListener('click', () => {
//   gradientImage.style.background = 'linear-gradient(to right, #007bff, #00bfff)';
// });

// downArrow.addEventListener('click', () => {
//   gradientImage.style.background = 'linear-gradient(to bottom, #007bff, #00bfff)';
// });
// leftArrow.addEventListener('click', () => {
//   element.style.background = 'linear-gradient(to left, #007bff, #00bfff)';
// });

// upArrow.addEventListener('click', () => {
//   element.style.background = 'linear-gradient(to top, #007bff, #00bfff)';
// });

// rightArrow.addEventListener('click', () => {
//   element.style.background = 'linear-gradient(to right, #007bff, #00bfff)';
// });

// downArrow.addEventListener('click', () => {
//   element.style.background = 'linear-gradient(to bottom, #007bff, #00bfff)';
// });



