const { time } = require('console');
const express = require('express');
const fs = require('fs') 
const app = express();
const Datastore = require('nedb');

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));
const log_coordinates = [];
const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log("I've got a request!")
    const data = request.body;
    const timestamp = Date.now()
    data.timestamp = timestamp;
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });

    database.insert(data)

});



// respond with logs when a GET request is made to the /logs
app.get('/logs', (req, res) => {
    const db = database.find({}, function (err, docs) {
        console.log('response sent!')
        res.send(docs)
        console.log(docs)
    });
    })

app.get('/api', (request, response) => {
    database.find({}, (err, data)=> {
        if (err){
            response.end();
            console.log(err);
            return;
        }else {
            response.json(data);
        }
    });
})