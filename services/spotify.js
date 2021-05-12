const request = require('request');

const getUserPlaylists = ({ accessToken, userId }) => new Promise((resolve, reject) => {
  if (!accessToken || !userId) {
    reject(null);
  }
  const options = {
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true,
  };
  request.get(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      reject(error);
    }
    resolve(body);
  });
});

module.exports = { getUserPlaylists };
