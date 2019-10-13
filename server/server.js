const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api', (req, res) => {
    axios.get(`http://www.mocky.io/v2/5d5cba7e320000a5e4628f33?apikey=${process.env.APIKEY}`)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

// let Api_key = process.env.TWILIO_AUTHTOKEN;

console.log('From SERVER Twilio AuthToken: ',
 `${process.env.TWILIO_AUTHTOKEN}`);

module.exports = app;