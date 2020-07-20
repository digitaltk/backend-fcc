const express = require('express');
const app = express();



const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// Next, we'll use express.js's built-in middleware to define the location of the static folder for our project (where we'll keep CSS, images, JS files, etc.)
app.use(express.static('public'));

// With that done, we'll also make sure that we handle any visits to our root endpoint by routing them to our desired landing page:

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//main task API

app.get('/api/whoami', (req, res) => {
  const ip =
    req.headers['x-forwarded-for'].split(', ').pop() ||
    req.connection.remoteAddress;
  const language = req.acceptsLanguages();
  const userAgent = req.get('user-agent');

  res.json({
    ipaddress: ip.split(',')[0],
    language: language.join(','),
    software: userAgent
  });
});


const listener = app.listen(process.env.PORT, () => {
  console.log('App Respond' + listener.address().port);
});
