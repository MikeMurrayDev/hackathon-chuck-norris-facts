const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// const accountSid = `${process.env.TWILIO_ACCOUNTSID}`;
// const authToken = `${process.env.TWILIO_AUTHTOKEN}`;
// const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/random', (req, res) => {
    axios.get(`https://api.chucknorris.io/jokes/random`)
        .then((result) => {
            res.send(result.data);
            console.log('Chuck Random: ', result);
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
            console.log('Chuck Categories: ', result);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/joke_from_category', (req, res) => {
    axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((result) => {
            res.send(result.data);
            console.log('Chuck Categories: ', result);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});
// client.messages
//   .create({
//      body: 'This is a TEST!  WOOOHOOOOO!!',
//      from: '+12063503977',
//     //  to: '+14086461240'
//     to: '+17038640171'
//    })
//   .then(message => console.log(message.sid));

module.exports = app;