'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //ลบค่าอันเก่าข้างในออกให้หมด

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${move}</div>
</div>
`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Balance
const createBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//Summary
const calcDisplaySummary = function (acc) {
  //IN
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  //OUT
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  //INTEREST
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((mov, i, arr) => mov > 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1);

//INTEREST

//Function ที่จะใช้ forEach loop เพื่อเพิ่มค่า username เข้าไปใน array ของแต่ละ account
const createUsername = accs =>
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

createUsername(accounts);

//****** Event handler *******

let currentAccount;

const updateUI = function (acc) {
  //Display movements
  displayMovement(currentAccount);

  //Display balance
  createBalance(currentAccount);

  //Display summary
  calcDisplaySummary(currentAccount);
};

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';

    //Clear Input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputCloseUsername.value = inputClosePin.value = '';

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username &&
    receiverAcc
  ) {
    console.log(`Transfer ${amount} to ${receiverAcc.username}`);
    //Clear Input fields
    inputTransferAmount.value = inputTransferTo.value = '';

    //Add new movements negative
    currentAccount.movements.push(-amount);

    //Add new movements negative
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    console.log(`Delete account ${currentAccount.username}, Index ${index}`);

    //Delete account
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = '0';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});

/*
const account = accounts.find(acc => (acc.owner = 'Jessica Davis'));
console.log(account);

const data1 = [5, 2, 4, 1, 15, 8, 3];

const data2 = [16, 6, 10, 5, 6, 1, 4];

const humanAgeCal = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

console.log(humanAgeCal(data1));


const balance = function (account) {
  return account.movements.reduce((acc, curr, i, arr) => acc + curr, 0);
};

const createBalance = accounts =>
  accounts.forEach(
    account =>
      (account.balance = account.movements.reduce((acc, curr) => acc + curr, 0))
  );

const showBalance = acc => (labelBalance.textContent = `${acc.balance} EUR`);

console.log(createBalance(accounts));
showBalance(account1);

const data1 = [5, 2, 4, 1, 15, 8, 3];

const data2 = [16, 6, 10, 5, 6, 1, 4];

const humanAgeCal = function (ageArr) {
  const humanAge = ageArr
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age > 18);

  const adult = humanAge.filter(age => age > 18);

  const average =
    adult.reduce((acc, curr, i) => acc + curr, 0) / humanAge.length;

  return average;
};

console.log(
  data1.map(age => (age <= 2 ? age * 2 : 16 + age * 4)).filter(age => age > 18)
);

console.log(humanAgeCal(data1));
console.log(humanAgeCal(data2));


//Filter
const juliaData1 = [3, 5, 2, -6, -4];
const deposits = juliaData1.filter(arr => arr > 0);
console.log(deposits);

const withdraw = juliaData1.filter(mov => mov < 0);
console.log(withdraw);

//Reduce
const balance = juliaData1.reduce(function (acc, cur, i, arr) {
  console.log(`${i} : ${acc}`);
  return acc + cur;
}, 0);

console.log(balance);

/*
const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];

const checkDogs = function (movements) {
  const correctData = movements.slice(1);
  movements.forEach(function (move, i) {
    const oldCheck = move >= 5 ? 'an adult' : 'still a puppy 🐶';
    console.log(`Dog number ${i + 1} is ${oldCheck} ${move}`);
  });
};

checkDogs(juliaData1.slice(1, 3));

const checkRate = function (test) {
  const eurToUsd = 1.1;
  return test.movements.map(move => move * eurToUsd);
};

console.log(checkRate(account1).join(' *** '));

const checkRate2 = test => test.movements.map(move => move * eurToUsd);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, move] of movements.entries()) {
  if (move > 0) {
    console.log(`Movement ${i + 1} : You deposited ${move}`);
  } else {
    console.log(`Movement ${i + 1} : You withdraw ${Math.abs(move)}`);
  }
}

console.log('---FOR EACH---');
movements.forEach(function (move, i, arr) {
  if (move > 0) {
    console.log(`Movement ${i + 1} : You deposited ${move}`);
  } else {
    console.log(`Movement ${i + 1} : You withdraw ${Math.abs(move)}`);
  }
});


//SLICE (Not mutate orinal array)
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2));
console.log(arr.slice(-2));
console.log([...arr]);

//SPICE (Mutate the array)
console.log(arr.splice(4));
console.log(arr);

//REVERSE (Mutate the array)
const arr2 = ['i', 'j', 'k', 'l', 'm'];
console.log(arr2.reverse());
console.log(arr2);

//CONCATNATE (Not mutate orinal array)
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN (Not mutate orinal array)
console.log(letters.join('-'));
console.log(letters);
*/
