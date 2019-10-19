const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// const mikeNumber = `${process.env.MIKE_PHONE}`;
// const jessNumber = `${process.env.JESS_PHONE}`;

// const accountSid = `${process.env.TWILIO_ACCOUNTSID}`;
// const authToken = `${process.env.TWILIO_AUTHTOKEN}`;
// const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));
// app.use(express.json());

// app.get('/random', (req, res) => {
//     axios.get(`https://api.chucknorris.io/jokes/random`)
//         .then((result) => {
//             res.send(result.data);
//             console.log('Chuck Random Fact: ', result);
//         })
//         .catch((error) => {
//             console.error(error);
//             res.send('An error occured.');
//         })
// });

app.get('/get_categories', (req, res) => {
    axios.get(`https://api.chucknorris.io/jokes/categories`)
        .then((result) => {
            console.log('Chuck Categories: ', result);
            res.send(result.data);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

// app.get('/fact/:category', (req, res) => {
//     const category = req.params.category;

//     axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
//         .then((result) => {
//             res.send(result.data);
//             console.log('Chuck Category Fact: ', result);
//         })
//         .catch((error) => {
//             console.error(error);
//             res.send('An error occured.');
//         })
// });

// client.messages
//   .create({
//      body: 'This is a TEST!  WOOOHOOOOO!!',
//      from: '+12063503977',
//     //  to: '+14086461240'
//     to: '+17038640171'
//    })
//   .then(message => console.log(message.sid));

module.exports = app;