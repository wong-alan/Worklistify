const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/courses', (req, res) => {
  var c1 = req.query.c1;
  var c2 = req.query.c2;
  var c3 = req.query.c3;
  var c4 = req.query.c4;
  var c5 = req.query.c5;
  var c6 = req.query.c6;
  var c7 = req.query.c7;

  res.json([c1, c2, c3, c4, c5, c6, c7]);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
