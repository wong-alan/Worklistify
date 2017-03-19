let axios = require('axios');
let cheerio = require('cheerio');

let base_url = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=CPSC&course=110';

axios.get(base_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let sections = [];
  $('tr'/*, "'.section1'"*/).each( (i, elm) => {
    sections.push( {
      section: $(elm).children().eq(1).text().trim(),
      activity: $(elm).children().eq(2).text().trim(),
      term: $(elm).children().eq(3).text().trim(),
      days: $(elm).children().eq(5).text().trim(),
      start_time: $(elm).children().eq(6).text().trim(),
      end_time: $(elm).children().eq(7).text().trim(),
      status: $(elm).children().eq(0).text().trim()
    });
  });
  // Remove first element in sections
  sections.shift();
  return(sections);
})
.then ( (sections) => {
  console.log(sections);
});