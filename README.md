# Implementation of Client Credentials Grant

The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed. The advantage here in comparison with requests to the Web API made without an access token, is that a higher rate limit is applied.

This is a [Express](https://expressjs.com/) project.

## Getting Started

First, run the development server:

```bash
npm install
# and
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.