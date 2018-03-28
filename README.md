# calculation microservice

install with "$ npm install"
run with `$ npm start`

endpoints are:

`/allowances` (GET)

`/cigaretterrps` (GET)

`/products` (GET)

`/countries` (GET)

`/currencies` (GET)

`/calculate` (POST)

none of the endpoints take any query parameters for the GET verb

Apart from `/cigaretterrps` and `/calculate`, all endpoints return static data from the configuration file /src/config/conf.js

`/cigaretterrps` scrapes a price comparison website to return current prices for cigarette products, broken down by brand

`/calculate` takes a JSON object as an argument such as (example with excise goods exclusively:

`{"arrivingfrom": "USA",
"items":[
{"commoditycode":"22041000","volume":10.00,"value":100.00,"valuecurrency":"TRY", "abv":0.15,"origin":"TR"},
{"commoditycode":"22030000","volume":10.00,"value":20.00,"abv":0.08},
{"commoditycode":"24022000","quantity":200,"rrp":0.48,"value":96.00 },
{"commoditycode":"24021000","commoditycodequalifier":"cigars","value":200,"valuecurrency":"USD","weight":100,"quantity":10,"origin":"CU"},
{"commoditycode":"24031000","commoditycodequalifier":"handrolling","weight":500, "value":31.45,"valuecurrency":"USD", "origin":"US"},
{"commoditycode":"24031000","commoditycodequalifier":"other","weight":500, "value":31.45,"valuecurrency":"USD", "origin":"US"}
]}`

The above declaration is for a passenger arriving from the USA:

10 litres of Sparkling wine originating from Turkey, for which the equivalent of 100 Turkish Lira was paid

10 litres of high strength beer, for which £20 was paid

200 cigarettes, with a recommended retail price of £0.48 per cigarette, and for which £96 was paid

10 cigars, each weighing 10g, imported from Cuba, for which USD 200 was paid. (Duty on cigars is calculated by weight, but allowances are expressed in number of units)

500g of handrolling tobacco, imported from USA, for which USD 31.45 was paid

500g of 'other' smoking tobacco, imported from USA, for which USD 31.45 was paid

Another example ('other' goods only):

`{"arrivingfrom": "US","arrivingfromqualifier":"private",
"items":[
  {"commoditycode":"62000000","commoditycodequalifier":"children","value":500.00,"valuecurrency":"USD","quantity": 10},
  {"commoditycode":"62000000","value":500.00,"valuecurrency":"USD","quantity": 10},
  {"commoditycode":"84710000","value":200.00,"valuecurrency":"USD","quantity":1},
  {"commoditycode":"85000000","value":100.00,"valuecurrency":"USD","quantity":1},
  {"commoditycode":"71170000","value":20.00,"valuecurrency":"USD","quantity":3},
  {"commoditycode":"71130000","value":150.00,"valuecurrency":"USD","quantity":1},
  {"commoditycode":"91010000","value":400.00,"valuecurrency":"USD","quantity":1},
  {"commoditycode":"85171200","value":250.00,"valuecurrency":"USD","quantity":1}
]}`

The above example is for a passenger ariving from the USA, arriving via private boat or aircraft:

$500 worth of children's clothes (made up of 10 individual items)

$500 worth of clothing (not children's), made up of 10 individual items

A Tablet computer, costing $200

An electrical or electronic item worth $100

Three Imitation jewellery items worth $20

A Jewellery item worth $150

A watch costing $400

A mobile phone costing $250



'arrivingfrom' is the country code of the country from which the passenger is arriving

'arrivingfromqualifier' can denote either the mens by which the passenger is arriving (e.g. 'private', for passengers arriving by private boat or plane - which has different allowances), or details some special case of departure point (e.g Canary Islands)

'items' is the list of items that the passenger is importing

'commoditycode' is the code for a given product (as returned in the /products call)

'commoditycodequalifier' is used where the commodity code does not differentiate the product enough. For example commoditycode 24031000 covers handrolling and other types of smoking tobacco. Uk excise rates are different for these different types of tobacco. UK passenger import allowances cover cigars and cigarillos separately, but these also have the same commodity code: 24021000

'volume' is in litres

'quantity' is the number of a product to be declared

'rrp' is the recommended retail price of a product (e.g. for cigarettes)

'value' is the total amount paid for the product (in the currency indicated by 'valuecurrency')

'valuecurency' is the three character currency code of the currency in which the payment was made (this is optional - and will be asumed to be GBP if not included)

 'abv' is the alcoholic strength of the product

 'weight' is the weight of product to be declared - used for cigars and loose tobacco products, for example

 'origin' is the country code of the origin of the product (one of the country codes as returned by the /countries endpoint)


The application is a Node/Express server, running on port 3030 by default, configurable through the config file, or by passing in command line parameters, eg:

`$npm start -- --measurespath=./blendedmeasures-02-18.js`

## Assumptions

###Data/Coding

####Allowances
Allowances for ROW are based on those quoted at https://www.gov.uk/duty-free-goods/arrivals-from-outside-the-eu with the addition of an allowance of 16l of cider. This allowance is treated the same as other alcohol allowances with regard to splitting. E.g. the passenger can import 8l of beer and 8l of cider and still be within the ROW allowance

EU MILs are based on those quoted at https://www.gov.uk/duty-free-goods/arrivals-from-eu-countries

#### Products
Products are identified by use of the 8 digit Comined Nomenclature (CN) Subheading Code: https://ec.europa.eu/taxation_customs/business/calculation-customs-duties/what-is-common-customs-tariff/combined-nomenclature_en

A defined subset of products and their CN codes is used in the system, as returned by the `/products` endpoint. 

In some cases, a 'commoditycodequalifier' is used along with a CN code to identify a product, where the CN framework does not allow products to be identified to a level of granularity required by the duty system; e.g. the commoditycodequalifier 'children' is used alongside the CN code 62000000 to identify children's clothes (which is subject to a 0% VAT rate)


#### Countries
The set of country codes used by the system (as returned by the `/countries` endpoint) is that defined in the document "Commission Regulation (EU) No 1106/2012", found at: http://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32012R1106

#### Currencies
ISO4217 currency codes are used, sourced from: https://github.com/xsolla/currency-format

#### Currency Conversions
The simulator currently wraps a currency conversion API at https://api.fixer.io to perform currency conversions
This is currently limited to the following currencies:
AUD,"BGN,BRL,CAD,CHF,CNY,CZK,DKK,EUR,HKD,HRK,HUF,IDR,ILS,INR,ISK,JPY,KRW,MXN,MYR,NOK,NZD,PHP,PLN,RON,RUB,SEK,SGD,THB,TRY,USD,ZAR


###Allocation of Allowances
When allocating allowances, items where the quantity is greater than 1 are assumed to be items of the same value for the purposes of allocating allowances. For example, an item of value $1000 consisting of 10 items is assumed to be 10 items each costing $100 dollars, for the purpose of allocating allowances. It could be that 3 of these items could be allocated as allowances, with the passenger having to pay duties on the remaining 7 items.

Items expressed in grammes are currently assumed to be infinitely divisible. If, for example, a passenger brings in 500g of hand rolling tobacco in a single pack, they could end up having any proportion of this weight  allocated as allowance, eg 1/3, 1/4, 1/2 etc. NB This will need to be changed, as it violates the principle that individual products cannot be subdivided. If this item was declared instead as 20 packs of 50g, then the situation would be analogous to the clothing example above.

A heuristic 'Hill-Cimbing' approach is currently taken to allocating allowances: allowances are filled iteratively; at each step the item is added to the allowances that saves the passenger the most money in terms of duty that would not need to be paid. No analysis has yet been performed to demonstrate that this is globally optimal. 

###General
No rounding of amounts/values is currently performed in the Simulator



