const calculatorScreen = document.querySelector(".cal-screen");
const updateScreen = () => {
  console.log(currentNum);
  console.log("ini");
  console.log(concNum);
  if (concNum.length == 0) {
    calculatorScreen.value = currentNum;
  } else {
    if (concNum[0] == 0) {
      calculatorScreen.value = `${currentNum}`;
      concNum = [];
    } else {
      calculatorScreen.value = `${concNum.join(" ")} ${currentNum}`;
    }
  }
};
const updateHasilScreen = () => {
  // currentNum = "";
  calculatorScreen.value = `${concNum.join(" ")}`;
};
let currentNum = "0";
let result = "";
let concNum = [];
let op = [];
let inum = [];

const inputNum = (number) => {
  if (currentNum === "0") {
    currentNum = number;
    inum.push(number);
  } else if (result > 0 || result < 0) {
    result = "";
    currentNum += number;
    inum.push(number);
    concNum = [];
  } else {
    currentNum += number;
    inum.push(number);
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
  if (inum == 0 && result == 0) {
    console.log("input angka terlebih dahulu");
  } else {
    if (currentNum === "0" && result == 0) {
      concNum[concNum.length - 1] = operator;
    } else if (result > 0 || result < 0) {
      currentNum = "";
      concNum = [];
      concNum.push(result.toString());
      concNum.push(operator);
      op.push(operator);
      result = "0";
    } else {
      concNum.push(currentNum);
      currentNum = "0";
      concNum.push(operator);
      op.push(operator);
    }
    console.log(op);
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
const addlastnum = () => {
  if (currentNum == "") {
    console.log("input kosong");
  } else if (currentNum >= 0 && op.length == 0) {
    currentNum = currentNum;
    console.log(currentNum);
    console.log("tidak bisa menambahkan angka dikarenakan tidak ada operator");
  } else {
    concNum.push(currentNum);
    op = [];
    inum = [];
    console.log(concNum);
  }
};

const calculate = () => {
  if (concNum.length < 3) {
    console.log(currentNum);
    console.log("Tidak dapat di operasikan");
  } else {
    do {
      const perkalian = concNum.filter((operasi) => {
        return operasi == "*";
      });
      const pembagian = concNum.filter((operasi) => {
        return operasi == "/";
      });
      const modulo = concNum.filter((operasi) => {
        return operasi == "%";
      });
      const pengurangan = concNum.filter((operasi) => {
        return operasi == "-";
      });
      const pertambahan = concNum.filter((operasi) => {
        return operasi == "+";
      });
      if (perkalian.length > 0) {
        concNum.forEach((value, index) => {
          if (value == "*") {
            result = parseFloat(concNum[index - 1]) * parseFloat(concNum[index + 1]);
            concNum[index - 1] = result;
            concNum.splice(index, 2);
          }
        });
      } else if (pembagian.length > 0) {
        concNum.forEach((value, index) => {
          if (value == "/") {
            result = parseFloat(concNum[index - 1]) / parseFloat(concNum[index + 1]);
            concNum[index - 1] = result;
            concNum.splice(index, 2);
          }
        });
      } else if (modulo.length > 0) {
        concNum.forEach((value, index) => {
          if (value == "%") {
            result = parseFloat(concNum[index - 1]) % parseFloat(concNum[index + 1]);
            concNum[index - 1] = result;
            concNum.splice(index, 2);
          }
        });
      } else if (pengurangan.length > 0) {
        concNum.forEach((value, index) => {
          if (value == "-") {
            result = parseFloat(concNum[index - 1]) - parseFloat(concNum[index + 1]);
            concNum[index - 1] = result;
            concNum.splice(index, 2);
          }
        });
      } else {
        concNum.forEach((value, index) => {
          if (value == "+") {
            result = parseFloat(concNum[index - 1]) + parseFloat(concNum[index + 1]);
            concNum[index - 1] = result;
            concNum.splice(index, 2);
          }
        });
      }
    } while (concNum.length !== 1);
  }
  // currentNum = "";
};

const equalSign = document.querySelector(".equal");
equalSign.addEventListener("click", () => {
  addlastnum();
  calculate();
  if (result.length !== 0) {
    console.log("sini gan");
    updateHasilScreen();
    currentNum = "";
  } else {
    console.log("masuk kesini tapi salah");
    updateScreen();
  }
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
  } else if ((result > 0 && currentNum == 0) || (result < 0 && currentNum == 0)) {
    if (result.toString().includes(".")) {
      console.log("ada");
      currentNum = result;
      console.log(concNum);
    } else {
      console.log("sini");
      result.toString();
      result += dot;
      currentNum = result;
      result = 0;
      concNum = [];
    }
  } else {
    currentNum += dot;
  }
};
const decimal = document.querySelector(".dec");
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  if (result.length !== 0) {
    updateHasilScreen();
  } else {
    updateScreen();
  }
});
