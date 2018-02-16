# calculation microservice

install with "$ npm install"
run with "$ npm start"

endpoints are:

/allowances
/cigaretterrps
/products
/countries
/currencies

none of the endpoints (all only implemented for GET requests, currently) take any query parameters

Apart from /cigaretterrps, all endpoints return static data from the configuration file /src/config/conf.js

/cigaretterrps scrapes a price comparison website to return current prices for cigarette products, broken down by brand

The application is a Node/Express server, running on port 3000 by default (configurable through the config file)
