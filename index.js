const express = require('express');
const app = express();
const port = 3001;
const path = require("path");
const router = express.Router();

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

router.get("/v1/aspsps/csv/download", (request, response) => {
    response.download(path.join(__dirname + "/resources/responses/download.csv"));
});

router.post("/v1/aspsps/csv/merge", (request, response) => {
    response.sendStatus(200);
});

router.post("/v1/aspsps/csv/upload", (request, response) => {
    response.sendStatus(200);
});

router.post("/v1/aspsps", (request, response) => {
    if (!request.body) {
        response.sendStatus(400);
    } else {
        response.sendStatus(201);
    }
});

router.put("/v1/aspsps", (request, response) => {
    if (!request.body) {
        response.sendStatus(400);
    } else {
        response.sendStatus(202);
    }
});

router.delete("/v1/aspsps/:id", (request, response) => {
    if (!request.params.id) {
        response.sendStatus(400);
    } else {
        response.sendStatus(204);
    }
});

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

app.use("/", router);

app.listen(port, (err) => {
    if (err) {
        return console.log(`Error occured: ${err}`);
    }

    console.log(`server is listening on ${port}`);
});