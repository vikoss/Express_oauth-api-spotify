const request = require('request');

const verifyJwt = (req, res, next) => {
  const { access_token } = req.query;
  const options = {
    url: `${req.protocol}://${req.headers.host}/api/auth/verify?access_token=${access_token}`,
  };
  request.get(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.sendStatus(403);
    }
    next();
  });
};

module.exports = verifyJwt;