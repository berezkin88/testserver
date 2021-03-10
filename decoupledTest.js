const express = require('express');
const app = express();
const port = 3001;
const router = express.Router();

router.post("/aspsp/v1/consents", (request, response) => {
    console.log("Create consent");
    return response
        .status(201)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .send({
            "consentStatus": "received",
            "consentId": "b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q",
            "_links": {
                "self": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q"
                },
                "status": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q/status"
                },
                "startAuthorisationWithPsuAuthentication": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q/authorisations"
                }
            }
        });
});

router.post("/aspsp/v1/consents/:consentId/authorisations", (request, response) => {
    console.log("Start authorisation");

    return response
        .status(201)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .set({ 'ASPSP-SCA-Approach': 'EMBEDDED' })
        .send({
            "scaStatus": "psuAuthenticated",
            "authorisationId": "8b9695d9-f575-4296-a196-13b66fdc4879",
            "scaMethods": [
                {
                    "authenticationType": "SMS_OTP",
                    "authenticationMethodId": "901",
                    "name": "SMS-TAN",
                    "explanation": "SMS-TAN"
                },
                {
                    "authenticationType": "CHIP_OTP",
                    "authenticationMethodId": "904",
                    "name": "chipTAN comfort",
                    "explanation": "chipTAN comfort"
                },
                {
                    "authenticationType": "PUSH_OTP",
                    "authenticationMethodId": "906",
                    "name": "BV AppTAN",
                    "explanation": "BV AppTAN"
                },
                {
                    "authenticationType": "PHOTO_OTP",
                    "authenticationMethodId": "907",
                    "name": "PhotoTAN",
                    "explanation": "PhotoTAN"
                }
            ],
            "_links": {
                "selectAuthenticationMethod": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q/authorisations/8b9695d9-f575-4296-a196-13b66fdc4879"
                },
                "scaStatus": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q/authorisations/8b9695d9-f575-4296-a196-13b66fdc4879"
                }
            }
        });
});

router.put("/aspsp/v1/consents/:consentId/authorisations/:authorisationId", (request, response) => {
    console.log("Select Sca Method");

    return response
        .status(200)
        .set({ 'Content-Type': 'application/json;charset=UTF-8' })
        .set({ 'ASPSP-SCA-Approach': 'DECOUPLED' })
        .send({
            "chosenScaMethod": {
                "authenticationType": "PUSH_OTP",
                "authenticationMethodId": "906",
                "name": "BV AppTAN",
                "explanation": "BV AppTAN"
            },
            "challengeData": {
                "additionalInformation": "Bitte verwenden Sie zur Freigabe des Auftrages die Ihnen per SMS zugesandte TAN."
            },
            "scaStatus": "scaMethodSelected",
            "_links": {
                "scaStatus": {
                    "href": "https://www.sandbox-bvxs2a.de/xbank/v1/consents/b-2MzpjcQJ6jlsOPetE_KJazKcagek-mFcj0z94Tmw1xmIMtVH8z2uTMvFOSJdVFebOvKYZrt70k4DQ5HRjnxPSdMWF3876hAweK_n7HJlg=_=_psGLvQpt9Q/authorisations/8b9695d9-f575-4296-a196-13b66fdc4879"
                }
            }
        });
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