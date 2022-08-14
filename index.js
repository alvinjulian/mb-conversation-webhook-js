// Require express and body-parser
const express = require("express")
const bodyParser = require("body-parser")
const knexConfig = require('./knexfile')['development']
const knex = require('knex')(knexConfig)
const moment = require('moment')

// Initialize express and define a port
const app = express()
const PORT = 3000

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post("/webhook", (req, res) => {
    // console.log(req.body) // Call your action on the request here

    // Check body is missing or not
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            "message": "Body cannot be null",
            "status": "error"
        })
    }

    // Check the body if contain the status for it
    if(req.body.status === undefined || req.body.status === "") {
        res.status(400).send({
            "message": "Status of the message cannot be null",
            "status": "error"
        })
    } else {
        if(req.body.status === "rejected" || req.body.status === "failed") {
            var created = moment(req.body.createdDatetime).format('YYYY-MM-DD HH:mm:ss')
            var updated = moment(req.body.updatedDatetime).format('YYYY-MM-DD HH:mm:ss')
            //insert it to the database
            knex(req.body.status).insert({
                messageId: req.body.id,
                from: req.body.from,
                to: req.body.to,
                templateName: req.body.content.hsm.templateName,
                trackId: req.body.trackId,
                errorCode: req.body.error.code,
                description: req.body.error.description,
                createdAt: created,
                updatedAt: updated,
                status: req.body.status,
            }).then(() => {
                res.status(200).send({
                    "message": "Message sent",
                    "status": "success"
                })
            })
        } else {
            var created = moment(req.body.createdDatetime).format('YYYY-MM-DD HH:mm:ss')
            var updated = moment(req.body.updatedDatetime).format('YYYY-MM-DD HH:mm:ss')
            //insert it to the database
            knex(req.body.status).insert({
                messageId: req.body.id,
                from: req.body.from,
                to: req.body.to,
                templateName: req.body.content.hsm.templateName,
                trackId: req.body.trackId,
                createdAt: created,
                updatedAt: updated,
                status: req.body.status,
            }).then(() => {
                res.status(200).send({
                    "message": "Message sent",
                    "status": "success"
                })
            })
        }
    }
})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))