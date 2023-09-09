const express = require("express");
const router = express.Router();
// const keyword_extractor = require("keyword-extractor");
const { check, body } = require('express-validator');

const sec_utils = require('../utils/security_utils');

/* Controller route: localhost:3000/blog_service */

router.get('/keywordSelection', [
    body().custom(body => {
        const keys = ['content'];
        return Object.keys(body).every(key => keys.includes(key));
    })
],
    (req, res) => {
        // Validate API request
        const validate = sec_utils.APIRequestIsValid(req);
        if (validate.statusCode != 200) {
            return res.status(validate.statusCode).json({ message: validate.message });
        }
        console.log("Inside blog service");
        //console.log(req);
        const sentence = req.query.content;
        // const sentence =
        //     "President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency."

        //  Extract the keywords
        // const extraction_result =
        //     keyword_extractor.extract(sentence, {
        //         language: "english",
        //         remove_digits: true,
        //         return_changed_case: true,
        //         remove_duplicates: true

        //     });

        const extraction_result = [];
        const resp = {
            keywords: extraction_result,
            message: "Code successfully created."
        }
        return res.status(200).json(resp);
    });

module.exports = router;
