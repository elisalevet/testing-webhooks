// const express = require("express");
// const path = require("path");
// const volleyball = require("volleyball");

// const app = express();

// // logging middleware
// // Only use logging middleware when not running tests
// const debug = process.env.NODE_ENV === "test";
// app.use(volleyball.custom({ debug }));

// // body parsing middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // static middleware
// app.use(express.static(path.join(__dirname, "../public")));

// app.use("/api", require("./api")); // include our routes!

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// }); // Send index.html for any other requests

// // error handling middleware
// app.use((err, req, res, next) => {
//   if (process.env.NODE_ENV !== "test") console.error(err.stack);
//   res.status(err.status || 500).send(err.message || "Internal server error");
// });

// module.exports = app;

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const db = require('./db/queries');

// const events_model = require('./queries')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.get('/', (req,res)=> {
     res.send("My Webhook only app");

});

app.post('/webhook', (req, res) => {
    let event = req.body

    try {
        JSON.parse(event)
    }catch (error) {
        res.status(400).send('there must be an error');
    }

    const name =req.body.event
    const accountid =req.body.payload.account_id
   console.log('this is the payload', event)
    console.log('I am the event', name)
    console.log('I am the accountID', accountid)

    if (req.headers.authorization === process.env.ZOOM_WEBHOOK_VERIFICATION_TOKEN) {
        res.status(200).send()      
    } else {
      console.log('Unauthorized request') 
    }
  })

//   const postEvents = (request, response) => {
//     const name = request.body.event
//     const accountid = request.body.payload.accountid

//     pool.query('INSERT INTO events (name, accountid) VALUES ($1, $2)', [name, accountid], (error, results) => {
//         if (error){ 
//             throw error
//         }
//         response.status(201).send('Event added')
//     })
// }


app.get('/events', db.getEvents)
app.post('/events', db.postEvents)
// app.post('/events', (req, res) => {
//     events_model.postEvents(req.body)
//     .then(response => {
//         res.status(200).send(response)
//     })
//     .catch(error => {
//         res.status(500).send(error)
//     })
// })
app.listen(port, () => {
    console.log(`My app listening on port ${port}!`)
})