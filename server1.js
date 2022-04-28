const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

const expressApp = require("./app");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer(expressApp);

  const port = 3001;
  httpServer.listen(port, () =>
    console.log(`server started listening on port ${port}`)
  );
}
