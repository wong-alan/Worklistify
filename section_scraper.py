import scrapy

class SectionSpider(scrapy.Spider):
    name = "sections"
    start_urls = [
        'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=CPSC&course=110',
    ]

    def parse(self, response):
        for section in response.xpath('//tr'):
            yield {
                'name': section.xpath('./td[2]/a/text()').extract_first(),
                'activity': section.xpath('./td[3]/text()').extract_first(),
                'days': section.xpath('./td[6]/text()').extract_first(),
                'start_time': section.xpath('./td[7]/text()').extract_first(),
                'end_time': section.xpath('./td[8]/text()').extract_first(),
            }
        
        # next_page = response.css('li.next a::attr("href")').extract_first()
        # if next_page is not None:
        #     next_page = response.urljoin(next_page)
        #     yield scrapy.Request(next_page, callback=self.parse)