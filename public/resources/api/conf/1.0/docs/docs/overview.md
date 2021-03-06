## Overview


This API provides resources related to [Passengers Calculation Service]

Passengers Calculation Service API lets users submit a set of items, each of which represents goods which are to be imported into the UK. The Calculation Service returns a list of 'Allowances' (goods which are within the user's personal allowances, and are therefore not subject to any import, excise, or VAT duties), and 'Declarations' (goods which are subject to import, excise or VAT duties). The API calculates and returns details of the duties due on each item.

The API **/calculate** endpoint returns details of the calculation for a submitted set of items

Other endpoints are provided to support this functionality:

**/products** returns data about the products that can be use in a submission to the calculate endpoint

**/countries** returns data about the country codes that can be used in a submission to the calculate endpoint

**/currencies** returns data about the currencies that can be used in a submission to the calculate endpoint

**/allowances** returns data about the allowances that apply to users who are arriving from within the EU, or from the Rest of the World

**/cigaretterrps** returns data about the current Recommended Retail Prices of various cigarette products - currently used in calculating the excise duties applicable to imported cigarettes. This endpoint  uses a wrapper around a web-scraping application that abstracts data from a supermarket price comparison website.

### Codes

#### Commodity Codes
Goods are identified by using the 8 character Combined Nomenclature (CN) commodity code, as used in the TARIC-3 tariff system. Certain products require a *qualifier* in order to fit in with the allowances scheme - e.g. 'cigars' or 'cigarillos', which have the same CN code, but which are subject to separate allowances

####Country Codes
ISO Alpha 2 country codes are used to identify countries

####Currency Codes
ISO 4217 Currency codes are used to identify currencies


