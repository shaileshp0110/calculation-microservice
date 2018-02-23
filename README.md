# calculation microservice

install with "$ npm install"
run with "$ npm start"

endpoints are:

/allowances (GET)

/cigaretterrps (GET)

/products (GET)

/countries (GET)

/currencies (GET)

/calculate (POST)

none of the endpoints take any query parameters for the GET verb

Apart from /cigaretterrps and /calculate, all endpoints return static data from the configuration file /src/config/conf.js

/cigaretterrps scrapes a price comparison website to return current prices for cigarette products, broken down by brand

/calculate takes a JSON object as an argument such as:

{"calculationrequests":
[{"commoditycode":"22041000","volume":10.00,"customsvalue":100.00,"abv":0.15,"origin":"TR"},
{"commoditycode":"22030000","volume":10.00,"customsvalue":20.00,"abv":0.08},
{"commoditycode":"24022000","quantity":1000,"rrp":0.48,"customsvalue":480.00 },
{"commoditycode":"24021000","customsvalue":1320,"weight":550,"origin":"CU"},
{"commoditycode":"24031000","commoditycodequalifier":"handrolling","weight":500, "customsvalue":31.45, "origin":"USA"},
{"commoditycode":"24031000","commoditycodequalifier":"other","weight":500, "customsvalue":31.45, "origin":"USA"}]}

The above declaration is for:

10 litres of Sparkling wine originating from Turkey, for which the equivalent of £100 was paid
10 litres of high strength beer, for which £20 was paid
1000 cigarettes, with a recommended retail price of £0.48 per cigarette, and for which £480 was paid
550g of cigars, imported from Cuiba, for which £1320 was paid
500g of handrolling tobacco, imported from USA, for which £31.45 was paid
500g of 'other' smoking tobacco, imported from USA, for which £31.45 was paid




'commoditycode' is the code for a given product (as returned in the /products call)

'commoditycodequalifier' is used where the commodity code does not differentiate the product enough. For example commoditycode 24031000 covers handrolling and other types of smoking tobacco. Uk excise rates are different for these different types of tobacco

'volume' is in litres

'quantity' is the number of a product to be declared

'rrp' is the recommended retail price of a product (e.g. for cigarettes)

'customsvalue' is the total amount paid for the product (assumed already converted to GBP)

 'abv' is the alcoholic strength of the product

 'weight' is the weight of product to be declared - used for cigars and loose tobacco products, for example

 'origin' is the country code of the origin of the product (one of the coutry codes as returned by the /countries endpoint)


The application is a Node/Express server, running on port 3030 by default (configurable through the config file)
