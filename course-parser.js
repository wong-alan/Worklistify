const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/*
let base_url = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept='+'CPSC'
+'&course='+'110'
+'&sessyr='+'2017'
+'&sesscd='+'S';
*/
courseList = [];

courses = [100, 103, 110, 121];

courses = [{
  dept: "CPSC",
  no: [100, 103, 110, 121]
}, {
  dept: "MATH",
  no: [100, 101]
}, {
  dept: "ENGL",
  no: [110, 112]
}];

for (i = 0; i < courses.length; i++) {
  for (j = 0; j < courses[i].no.length; j++) {
    let base_url = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=' + courses[i].dept + '&course=' + courses[i].no[j].toString();
    axios.get(base_url).then((response) => {
      let $ = cheerio.load(response.data);
      let courses = {};
      let sections = [];
      $('tr'/*, "'.section1'"*/).each((i, elm) => {
        if ($(elm).children().eq(1).text().trim() != "") {
          sections.push({
            name: $(elm).children().eq(1).text().trim(),
            activity: $(elm).children().eq(2).text().trim(),
            term: $(elm).children().eq(3).text().trim(),
            days: $(elm).children().eq(5).text().trim(),
            start_time: $(elm).children().eq(6).text().trim(),
            end_time: $(elm).children().eq(7).text().trim(),
            status: $(elm).children().eq(0).text().trim()
          });
        }
      });
      // Remove first element in sections
      sections.shift();
      courseName = ((sections[0].name).split(" ").slice(0, 2).join(" ")).replace(/\s+/g, '');
      courses[courseName] = sections;
      return (courses);
    })
      .then((courses) => {
        printCourses(courses);
      });
  }
}

function printCourses(courses) {
  courseList.push(courses);
  fs.writeFile('./data/data.json', JSON.stringify(courseList), 'utf8');
}