import scrapy
from sections import Section

class SectionSpider(scrapy.Spider):
    name = "sections"
    start_urls = [
        'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=CPSC&course=110',
    ]

    def parse(self, response):
        
        for row in response.xpath('//tr'):
            section = Section()
            section['name'] = row.xpath('./td[2]/a/text()').extract_first()
            section['activity'] = row.xpath('./td[3]/text()').extract_first()
            section['days'] = row.xpath('./td[6]/text()').extract_first()
            section['start_time'] = row.xpath('./td[7]/text()').extract_first()
            section['end_time'] = row.xpath('./td[8]/text()').extract_first()
            yield section
        
        # next_page = response.css('li.next a::attr("href")').extract_first()
        # if next_page is not None:
        #     next_page = response.urljoin(next_page)
        #     yield scrapy.Request(next_page, callback=self.parse)