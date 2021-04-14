const express = require('express');
const app = express();
const port = 3001;
const router = express.Router();
const path = require("path");

router.get("/aspsp-certificates/tpp-pb-password_cert.pem", (request, response) => {
    console.log("request for certificate");
    return response.sendFile(path.join(__dirname + "/resources/responses/tpp-pb-password_cert.pem"));
});

// router for static libraries e.g. css, js, etc.
app.use(express.static(__dirname + '/resources/static'));
app.use(express.json());

app.use("/", router);

app.listen(port, (err) => {
    if (err) {
        return console.log(`Error occurred: ${err}`);
    }

    console.log(`server is listening on ${port}`);
});