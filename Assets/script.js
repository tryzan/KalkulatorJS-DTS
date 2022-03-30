const calculatorScreen = document.querySelector(".cal-screen");
const updateScreen = () => {
  if (concNum.length == 0) {
    calculatorScreen.value = currentNum;
  } else {
    if (concNum[0] == 0) {
      calculatorScreen.value = `${currentNum}`;
      concNum = [];
    } else {
      calculatorScreen.value = `${concNum.join(" ")} ${currentNum}`;
    }
    console.log(concNum);
  }
};
const updateHasilScreen = () => {
  currentNum = "";
  calculatorScreen.value = `${concNum.join(" ")}`;
};
let currentNum = "0";
let result = "";
let concNum = [];

const inputNum = (number) => {
  if (currentNum === "0") {
    currentNum = number;
    console.log(currentNum);
  } else if (result > 0 || result < 0) {
    result = "";
    currentNum += number;
    concNum = [];
  } else {
    currentNum += number;
  }
};

const numbers = document.querySelectorAll(".num");
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNum(event.target.value);
    updateScreen();
  });
});

const inputOperator = (operator) => {
  if (currentNum === "0" && result == 0) {
    // concNum.pop();
    // concNum.push(operator);
    concNum[concNum.length - 1] = operator;
  } else if (result > 0 || result < 0) {
    currentNum = "";
    concNum = [];
    concNum.push(result.toString());
    concNum.push(operator);
    result = "0";
  } else {
    concNum.push(currentNum);
    currentNum = "0";
    concNum.push(operator);
  }
};

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    // if(concNum[concNum.length-1]==event.target.value){
    //   console.log('operator sama')
    // }else{
    inputOperator(event.target.value);
    updateScreen();
    // }
  });
});

const calculate = () => {
  console.log(currentNum);
  if (currentNum == "") {
    console.log("kosong");
  } else {
    concNum.push(currentNum);
    console.log(concNum);
  }

  while (concNum.length !== 1) {
    concNum.forEach((number, index) => {
      if (number === "%") {
        result = parseFloat(concNum[index - 1]) % parseFloat(concNum[index + 1]);
        concNum[index - 1] = result;
        concNum.splice(index, 2);
      }
    });

    concNum.forEach((number, index) => {
      if (number === "*") {
        result = parseFloat(concNum[index - 1]) * parseFloat(concNum[index + 1]);
        concNum[index - 1] = result;
        concNum.splice(index, 2);
      }
    });
    concNum.forEach((number, index) => {
      if (number === "/") {
        result = parseFloat(concNum[index - 1]) / parseFloat(concNum[index + 1]);
        concNum[index - 1] = result;
        concNum.splice(index, 2);
      }
    });
    concNum.forEach((number, index) => {
      if (number === "-") {
        result = parseFloat(concNum[index - 1]) - parseFloat(concNum[index + 1]);
        concNum[index - 1] = result;
        concNum.splice(index, 2);
      }
    });

    concNum.forEach((number, index) => {
      if (number === "+") {
        result = parseFloat(concNum[index - 1]) + parseFloat(concNum[index + 1]);
        concNum[index - 1] = result;
        concNum.splice(index, 2);
      }
    });
    break;
  }
};
const equalSign = document.querySelector(".equal");
equalSign.addEventListener("click", () => {
  calculate();
  updateHasilScreen();
});

const clearALl = () => {
  concNum = [];
  currentNum = "0";
  result = "";
};
const clearBtn = document.querySelector(".AC");
clearBtn.addEventListener("click", () => {
  clearALl();
  updateScreen();
});

const inputDecimal = (dot) => {
  if (currentNum.includes(".")) {
    return;
  }
  currentNum += dot;
};
const decimal = document.querySelector(".dec");
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen();
});
