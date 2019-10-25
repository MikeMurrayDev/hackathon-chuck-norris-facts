const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

dotenv.config();

const twilioNumber = process.env.TWILIO_PHONE;
const phoneBook = {
    Mike: process.env.MIKE_PHONE,
    Jess: process.env.JESS_PHONE
}

const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(urlEncodedParser);

app.get('/random', (req, res) => {
    axios.get(`https://api.chucknorris.io/jokes/random`)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/get_categories', (req, res) => {
    axios.get(`https://api.chucknorris.io/jokes/categories`)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/fact/:category', (req, res) => {
    const category = req.params.category;

    axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((result) => {
            res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.post('/send_fact', (req, res) => {
    client.messages.create({
        body: req.body.fact,
        to: phoneBook[req.body.recipient],
        from: twilioNumber,
     })
    .then(message => 
        console.log(message.sid))
    .catch((error) => {
        console.error(error);
        res.send('An error occured for Twilio.');
    });
});

module.exports = app;