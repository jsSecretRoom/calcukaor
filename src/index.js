document.addEventListener('DOMContentLoaded', function() {
  function calculator(activCalkulating, resultCalculation, historySelector){

    const calculationDisplay = document.getElementById(activCalkulating);
    const resultDisplay = document.getElementById(resultCalculation);
    const historyContainer = document.getElementById(historySelector);

    const enterButton = document.querySelector('.Enter');
    const backButton = document.querySelector('.back');
    const delButton = document.querySelector('.del');

    const buttons = document.querySelectorAll('.buttons button');

    let calculation = '';
    let result = 0;
    let history = [];

    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        const value = button.getAttribute('data-value');
        appendToCalculation(value);
      });
    });

    function appendToCalculation(value) {
      if (value === 'result') {
        calculation += result;
      } else {
        calculation += value;
      }
      updateCalculation();
    }

    function updateCalculation() {
      calculationDisplay.textContent = calculation;
    }

    //------//
    enterButton.addEventListener('click', function() {
      calculate();
    });
    backButton.addEventListener('click', function() {
      deleteLastCharacter();
    });
    delButton.addEventListener('click', function() {
      clearCalculation();
    });
    //------//

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
  }
  calculator('calculation', 'result', 'history')
});
