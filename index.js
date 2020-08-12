const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const router = express.Router();
const req = require("request");

const BASE = "/v1/aspsps";
const BASE_CSV = BASE + "/csv";
let counter = 0;

// custom APIs
router.get("/logout", async (request, response) => {
    response.set({ status: "Logged out" }).redirect("back");
});

router.get("/v1/aspsps/", (request, response) => {
    response.set("X-Total-Elements", "22");
    if (!request.query.page) {
        response.sendFile(path.join(__dirname + "/resources/responses/search0x.json"));
    } else if (request.query.page === "1") {
        response.sendFile(path.join(__dirname + "/resources/responses/search1x.json"));
    } else if (request.query.page === "2") {
        response.sendFile(path.join(__dirname + "/resources/responses/search2x.json"));
    } else {
        response.sendFile(path.join(__dirname + "/resources/responses/searchEmpty.json"));
    }
});

router.get(BASE_CSV + "/download", (request, response) => {
    setTimeout(() => {
        response.download(path.join(__dirname + "/resources/responses/download.csv"));
    }, 2000);
});

router.post(BASE_CSV + "/merge", (request, response) => {
    setTimeout(() => {
        response.sendStatus(500);
    }, 2000);
});

router.post(BASE_CSV + "/upload", (request, response) => {
    setTimeout(() => {
        response.sendStatus(200);
    }, 2000);
});

router.post(BASE, (request, response) => {
    if (!request.body) {
        console.log("request has no body");
        response.sendStatus(400);
    } else {
        response.status(201).sendFile(path.join(__dirname + "/resources/responses/saveResponse.json"));
    }
});

router.post(BASE + "/validate", (request, response) => {
    if (!request.body) {
        console.log("request has no body");
        response.sendStatus(400);
    } else {
        response.status(201).send("false");
    }
});

router.put(BASE, (request, response) => {
    if (!request.body) {
        console.log("request has no body");
        response.sendStatus(400);
    } else {
        response.sendStatus(202);
    }
});

router.delete(BASE + "/:id", (request, response) => {
    response.sendStatus(204);
});

router.delete(BASE, (request, response) => {
    console.log("request has no id");
    response.sendStatus(400);
});

router.get(BASE + "/count", (request, response) => {
    response.send("2000");
});

router.post(BASE_CSV + "/validate/upload", (request, response) => {
    if (!request.body) {
        console.log("request has no body");
        response.sendStatus(404);
    } else {
        setTimeout(() => {
            response.status(200).sendFile(path.join(__dirname + "/resources/responses/validationResponseUploadValid.json"));
        }, 3000)
    }
})

router.post(BASE_CSV + "/validate/merge", (request, response) => {
    if (!request.body) {
        console.log("request has no body");
        response.sendStatus(404);
    } else {
        setTimeout(() => {
            response.status(400).sendFile(path.join(__dirname + "/resources/responses/validationResponseMergeNotValid.json"));
        }, 3000)
    }
})

// router.post("/v1/aspsps/csv/merge", (request, response) => {
//     response.sendStatus(403);
// });

// router.post("/v1/aspsps/csv/upload", (request, response) => {
//     response.sendStatus(403);
// });

// router.post("/v1/aspsps", (request, response) => {
//     response.sendStatus(403);
// });

// router.put("/v1/aspsps", (request, response) => {
//     response.sendStatus(403);
// });

// router.delete("/v1/aspsps/:id", (request, response) => {
//     if (!request.params.id) {
//         response.sendStatus(400);
//     } else {
//         response.sendStatus(403);
//     }
// });

/* Checking adapter pre-step  */
router.get("/aspsp", (request, response) => {
    console.log("testing response");
    response.send("OK");
});

// router.post("/aspsp/v1/consents", (request, response) => {
//     console.log("failed consent");
//     response
//         .status(403)
//         .set({ 'Content-Type': 'application/xml;charset=UTF-8' })
//         .sendFile(path.join(__dirname + "/resources/responses/xmlResponse.xml"))
// });

router.post("/aspsp/v1/consents", (request, response) => {

    if (counter < 1) {
        failed(response);
        counter++;
    } else {
        success(response);
        counter = 0;
    }
});

router.get("/aspsp/v1/payments/sepa-credit-transfers/:id/status", (request, response) => {

    if (counter < 1) {
        failed(response);
        counter++;
    } else {
        successStatus(response);
        counter = 0;
    }
});

const successStatus = (response) => {
    console.log("success status");
    return response
        .status(200)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            transactionStatus: "foo"
        })
}

const failed = (response) => {
    console.log("failed");
    return response
        .status(500)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            tppMessage: [{
                category: "SERVER ERROR",
                code: "SERVER ERROR",
                text: "Intentionally went wrong"
            }]
        })
}

const success = (response) => {
    console.log("success consent");
    return response
        .status(200)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            consentStatus: "received",
            consentId: "LWigcCDnqIju2WxmN2QJiIIwDPJRCi55C92NUPa5IXRNg8JYEtRvNJAdwuefV7G4XcX1qLGcJAusajIQOAZagMz9MpaJIQIH3NJX8IHgetw=_=_psGLvQpt9Q",
            _links: {
                scaRedirect: {
                    href: "localhost:3001/aspsp"
                },
                self: {
                    href: "localhost:3001/aspsp/v1/consents/"
                }
            }
        })
}

const successPayment = (response) => {
    console.log("success initiation");
    return response
        .status(200)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            transactionStatus: "RCVD",
            paymentId: "BWbshZUvuxnSwPNth2l-I3T0soaM3tozlyhq4pkpMd9eXNqj49jykOzF6X6Z1XdjcgftJbETkzvNvu5mZQqWcA==_=_psGLvQpt9Q",
            _links: {
                scaRedirect: {
                    href: "localhost:3001/aspsp"
                },
                self: {
                    href: "localhost:3001/aspsp/v1/consents/"
                }
            }
        })
}

router.post("/aspsp/v1/payments/sepa-credit-transfers", (request, response) => {
    successPayment(response);
});

const initiation403 = (response) => {
    console.log("failed initiation 403");
    return response
        .status(403)
        .set({ 'Content-Type': 'application/xml;charset=UTF-8' })
        .send({
            tppMessage: [{
                category: "ERROR",
                code: "UNAUTHORIZED",
                text: "The TPP or the PSU is not correctly authorized to perform the request"
            }]
        })
}

router.get("/aspsp/idp/oauth2/authorize", (request, response) => {
    console.log("redirect back");

    response
        .status(200)
        .send("redirect back: http://localhost:8080/redirect")
});

router.post("/aspsp/idp", (request, response) => {
    console.log("idp url");
    response.status(200).json({
        scope: "AIS:VALID_CONSENT_ID",
        access_token: "e4008a1f11634a72b4809cf8eb2794de04eae2406faa4891bd2655039267c0b94337274427b0420bb677202f706aeb58",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "7d587627adb9461bbe946a4f300f3070cacf87d7ff244e7ebb299a523af6c03619f6494129bb4a07a97a1c18c852122e"
    });
});

// router for static libraries e.g. css, js, etc.
app.use(express.static(__dirname + '/resources/static'));
app.use(express.json());

app.use("/", router);

app.listen(port, (err) => {
    if (err) {
        return console.log(`Error occured: ${err}`);
    }

    console.log(`server is listening on ${port}`);
});