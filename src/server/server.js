var path = require("path");
var jsonServer = require("json-server");
var server = jsonServer.create();
var superHeroes = jsonServer.router(require("./data/super-heroes"));
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(superHeroes);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
