const express = require('express');
const app = express();
const port = 3001;
const router = express.Router();

router.post("/aspsp/v1/consents", (request, response) => {
    console.log("success consent");
    return response
        .status(200)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            consentStatus: "received",
            consentId: "consentId",
            _links: {
                scaRedirect: {
                    href: "https://guthib.com"
                },
                self: {
                    href: "localhost:3001/aspsp/v1/consents/"
                }
            }
        })
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