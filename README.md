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

{"calculationrequests":[{"commoditycode":"22041000","volume":10,"customsvalue":100,"abv":0.15,"origin":"TR"},{"commoditycode":"22030000","volume":10,"customsvalue":20,"abv":0.08}]}

'commoditycode' is the code for a given product (as returned in the /products call)

'volume' is in litres

'customsvalue' is the total amount paid for the product (assumed already converted to GBP)

 'abv' is the alcoholic strength of the product

 'origin' is the country code of the origin of the product (one of the coutry codes as returned by the /countries endpoint)


The application is a Node/Express server, running on port 3000 by default (configurable through the config file)
