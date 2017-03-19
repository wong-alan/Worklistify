from scrapy.item import Item, Field

class Section(Item):

    name = Field()
    activity = Field()
    days = Field()
    start_time = Field()
    end_time = Field()