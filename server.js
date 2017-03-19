const express = require('express');
const fs = require('fs');

const app = express();

const timetable = require('./models/timetable.js');
const data = require('./data/data.json'); 

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test');

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

  var cs = [c1, c2, c3, c4, c5, c6, c7];

  var response = {};
  var not_found = [];

  var course_sections = [];
  for (var i = 0; i < cs.length; i++) {
    if (cs[i]) {
      if (cs[i] in data) {
        course_sections.push(data[cs[i]]);
      } else {
        not_found.push(cs[i]);
      }
    }
  }
  var schedules = timetable.create_timetable(course_sections);

  response['not_found'] = not_found;
  response['timetable'] = schedules[0].sections;

  res.json(response);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('connected!');
});

var courseSchema = mongoose.Schema({
    dept: String,
    code: Number,
    sessyr: Number,
    sesscd: String
});

var course = mongoose.model('Course', courseSchema);
var CPSC2212014W = new course({ dept: 'CPSC', code: '221', sessyr: '2014', sesscd: 'W' });
console.log(course.code); // '221'

// courseSchema.methods.csOrNot = function () {
//   var dept = this.dept;
//   if (dept.valueOf() == new String("CPSC").valueOf()) {
//     console.log("this is a CS course");
//   }
//   else {
//     console.log("not a CS course");
//   }
// }

// var CPSC213 = new course({ dept: 'CPSC', code: '213' });
// CPSC213.csOrNot(); // "this is a comp sci course"

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
