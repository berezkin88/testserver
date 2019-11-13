const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const router = express.Router();

// custom APIs
router.get("/logout", (request, response) => {
    response.set({status: "Logged out"}).redirect("back");
});

router.get("/v1/aspsps", (request, response) => {
    response.set("X-Total-Elements", "22");
    response.sendFile(path.join(__dirname + "/resources/responses/search.json"));
});

router.get("/v1/aspsps/csv/download", (request, response) => {
    response.download(path.join(__dirname + "/resources/responses/download.csv"));
});

router.post("/v1/aspsps/csv/merge", (request, response) => {
    response.status(200).end();
});

router.post("/v1/aspsps/csv/upload", (request, response) => {
    response.status(200).end();
});

// router for static libraries e.g. css, js, etc.
app.use(express.static(__dirname + '/resources/static'));

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    return console.log(`Error occured: ${err}`);
  }

  console.log(`server is listening on ${port}`);
});