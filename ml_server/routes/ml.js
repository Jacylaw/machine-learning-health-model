// 1. Import dependencies
const express = require('express');
const router = express.Router();
const request = require('request-promise');
const utils = require('../utils/utils');
const fields = utils.fields
const input = utils.input


// 2. Setup router
router.post('/score', async (req, res) => {
    // Get access token from Watson Machine Learning
    const options = {
        method: "POST",
        url: process.env.AUTH_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            apikey: process.env.WML_API_KEY,
            grant_type: "urn:ibm:params:oauth:grant-type:apikey"
        }
    }

    
    let response = ""
    let access_token = ""

    try {
        response = await request(options);
        access_token = JSON.parse(response)["access_token"]
        // res.json({
        //     access_token
        // })
    } catch (error) {
        console.log(error)
    }

    const { Gender, Chronic_Condition, DeductibleAmtPaid,
         Age, State, NoOfDaysAdmitted, ClmProcedureCode, 
         AttendingPhysician, InscClaimAmtReimbursed, 
         IPAnnualReimbursementAmt, County, Race } = req.body;



    let template = [-0.1893219090983058,
        0.018675600573816835,
        0.08216536051358757,
        -0.34899602482181863,
        -0.34899699440554544,
        -0.34340523734431494,
        -0.3524060599139222,
        -0.3681538975597161,
        -0.3518333944951334,
        -0.3410262914618404,
        -0.35613086605570876,
        -0.3498323977896461,
        -0.34764526286699726,
        -0.3584585294664423,
        -0.35633825309951705,
        -0.3494999267913909,
        -0.36687722296534175,
        -0.33583190532119095,
        -0.359276237863779,
        -0.3539675246832456,
        -0.3460738120713371,
        -0.32994962548796253,
        -0.1893219090983058,
        0.015509865403839302,
        -0.36687722296534175,
        -0.33583190532119095,
        -0.359276237863779,
        -0.3539675246832456,
        -0.3460738120713371,
        -0.34899602482181863,
        -0.34899699440554544,
        -0.19956783042740975,
        -0.33871231402925017,
        -0.251669848476498,
        -0.36687722296534175,
        -0.33583190532119095,
        -0.359276237863779,
        -0.3539675246832456,
        -0.28385512776349586,
        -0.3533635540778807,
        0.012944488062017489,
        -0.3632690539117984,
        -0.34072520662466027,
        -0.33366209265151514,
        -0.3352835425415531,
        -0.08261323346255241,
        -0.2102798492388081,
        -0.1023331464764759,
        -0.3367955022111698,
        -0.3112589350665837,
        -0.3605549130100926,
        -0.3648567829950306,
        -0.21374797581565497,
        -0.1898813853508964,
        0.014121839883695224,
        -0.36697488856569915,
        -0.33577734643180046,
        -0.35935714623538356,
        -0.35403277761785223,
        -0.049014415545395464,
        0.024123006534818192,
        0.02188290224000779,
        0.01801597101647239,
        0.014667169674481421,
        -0.0016714306555455228,
        -0.012232743732675548,
        0.04710149152831337,
        -0.046988779384266204,
        -0.086467948445199,
        -0.19486401719440305,
        -0.21822306214311116,
        -0.306728864408096,
        -0.3062296929508074,
        -0.2577202033165793,
        -0.16585396599476018,
        -0.09553387583804288,
        -0.14356085378652206,
        -0.09103975157915078,
        -0.12574377357997796,
        -0.11325856786935365,
        -0.1277688876704152,
        -0.2965628677061608,
        -0.29977087705265076,
        -0.2978711645381251,
        -0.2985712177149818,
        -0.28668565481079256,
        -0.2934041992574448,
        -0.2967925152549175,
        -0.24043569887554078,
        -0.2487805701890756,
        -0.24146373214822708,
        -0.24229817249533736,
        -0.2172150636012405,
        -0.22331630360056207,
        -0.23624769527656203,
        -0.16178409047694606,
        -0.13570974041523046,
        -0.315556498021864,
        -0.3225710097340724,
        -0.3542191122664243,
        -0.35730819916295975,
        -0.31126127794077746,
        -0.3048630456739492,
        -0.2876671189861756,
        -0.3351012293416615,
        -0.331888388684716,
        -0.34257565842939725,
        -0.3475253072826636,
        -0.3350331889961503,
        -0.33795207265363886,
        -0.31873454194964357,
        -0.3246354613274337,
        -0.3229820437963591,
        -0.3229174137326049,
        -0.32040780175728983,
        -0.33205889805880945,
        -0.2106635826449847,
        -0.24184169242254436,
        -0.2334275132800457,
        -0.2607205267184012,
        -0.27794604345458374,
        -0.2842923637549879,
        -0.24525316803581068,
        -0.07670985088594835,
        -0.2538291166229578,
        -0.07486617496981933,
        -0.05617934194601928,
        -0.08773149562110234,
        -0.13197715020609624,
        -0.10827982091939736,
        -0.1409816598210555,
        -0.21018672633884683,
        -0.12786297434092825,
        -0.040821049494552404,
        -0.10708175934647864,
        -0.08531855142144874,
        -0.09965615551449107,
        -0.11645297629319894,
        -0.1412209537310846,
        -0.16062009295485963,
        -0.16528974380645733,
        -0.15363120459894772,
        0.04459352395763975,
        -0.021598794101833452,
        -0.32452744776951287,
        -0.3064274081256901,
        -0.09628744391157121,
        -0.34910873839503725,
        -0.34969639481445236,
        -0.09714210574895651,
        -0.34759378555628057,
        -0.09651394438151581,
        -0.34115924255400915,
        -0.28854690652453957,
        -0.17022483426680193,
        -0.19598377546791992];

    
        // Populate Gender
        template[input.findIndex((val) => val === `Gender_${Gender}`)] = 1;
        // Populate Chronic_Condition
        template[input.findIndex((val) => val === `Chronic_Condition_${Chronic_Condition}`)] = 1;
        // Populate DeductibleAmtPaid
        template[input.findIndex((val) => val === `DeductibleAmtPaid_${DeductibleAmtPaid}`)] = 1;
        // Populate Age
        template[input.findIndex((val) => val === `Age_${Age}`)] = 1;
        // Populate State
        template[input.findIndex((val) => val === `State_${State}`)] = 1;
        // Populate NoOfDaysAdmitted
        template[input.findIndex((val) => val === `NoOfDaysAdmitted_${NoOfDaysAdmitted}`)] = 1;
        // Populate ClmProcedureCode
        template[input.findIndex((val) => val === `ClmProcedureCode_${ClmProcedureCode}`)] = 1;
        // Populate AttendingPhysician
        template[input.findIndex((val) => val === `AttendingPhysician_${AttendingPhysician}`)] = 1;
        // Populate InscClaimAmtReimbursed
        template[input.findIndex((val) => val === `InscClaimAmtReimbursed_${InscClaimAmtReimbursed}`)] = 1;
        // Populate IPAnnualReimbursementAmt
        template[input.findIndex((val) => val === `IPAnnualReimbursementAmt_${IPAnnualReimbursementAmt}`)] = 1;
        // Populate County
        template[input.findIndex((val) => val === `County_${County}`)] = 1;
        // Populate Race
        template[input.findIndex((val) => val === `Race_${Race}`)] = 1;

        
        //console.log(template)

        //console.log(fields)
    const scoring_options = {
        method: "POST",
        url: process.env.WML_SCORING_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "ML-Instance-ID": process.env.WML_INSTANCE_ID
        },
        body: JSON.stringify(
            {
                input_data: [
                    {
                        fields: fields,
                        values: [template]
                    }
                ]
            }
        )
    }

    let scoring_response = "";

    try {
        scoring_response = await request(scoring_options);
        res.send(scoring_response);
    } catch (error) {
        console.log(error);
        console.log(template)
        res.send(error);
    }


})
module.exports = router;