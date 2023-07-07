document.addEventListener('DOMContentLoaded', function() {
  const calculationDisplay = document.getElementById('calculation');
  const resultDisplay = document.getElementById('result');
  const buttons = document.querySelectorAll('.buttons button');
  const enterButton = document.querySelector('.Enter');
  const backButton = document.querySelector('.back');
  const delButton = document.querySelector('.del');
  const historyContainer = document.getElementById('history');

  let calculation = '';
  let result = 0;
  let history = [];

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      const value = button.getAttribute('data-value');
      appendToCalculation(value);
    });
  });

  enterButton.addEventListener('click', function() {
    calculate();
  });

  backButton.addEventListener('click', function() {
    deleteLastCharacter();
  });

  delButton.addEventListener('click', function() {
    clearCalculation();
  });

  function appendToCalculation(value) {
    if (value === 'result') {
      calculation += result;
    } else {
      calculation += value;
    }
    updateCalculation();
  }

  function deleteLastCharacter() {
    calculation = calculation.slice(0, -1);
    updateCalculation();
  }

  function clearCalculation() {
    calculation = '';
    result = 0;
    updateCalculation();
    resultDisplay.textContent = result;
    clearHistory();
  }

  function calculate() {
    result = eval(calculation);
    resultDisplay.textContent = result;

    if (result === Infinity) {
      calculation = '0';
    } else {
      calculation = result.toString();
    }

    saveCalculation(calculation, result);
    updateCalculation();
  }

  function updateCalculation() {
    calculationDisplay.textContent = calculation;
  }

  function saveCalculation(expression, result) {
    const calculation = {
      expression: expression,
      result: result
    };
    history.push(calculation);
    displayHistory();
  }

  function displayHistory() {
    historyContainer.innerHTML = '';
    history.forEach(function(calculation) {
      const calculationItem = document.createElement('div');
      calculationItem.textContent = `${calculation.expression} = ${calculation.result}`;
      calculationItem.addEventListener('click', function() {
        calculationClicked(calculation.expression);
      });
      historyContainer.appendChild(calculationItem);
    });
  }

  function calculationClicked(expression) {
    calculation = expression;
    updateCalculation();
  }

  function clearHistory() {
    history = [];
    historyContainer.innerHTML = '';
  }
});
