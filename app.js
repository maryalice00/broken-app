const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.json());

app.post('/', async function(req, res, next) {
  try {
    const { developers } = req.body;
    
    let results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data;
    }));

    let out = results.map(r => ({ name: r.name, bio: r.bio }));

    return res.send(out);
  } catch(err) {
    next(err);
  }
});

// Route handler for the root URL
app.get('/', function(req, res) {
  res.send('Express server is running!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
