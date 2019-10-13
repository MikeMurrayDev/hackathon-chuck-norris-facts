var envs = require('envs');

const accountSid = envs(TWILIO_ACCOUNTSID);
const authToken = envs(TWILIO_AUTHTOKEN);
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));

  console.log('From SEND_SMS Twilio AuthToken: ', process.env.TWILIO_AUTHTOKEN);