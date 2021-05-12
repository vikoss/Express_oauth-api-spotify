const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { config } = require('./config');
const { encodedBasic } = require('./utils/encoded');
const request = require('request');
const { getUserPlaylists } = require('./services/spotify');
const verifyJwt = require('./services/verifyJwt');

const app = express();

// Use body parser middleware
app.use(bodyParser.json());

app.post('/api/auth/token', (req, res) => {
  const { email, username, name } = req.body;
  const token = jwt.sign({ sub: username, email, name }, config.authJWTSecret);
  res.json({ access_token: token });
});

app.get('/api/auth/verify', (req, res, next) => {
  const { access_token } = req.query;
  try {
    const decoded = jwt.verify(access_token, config.authJWTSecret);
    res.json({ message: 'The access token is valid', username: decoded.sub });
  } catch (error) {
    next(error);
  }
});

app.get('/api/playlists', verifyJwt, (req, res, next) => {
  const { userId } = req.query;
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${encodedBasic({
        username: config.spotifyClientId,
        password: config.spotifyClientSecret,
      })}`
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  request.post(options, async (error, response, body) => {
    if (error || response.statusCode !== 200) {
      next(error);
    }
    const accessToken = body.access_token;
    const playlists = await getUserPlaylists({
      accessToken,
      userId
    });
    res.json({ playlists });
  });

});

const server = app.listen(5000, () => {
  console.log(`Listen http://localhost:${server.address().port}`);
})