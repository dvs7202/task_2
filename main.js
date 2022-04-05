const app = require("express")();
const { Worker, isMainThread } = require("worker_threads");

let worker;
if (isMainThread) {
  worker = new Worker("./worker.js");

  worker.on("error", (error) => {
    console.log("Got error".error);
  });

  worker.on("exit", (exitcode) => {
    console.log(exitcode);
  });
}

app.get("/:number", (req, res) => {
  const number = req.params.number;
  worker = new Worker("./worker.js");
  //res.send("We have received your data. we are processing on it ");
  console.log(number);
  worker.postMessage(number);

  worker.on("message", (data) => {
    res.status(200).json(data);
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
