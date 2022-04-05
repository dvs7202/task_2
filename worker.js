const { parentPort, isMainThread } = require("worker_threads");

if (!isMainThread) {
  parentPort.on("message", (number) => {
    console.log("fibbonacci number is", number);
    const data = fib(number);
    parentPort.postMessage(data);
  });
}

// program to generate fibonacci series up to a certain number

// take input from the user
//const number = parseInt(prompt("Enter a positive number: "));

var fib = function (n) {
  if (n === 1) {
    return [0, 1];
  } else {
    var arr = fib(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return arr;
  }
};
