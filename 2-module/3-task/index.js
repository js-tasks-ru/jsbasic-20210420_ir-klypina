let calculator = {
  firstOperand: null,
  secondOperand: null,
  read: function (a, b) {
    this.firstOperand = a;
    this.secondOperand = b;
  },
  sum: function () {
    return this.firstOperand + this.secondOperand;
  },
  mul: function () {
    return this.firstOperand * this.secondOperand;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
