const dice = document.getElementById('dice');
const adviceText = document.getElementById('advice');

// Dice face dot positions (1–6)
const diceFaces = [
  [4],             // 1 - center
  [0,8],           // 2
  [0,4,8],         // 3
  [0,2,6,8],       // 4
  [0,2,4,6,8],     // 5
  [0,2,3,5,6,8]    // 6
];

// Create dice face
function createDiceFace(number) {
  dice.innerHTML = "";
  diceFaces[number - 1].forEach(pos => {
    const dot = document.createElement('div');
    dot.classList.add('dot', `dot-pos-${pos}`);
    dice.appendChild(dot);
  });
}

// Fetch advice from Advice Slip API
function getAdvice() {
  fetch("https://api.adviceslip.com/advice", {cache: "no-cache"})
    .then(res => res.json())
    .then(data => {
      adviceText.style.opacity = 0;
      setTimeout(() => {
        adviceText.innerText = data.slip.advice;
        adviceText.style.opacity = 1;
      }, 300);
    })
    .catch(err => {
      adviceText.innerText = "Oops! Something went wrong.";
      console.error(err);
    });
}

// Roll dice
function rollDice() {
  const randDice = Math.floor(Math.random() * 6) + 1; // 1–6
  createDiceFace(randDice);

  // Dice spin animation
  const rotationX = Math.floor(Math.random() * 720) + 360;
  const rotationY = Math.floor(Math.random() * 720) + 360;
  dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  getAdvice(); // Fetch advice

  // Reset rotation after animation
  setTimeout(() => {
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }, 600);
}

// Initialize dice
createDiceFace(1);

// Click dice
dice.addEventListener('click', rollDice);
