const Player = (name) => {
  let marbles = 10;

  let bet;

  let role;

  return {name, marbles, bet, role}
}

const ai = Player('ai');

let newPlayer;

const submitName = document.getElementById('submitName');
submitName.addEventListener('click', () => {
  const nameField = document.getElementById('nameField');
  newPlayer = Player(nameField.value);

  const askName = document.getElementById('askName');
  askName.classList.add('hidden');

  const message = document.getElementById('message');
  const greet = document.createElement('h2');
  greet.textContent = `Hello, ${newPlayer.name}`;
  message.appendChild(greet);

  randomDecide();
  changeAiRole();
  const status = document.createElement('h2');
  status.textContent = `You start as a ${newPlayer.role}`;
  message.appendChild(status);

  const begin = document.createElement('button');
  begin.textContent = 'Begin';
  message.appendChild(begin);

  begin.addEventListener('click', () => {
    firstRound();
  })
});

const firstRound = () => {
  message.innerHTML = '';
  const roleMsg = document.createElement('h2');
  roleMsg.textContent = `Role: ${newPlayer.role}`;
  message.appendChild(roleMsg);
  const betMsg = document.createElement('h2');
  betMsg.textContent = `Place a bet, 1 to ${newPlayer.marbles} marbles`;
  message.appendChild(betMsg);

  const submitField = document.createElement('input');
  submitField.setAttribute('type', 'number');
  submitField.setAttribute('min', '1');
  submitField.setAttribute('max', `${newPlayer.marbles}`);
  message.appendChild(submitField);
  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  message.appendChild(submit);
  submit.addEventListener('click', () => {
    newPlayer.bet = Number(submitField.value);
    resolveTurn();
  });
}

const prepareForRound = () => {
  if (newPlayer.role === 'hider') {
    newPlayer.role = 'guesser';
  } else if (newPlayer.role === 'guesser') {
    newPlayer.role = 'hider';
  } else {
    randomDecide();
  }
  
  changeAiRole();

  message.innerHTML = '';
  const roleMsg = document.createElement('h2');
  roleMsg.textContent = `Role: ${newPlayer.role}`;
  message.appendChild(roleMsg);
  const betMsg = document.createElement('h2');
  betMsg.textContent = `Place a bet, 1 to ${newPlayer.marbles} marbles`;
  message.appendChild(betMsg);

  const submitField = document.createElement('input');
  submitField.setAttribute('type', 'number');
  submitField.setAttribute('min', '1');
  submitField.setAttribute('max', `${newPlayer.marbles}`);
  message.appendChild(submitField);
  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  message.appendChild(submit);
  submit.addEventListener('click', () => {
    newPlayer.bet = Number(submitField.value);
    resolveTurn();
  });
}




const randomDecide = () => {
  const result = Math.floor(Math.random() * 2);
  if (result === 0) {
    newPlayer.role = 'hider';
  } else {
    newPlayer.role = 'guesser';
  }
}

const changeAiRole = () => {
  if (newPlayer.role === 'hider') {
    ai.role = 'guesser';
  } else {
    ai.role = 'hider';
  }
}

const isOver = () => {
  let resultMsg;

  if (ai.marbles === 0) {
    resultMsg = `Game over. ${newPlayer.name} wins!`;
  } else if (newPlayer.marbles === 0) {
    resultMsg = 'Game over. ai wins!';
  } else {
    return;''
  }

  message.innerHTML = '';
  const announceMsg = document.createElement('h2');
  announceMsg.textContent = resultMsg;
  message.appendChild(announceMsg);
}

const resolveTurn = () => {
  ai.bet = Math.floor(Math.random() * ai.marbles + 1);

  let turnMsg;
  let turnResult;

  const calculateWin = (a, b) => {
    if (a === b || a > b) {
      turnResult = b;
    } else {
      turnResult = a;
    }
  }

  const calculateLoss = (b, a) => {
    if (b > a) {
      turnResult = a;
    } else {
      turnResult = b;
    }
  }

  if (ai.role === 'hider') {
    if (isEven(ai.bet) === isEven(newPlayer.bet)) {
      calculateWin(ai.bet, newPlayer.bet);
      turnMsg = `${newPlayer.name} wins ${turnResult} marbles. ai bet ${ai.bet} vs your ${newPlayer.bet}.`;
      newPlayer.marbles += turnResult;
      ai.marbles -= turnResult;
    } else {
      calculateLoss(ai.bet, newPlayer.bet);
      turnMsg = `${newPlayer.name} loses ${turnResult} marbles. ai bet ${ai.bet} vs your ${newPlayer.bet}.`;
      ai.marbles += turnResult;
      newPlayer.marbles -= turnResult;
    }
  } else if (ai.role === 'guesser') {
    if (isEven(newPlayer.bet) === isEven(ai.bet)) {
      calculateWin(newPlayer.bet, ai.bet);
      turnMsg = `${newPlayer.name} loses ${turnResult} marbles. ai bet ${ai.bet} vs your ${newPlayer.bet}.`;
      ai.marbles += turnResult;
      newPlayer.marbles -= turnResult;
    } else {
      calculateLoss(newPlayer.bet, ai.bet);
      turnMsg = `${newPlayer.name} wins ${turnResult} marbles. ai bet ${ai.bet} vs your ${newPlayer.bet}.`;
      newPlayer.marbles += turnResult;
      ai.marbles -= turnResult;
    }
  }

  message.innerHTML = '';
  const announceMsg = document.createElement('h2');
  announceMsg.textContent = turnMsg;
  message.appendChild(announceMsg);

  const next = document.createElement('button');
  next.textContent = 'Next round';
  message.appendChild(next);
  next.addEventListener('click', () => {
    prepareForRound();
    isOver();
  })
}

const isEven = (num) => {
  return num % 2 === 0? true : false;
}



// Each Player1 & Player2 have 10 marbles

// Hider places a bet of some # of marbles

// Guesser places a bet of some # of marbles

// If Guesser is correct about the bet being odd/even, he takes marbles from Hider

// If Guesser is wrong about the bet being odd/even, he gives marbles to Hider



// Enter your name

// Randomly decide - Hide or Guess

// Place bet

// Result

// Marbles !=0? Repeat