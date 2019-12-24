const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const router = express.Router();

const BASE = "/v1/aspsps";
const BASE_CSV = BASE + "/csv";

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