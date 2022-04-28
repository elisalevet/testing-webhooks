const Pool = require('pg').Pool
const pool =  new Pool({
    user : 'me',
    host : 'localhost',
    database:  'webhooks',
    password : 'password',
    port: 5432
})

const getEvents = (request, response) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows)
    })
}

const postEvents = (request, response) => {
    const name = request.body.event
    const accountid = request.body.payload.accountid

    pool.query('INSERT INTO events (name, accountid) VALUES ($1, $2)', [name, accountid], (error, results) => {
        if (error){ 
            throw error
        }
        response.status(201).send('Event added')
    })
}


module.exports = {
    getEvents, 
    postEvents
}