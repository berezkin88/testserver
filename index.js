const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const router = express.Router();

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/logout", (request, response) => {
    response.sendFile(path.join(__dirname + "/resources/static/index.html"));
});

router.get("/v1/aspsps", (request, response) => {
    response.sendFile(path.join(__dirname + "/resources/responses/searchEmpty.json"));
});

app.use(express.static(__dirname + '/resources/static'));

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    return console.log('Error occured: ', err);
  }

  console.log(`server is listening on ${port}`);
});