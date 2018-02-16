'use strict'

const nconf = require('nconf')
nconf.env().argv()

// if 'conf' environment variable or command line argument is provided, load
// the configuration JSON file provided as the value
let path = nconf.get('conf')
if (path) {
  // logger.info("use file: " + path);
  nconf.file({file: path})
}

nconf.defaults(
  {
    'logging': {
      'fileandline': true,
      'logger': {
        'console': {
          'level': 'info',
          'colorize': true,
          'label': 'calculation',
          'timestamp': true
        }
      }

    },
    'server': {
      'port': 3000
    },
    'rrpserviceurl':'http://www.mysupermarket.co.uk/Shopping/FindProducts.aspx?query=cigarettes&store=Tesco&_fcategory=cigarettes&_fbrand=',
    'brands':["Benson_And_Hedges","Berkeley","Camel","Carlton","Chesterfield","Dunhill","Embassy","John_Player_Special","Lambert_And_Butler","Marlboro","Mayfair","Pall_Mall","Regal_Tobacconist","Richmond_Tobacconist","Rothmans","Royals","Silk_Cut","Sterling","Superkings","Vogue"],
    'allowances': {
      "ROW": {
        "alcohol": {
          "beer": {
            "description":"beer",
            "unit":"litres", 
            "limit": 16

          },
          "wine": {
            "description":"wine (not sparkling)",
            "unit":"litres",
            "limit":"4"
          },
          "spirits": {
            "description":"spirits and other liquors over 22% alcohol",
            "unit":"litres",
            "limit": 1

          },
          "fortified wine": {
            "description":"fortified wine (eg port, sherry)",
            "unit":"litres",
            "limit": 2
          },
          "sparkling wine": {
            "description": "sparkling wine (eg champagne, cava, prosecco)",
            "unit":"litres",
            "limit":2

          },
          "other (<22%)": {
            "description":"other alcoholic drinks up to 22% alcohol",
            "unit":"litres",
            "limit": 2
          }
        },
        "tobacco":{

          "cigarettes": {
            "description":"cigarettes",
            "unit":"units",
            "limit":200

          },
          "cigarillos": {
            "description":"cigarillos",
            "unit":"units",
            "limit":100

          },
          "cigars": {
            "description":"cigars",
            "unit":"units",
            "limit":  50

          },
          "tobacco": {
            "description": "loose tobacco",
            "unit": "grammes",
            "limit":250

          }
        },
        "other": {
          "private":{
            "description":"other, non-excisable goods, when arriving by private boat or plane",
            "unit":"ad valorum",
            "limit": 270
            },
          "other":{
            "description":"other, non-excisable goods",
            "unit": "ad valorum",
            "limit": 390
          }
          

        }

      },
      "EU": {
        "tobacco":{

          "cigarettes": {
            "description":"cigarettes",
            "unit":"units",
            "limit":800

          },
          "cigarillos": {
            "description":"cigarillos",
            "unit":"units",
            "limit":400

          },
          "cigars": {
            "description":"cigars",
            "unit":"units",
            "limit":  200

          },
          "tobacco": {
            "description": "loose tobacco",
            "unit": "grammes",
            "limit":1000

          }
        },
        "alcohol": {
          "beer": {
            "description":"beer",
            "unit":"litres", 
            "limit": 110

          },
          "wine": {
            "description":"wine (not sparkling)",
            "unit":"litres",
            "limit":"90"
          },
          "spirits": {
            "description":"spirits and other liquors over 22% alcohol",
            "unit":"litres",
            "limit": 10

          },
          "fortified wine": {
            "description":"fortified wine (eg port, sherry)",
            "unit":"litres",
            "limit": 20
          }
        }

      }
    },
    "products":[
      {"commodityCode":"22030000","name":"Beer","description":"Beer made from malt"},
      {"commodityCode":"22040000","name":"Wine","description":"Wine of fresh grapes"},
      {"commodityCode":"22041000","name":"Sparkling Wine","description":"Sparkling wine"},
      {"commodityCode":"22042000","name":"Wine","description":"Non-sparkling wine"},
      {"commodityCode":"22060000","name":"Cider","description":"Other fermented beverages, eg cider, perry, mead, sake"},
      {"commodityCode":"22050000","name":"Vermouth","description":"Vermouth and other wine of fresh grapes flavoured with plants or aromatic substances"},
      {"commodityCode":"22080000","name":"Spirits","description":"Spirits obtained by distilling grape wine or grape marc"},
      {"commodityCode":"24021000","name":"Cigars","description":"Cigars, cheroots and cigarillos containing tobacco"},
      {"commodityCode":"24022000","name":"Cigarettes","description":"Cigarettes containing tobacco"},
      {"commodityCode":"24030000","name":"Tobacco","description":"Tobacco"}


    ],
    "countries":[
    {"countrycode":"AD","countrytext":"Andorra","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"AE","countrytext":"United Arab Emirates","countrydescription":"Abu Dhabi, Ajman, Dubai, Fujairah, Ras al Khaimah, Sharjah and Umm al Qaiwain","currencycode":"AED"},
    {"countrycode":"AF","countrytext":"Afghanistan","countrydescription":"","currencycode":"AFN"},
    {"countrycode":"AG","countrytext":"Antigua and Barbuda","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"AI","countrytext":"Anguilla","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"AL","countrytext":"Albania","countrydescription":"","currencycode":"ALL"},
    {"countrycode":"AM","countrytext":"Armenia","countrydescription":"","currencycode":"AMD"},
    {"countrycode":"AO","countrytext":"Angola","countrydescription":"Including Cabinda","currencycode":"AOA"},
    {"countrycode":"AQ","countrytext":"Antarctica","countrydescription":"Territory south of 60° south latitude; not including the French Southern Territories (TF), Bouvet Island (BV), South Georgia and South Sandwich Islands (GS)","currencycode":"XXX"},
    {"countrycode":"AR","countrytext":"Argentina","countrydescription":"","currencycode":"ARS"},
    {"countrycode":"AS","countrytext":"American Samoa","countrydescription":"","currencycode":"USD"},
    {"countrycode":"AT","countrytext":"Austria","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"AU","countrytext":"Australia","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"AW","countrytext":"Aruba","countrydescription":"","currencycode":"AWG"},
    {"countrycode":"AZ","countrytext":"Azerbaijan","countrydescription":"","currencycode":"AZN"},
    {"countrycode":"BA","countrytext":"Bosnia and Herzegovina","countrydescription":"","currencycode":"BAM"},
    {"countrycode":"BB","countrytext":"Barbados","countrydescription":"","currencycode":"BBD"},
    {"countrycode":"BD","countrytext":"Bangladesh","countrydescription":"","currencycode":"BDT"},
    {"countrycode":"BE","countrytext":"Belgium","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"BF","countrytext":"Burkina Faso","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"BG","countrytext":"Bulgaria","countrydescription":"","currencycode":"BGN"},
    {"countrycode":"BH","countrytext":"Bahrain","countrydescription":"","currencycode":"BHD"},
    {"countrycode":"BI","countrytext":"Burundi","countrydescription":"","currencycode":"BIF"},
    {"countrycode":"BJ","countrytext":"Benin","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"BL","countrytext":"Saint Barthélemy","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"BM","countrytext":"Bermuda","countrydescription":"","currencycode":"BMD"},
    {"countrycode":"BN","countrytext":"Brunei Darussalam","countrydescription":"Often referred to as Brunei","currencycode":"BND"},
    {"countrycode":"BO","countrytext":"Bolivia, Plurinational State of","countrydescription":"Often referred to as Bolivia","currencycode":"BOB"},
    {"countrycode":"BQ","countrytext":"Bonaire, Sint Eustatius and Saba","countrydescription":"","currencycode":"USD"},
    {"countrycode":"BR","countrytext":"Brazil","countrydescription":"","currencycode":"BRL"},
    {"countrycode":"BS","countrytext":"Bahamas","countrydescription":"","currencycode":"BSD"},
    {"countrycode":"BT","countrytext":"Bhutan","countrydescription":"","currencycode":"BTN"},
    {"countrycode":"BV","countrytext":"Bouvet Island","countrydescription":"","currencycode":"NOK"},
    {"countrycode":"BW","countrytext":"Botswana","countrydescription":"","currencycode":"BWP"},
    {"countrycode":"BY","countrytext":"Belarus","countrydescription":"Often referred to as Belorussia","currencycode":"BYN"},
    {"countrycode":"BZ","countrytext":"Belize","countrydescription":"","currencycode":"BZD"},
    {"countrycode":"CA","countrytext":"Canada","countrydescription":"","currencycode":"CAD"},
    {"countrycode":"CC","countrytext":"Cocos Islands (or Keeling Islands)","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"CD","countrytext":"Congo, Democratic Republic of","countrydescription":"Formerly Zaire","currencycode":"CDF"},
    {"countrycode":"CF","countrytext":"Central African Republic","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"CG","countrytext":"Congo","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"CH","countrytext":"Switzerland","countrydescription":"Including the German territory of Büsingen and the Italian municipality of Campione d’Italia","currencycode":"CAF"},
    {"countrycode":"CI","countrytext":"Côte d’Ivoire","countrydescription":"Often referred to as Ivory Coast","currencycode":"XOF"},
    {"countrycode":"CK","countrytext":"Cook Islands","countrydescription":"","currencycode":"none"},
    {"countrycode":"CL","countrytext":"Chile","countrydescription":"","currencycode":"CLP"},
    {"countrycode":"CM","countrytext":"Cameroon","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"CN","countrytext":"China","countrydescription":"","currencycode":"CNY"},
    {"countrycode":"CO","countrytext":"Colombia","countrydescription":"","currencycode":"COP"},
    {"countrycode":"CR","countrytext":"Costa Rica","countrydescription":"","currencycode":"CRC"},
    {"countrycode":"CU","countrytext":"Cuba","countrydescription":"","currencycode":"CUP"},
    {"countrycode":"CV","countrytext":"Cape Verde","countrydescription":"","currencycode":"CVE"},
    {"countrycode":"CW","countrytext":"Curaçao","countrydescription":"","currencycode":"ANG"},
    {"countrycode":"CX","countrytext":"Christmas Island","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"CY","countrytext":"Cyprus","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"CZ","countrytext":"Czech Republic","countrydescription":"","currencycode":"CZK"},
    {"countrycode":"DE","countrytext":"Germany","countrydescription":"Including the island of Heligoland; excluding the territory of Büsingen","currencycode":"EUR"},
    {"countrycode":"DJ","countrytext":"Djibouti","countrydescription":"","currencycode":"DJF"},
    {"countrycode":"DK","countrytext":"Denmark","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"DM","countrytext":"Dominica","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"DO","countrytext":"Dominican Republic","countrydescription":"","currencycode":"DOP"},
    {"countrycode":"DZ","countrytext":"Algeria","countrydescription":"","currencycode":"DZD"},
    {"countrycode":"EC","countrytext":"Ecuador","countrydescription":"Including the Galápagos Islands","currencycode":"USD"},
    {"countrycode":"EE","countrytext":"Estonia","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"EG","countrytext":"Egypt","countrydescription":"","currencycode":"EGP"},
    {"countrycode":"EH","countrytext":"Western Sahara","countrydescription":"","currencycode":"MAD"},
    {"countrycode":"ER","countrytext":"Eritrea","countrydescription":"","currencycode":"ERN"},
    {"countrycode":"ES","countrytext":"Spain","countrydescription":"Including the Balearic Islands and the Canary Islands; excluding Ceuta (XC) and Melilla (XL)","currencycode":"EUR"},
    {"countrycode":"ET","countrytext":"Ethiopia","countrydescription":"","currencycode":"ETB"},
    {"countrycode":"FI","countrytext":"Finland","countrydescription":"Including the Åland Islands","currencycode":"EUR"},
    {"countrycode":"FJ","countrytext":"Fiji","countrydescription":"","currencycode":"FJD"},
    {"countrycode":"FK","countrytext":"Falkland Islands","countrydescription":"","currencycode":"FKP"},
    {"countrycode":"FM","countrytext":"Micronesia, Federated States of","countrydescription":"Chuuk, Kosrae, Pohnpei and Yap","currencycode":"USD"},
    {"countrycode":"FO","countrytext":"Faroe Islands","countrydescription":"","currencycode":"none"},
    {"countrycode":"FR","countrytext":"France","countrydescription":"Including Monaco, the French overseas departments (French Guiana, Guadeloupe, Martinique and Réunion) and the French northern part of St Martin","currencycode":"EUR"},
    {"countrycode":"GA","countrytext":"Gabon","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"GB","countrytext":"United Kingdom","countrydescription":"Great Britain, Northern Ireland, Channel Islands and Isle of Man","currencycode":"GBP"},
    {"countrycode":"GD","countrytext":"Grenada","countrydescription":"Including Southern Grenadines","currencycode":"XCD"},
    {"countrycode":"GE","countrytext":"Georgia","countrydescription":"","currencycode":"GEL"},
    {"countrycode":"GH","countrytext":"Ghana","countrydescription":"","currencycode":"GHS"},
    {"countrycode":"GI","countrytext":"Gibraltar","countrydescription":"","currencycode":"GIP"},
    {"countrycode":"GL","countrytext":"Greenland","countrydescription":"","currencycode":"DKK"},
    {"countrycode":"GM","countrytext":"Gambia","countrydescription":"","currencycode":"GMD"},
    {"countrycode":"GN","countrytext":"Guinea","countrydescription":"","currencycode":"GNF"},
    {"countrycode":"GQ","countrytext":"Equatorial Guinea","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"GR","countrytext":"Greece","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"GS","countrytext":"South Georgia and South Sandwich Islands","countrydescription":"","currencycode":"GBP"},
    {"countrycode":"GT","countrytext":"Guatemala","countrydescription":"","currencycode":"GTQ"},
    {"countrycode":"GU","countrytext":"Guam","countrydescription":"","currencycode":"USD"},
    {"countrycode":"GW","countrytext":"Guinea-Bissau","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"GY","countrytext":"Guyana","countrydescription":"","currencycode":"GYD"},
    {"countrycode":"HK","countrytext":"Hong Kong","countrydescription":"Hong Kong Special Administrative Region of the People’s Republic of China","currencycode":"HKD"},
    {"countrycode":"HM","countrytext":"Heard Island and McDonald Islands","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"HN","countrytext":"Honduras","countrydescription":"Including Swan Islands","currencycode":"HNL"},
    {"countrycode":"HR","countrytext":"Croatia","countrydescription":"","currencycode":"HRK"},
    {"countrycode":"HT","countrytext":"Haiti","countrydescription":"","currencycode":"HTG"},
    {"countrycode":"HU","countrytext":"Hungary","countrydescription":"","currencycode":"HUF"},
    {"countrycode":"ID","countrytext":"Indonesia","countrydescription":"","currencycode":"IDR"},
    {"countrycode":"IE","countrytext":"Ireland","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"IL","countrytext":"Israel","countrydescription":"","currencycode":"ILS"},
    {"countrycode":"IN","countrytext":"India","countrydescription":"","currencycode":"INR"},
    {"countrycode":"IO","countrytext":"British Indian Ocean Territory","countrydescription":"Chagos Archipelago","currencycode":"USD"},
    {"countrycode":"IQ","countrytext":"Iraq","countrydescription":"","currencycode":"IQD"},
    {"countrycode":"IR","countrytext":"Iran, Islamic Republic of","countrydescription":"","currencycode":"IRR"},
    {"countrycode":"IS","countrytext":"Iceland","countrydescription":"","currencycode":"ISK"},
    {"countrycode":"IT","countrytext":"Italy","countrydescription":"Including Livigno; excluding the municipality of Campione d’Italia","currencycode":"EUR"},
    {"countrycode":"JM","countrytext":"Jamaica","countrydescription":"","currencycode":"JMD"},
    {"countrycode":"JO","countrytext":"Jordan","countrydescription":"","currencycode":"JOD"},
    {"countrycode":"JP","countrytext":"Japan","countrydescription":"","currencycode":"JPY"},
    {"countrycode":"KE","countrytext":"Kenya","countrydescription":"","currencycode":"KES"},
    {"countrycode":"KG","countrytext":"Kyrgyz, Republic","countrydescription":"","currencycode":"KGS"},
    {"countrycode":"KH","countrytext":"Cambodia","countrydescription":"","currencycode":"KHR"},
    {"countrycode":"KI","countrytext":"Kiribati","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"KM","countrytext":"Comoros","countrydescription":"Anjouan, Grande Comore and Mohéli","currencycode":"KMF"},
    {"countrycode":"KN","countrytext":"St Kitts and Nevis","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"KP","countrytext":"Korea, Democratic People’s Republic of","countrydescription":"Often referred to as North Korea","currencycode":"KPW"},
    {"countrycode":"KR","countrytext":"Korea, Republic of","countrydescription":"Often referred to as South Korea","currencycode":"KRW"},
    {"countrycode":"KW","countrytext":"Kuwait","countrydescription":"","currencycode":"KWD"},
    {"countrycode":"KY","countrytext":"Cayman Islands","countrydescription":"","currencycode":"KYD"},
    {"countrycode":"KZ","countrytext":"Kazakhstan","countrydescription":"","currencycode":"KZT"},
    {"countrycode":"LA","countrytext":"Lao People’s Democratic Republic","countrydescription":"Often referred to as Laos","currencycode":"LAK"},
    {"countrycode":"LB","countrytext":"Lebanon","countrydescription":"","currencycode":"LBP"},
    {"countrycode":"LC","countrytext":"St Lucia","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"LI","countrytext":"Liechtenstein","countrydescription":"","currencycode":"CHF"},
    {"countrycode":"LK","countrytext":"Sri Lanka","countrydescription":"","currencycode":"LKR"},
    {"countrycode":"LR","countrytext":"Liberia","countrydescription":"","currencycode":"LRD"},
    {"countrycode":"LS","countrytext":"Lesotho","countrydescription":"","currencycode":"LSL"},
    {"countrycode":"LT","countrytext":"Lithuania","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"LU","countrytext":"Luxembourg","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"LV","countrytext":"Latvia","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"LY","countrytext":"Libya","countrydescription":"","currencycode":"LYD"},
    {"countrycode":"MA","countrytext":"Morocco","countrydescription":"","currencycode":"MAD"},
    {"countrycode":"MD","countrytext":"Moldova, Republic of","countrydescription":"","currencycode":"MDL"},
    {"countrycode":"ME","countrytext":"Montenegro","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"MG","countrytext":"Madagascar","countrydescription":"","currencycode":"MGA"},
    {"countrycode":"MH","countrytext":"Marshall Islands","countrydescription":"","currencycode":"USD"},
    {"countrycode":"MK","countrytext":"Former Yugoslav Republic of Macedonia","countrydescription":"","currencycode":"MKD"},
    {"countrycode":"ML","countrytext":"Mali","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"MM","countrytext":"Myanmar","countrydescription":"Often referred to as Burma","currencycode":"MMK"},
    {"countrycode":"MN","countrytext":"Mongolia","countrydescription":"","currencycode":"MNT"},
    {"countrycode":"MO","countrytext":"Macao","countrydescription":"Special Administrative Region of the People’s Republic of China","currencycode":"MOP"},
    {"countrycode":"MP","countrytext":"Northern Mariana Islands","countrydescription":"","currencycode":"USD"},
    {"countrycode":"MR","countrytext":"Mauritania","countrydescription":"","currencycode":"MRU"},
    {"countrycode":"MS","countrytext":"Montserrat","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"MT","countrytext":"Malta","countrydescription":"Including Gozo and Comino","currencycode":"EUR"},
    {"countrycode":"MU","countrytext":"Mauritius","countrydescription":"Mauritius, Rodrigues Island, Agalega Islands and Cargados Carajos Shoals (St Brandon Islands)","currencycode":"MUR"},
    {"countrycode":"MV","countrytext":"Maldives","countrydescription":"","currencycode":"MVR"},
    {"countrycode":"MW","countrytext":"Malawi","countrydescription":"","currencycode":"MWK"},
    {"countrycode":"MX","countrytext":"Mexico","countrydescription":"","currencycode":"MXN"},
    {"countrycode":"MY","countrytext":"Malaysia","countrydescription":"Peninsular Malaysia and Eastern Malaysia (Labuan, Sabah and Sarawak)","currencycode":"MYR"},
    {"countrycode":"MZ","countrytext":"Mozambique","countrydescription":"","currencycode":"MZN"},
    {"countrycode":"NA","countrytext":"Namibia","countrydescription":"","currencycode":"NAD"},
    {"countrycode":"NC","countrytext":"New Caledonia","countrydescription":"Including Loyalty Islands (Lifou, Maré and Ouvéa)","currencycode":"XPF"},
    {"countrycode":"NE","countrytext":"Niger","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"NF","countrytext":"Norfolk Island","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"NG","countrytext":"Nigeria","countrydescription":"","currencycode":"NGN"},
    {"countrycode":"NI","countrytext":"Nicaragua","countrydescription":"Including Corn Islands","currencycode":"NIO"},
    {"countrycode":"NL","countrytext":"Netherlands","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"NO","countrytext":"Norway","countrydescription":"Including Svalbard Archipelago and Jan Mayen Island","currencycode":"NOK"},
    {"countrycode":"NP","countrytext":"Nepal","countrydescription":"","currencycode":"NPR"},
    {"countrycode":"NR","countrytext":"Nauru","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"NU","countrytext":"Niue","countrydescription":"","currencycode":"NZD"},
    {"countrycode":"NZ","countrytext":"New Zealand","countrydescription":"Excluding Ross Dependency (Antarctica)","currencycode":"NZD"},
    {"countrycode":"OM","countrytext":"Oman","countrydescription":"","currencycode":"OMR"},
    {"countrycode":"PA","countrytext":"Panama","countrydescription":"Including former Canal Zone","currencycode":"USD"},
    {"countrycode":"PE","countrytext":"Peru","countrydescription":"","currencycode":"PEN"},
    {"countrycode":"PF","countrytext":"French Polynesia","countrydescription":"Marquesas Islands, Society Islands (including Tahiti), Tuamotu Islands, Gambier Islands and Austral Islands.","currencycode":"XPF"},
    {"countrycode":"PG","countrytext":"Papua New Guinea","countrydescription":"Eastern part of New Guinea; Bismarck Archipelago (including New Britain, New Ireland, Lavongai (New Hanover) and Admiralty Islands); Northern Solomon Islands (Bougainville and Buka); Trobriand Islands, Woodlark Island; d’Entrecasteaux Islands and Louisiade Archipelago.","currencycode":"PGK"},
    {"countrycode":"PH","countrytext":"Philippines","countrydescription":"","currencycode":"PHP"},
    {"countrycode":"PK","countrytext":"Pakistan","countrydescription":"","currencycode":"PKR"},
    {"countrycode":"PL","countrytext":"Poland","countrydescription":"","currencycode":"PLN"},
    {"countrycode":"PM","countrytext":"St Pierre and Miquelon","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"PN","countrytext":"Pitcairn","countrydescription":"Including the Ducie, Henderson and Oeno Islands","currencycode":"NZD"},
    {"countrycode":"PS","countrytext":"Occupied Palestinian Territory","countrydescription":"West Bank (including East Jerusalem) and Gaza Strip","currencycode":"ILS"},
    {"countrycode":"PT","countrytext":"Portugal","countrydescription":"Including Azores and Madeira","currencycode":"EUR"},
    {"countrycode":"PW","countrytext":"Palau","countrydescription":"","currencycode":"USD"},
    {"countrycode":"PY","countrytext":"Paraguay","countrydescription":"","currencycode":"PYG"},
    {"countrycode":"QA","countrytext":"Qatar","countrydescription":"","currencycode":"QAR"},
    {"countrycode":"RO","countrytext":"Romania","countrydescription":"","currencycode":"RON"},
    {"countrycode":"RU","countrytext":"Russian Federation","countrydescription":"Often referred to as Russia","currencycode":"RUB"},
    {"countrycode":"RW","countrytext":"Rwanda","countrydescription":"","currencycode":"RWF"},
    {"countrycode":"SA","countrytext":"Saudi Arabia","countrydescription":"","currencycode":"SAR"},
    {"countrycode":"SB","countrytext":"Solomon Islands","countrydescription":"","currencycode":"SBD"},
    {"countrycode":"SC","countrytext":"Seychelles","countrydescription":"Mahé Island, Praslin Island, La Digue, Frégate and Silhouette; Amirante Islands (including Desroches, Alphonse, Platte and Coëtivy); Farquhar Islands (including Providence); Aldabra Islands and Cosmoledo Islands.","currencycode":"SCR"},
    {"countrycode":"SD","countrytext":"Sudan","countrydescription":"","currencycode":"SDG"},
    {"countrycode":"SE","countrytext":"Sweden","countrydescription":"","currencycode":"SEK"},
    {"countrycode":"SG","countrytext":"Singapore","countrydescription":"","currencycode":"SGD"},
    {"countrycode":"SH","countrytext":"Saint Helena, Ascension and Tristan da Cunha","countrydescription":"","currencycode":"SHP"},
    {"countrycode":"SI","countrytext":"Slovenia","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"SK","countrytext":"Slovakia","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"SL","countrytext":"Sierra Leone","countrydescription":"","currencycode":"SLL"},
    {"countrycode":"SM","countrytext":"San Marino","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"SN","countrytext":"Senegal","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"SO","countrytext":"Somalia","countrydescription":"","currencycode":"SOS"},
    {"countrycode":"SR","countrytext":"Suriname","countrydescription":"","currencycode":"SRD"},
    {"countrycode":"SS","countrytext":"South Sudan","countrydescription":"","currencycode":"SSP"},
    {"countrycode":"ST","countrytext":"Sao Tome and Principe","countrydescription":"","currencycode":"STN"},
    {"countrycode":"SV","countrytext":"El Salvador","countrydescription":"","currencycode":"USD"},
    {"countrycode":"SX","countrytext":"Sint Maarten (Dutch part)","countrydescription":"The island of Saint Martin is divided into the French northern part and the Dutch southern part.","currencycode":"ANG"},
    {"countrycode":"SY","countrytext":"Syrian Arab Republic","countrydescription":"Often referred to as Syria","currencycode":"SYP"},
    {"countrycode":"SZ","countrytext":"Swaziland","countrydescription":"","currencycode":"SZL"},
    {"countrycode":"TC","countrytext":"Turks and Caicos Islands","countrydescription":"","currencycode":"USD"},
    {"countrycode":"TD","countrytext":"Chad","countrydescription":"","currencycode":"XAF"},
    {"countrycode":"TF","countrytext":"French Southern Territories","countrydescription":"Including Kerguélen Islands, Amsterdam Island, Saint-Paul Island, Crozet Archipelago and French scattered Indian Ocean Islands formed by Bassas da India, Europa Island, Glorioso Islands, Juan de Nova Island and Tromelin Island.","currencycode":"EUR"},
    {"countrycode":"TG","countrytext":"Togo","countrydescription":"","currencycode":"XOF"},
    {"countrycode":"TH","countrytext":"Thailand","countrydescription":"","currencycode":"THB"},
    {"countrycode":"TJ","countrytext":"Tajikistan","countrydescription":"","currencycode":"TJS"},
    {"countrycode":"TK","countrytext":"Tokelau","countrydescription":"","currencycode":"NZD"},
    {"countrycode":"TL","countrytext":"Timor-Leste","countrydescription":"","currencycode":"USD"},
    {"countrycode":"TM","countrytext":"Turkmenistan","countrydescription":"","currencycode":"TMT"},
    {"countrycode":"TN","countrytext":"Tunisia","countrydescription":"","currencycode":"TND"},
    {"countrycode":"TO","countrytext":"Tonga","countrydescription":"","currencycode":"TOP"},
    {"countrycode":"TR","countrytext":"Turkey","countrydescription":"","currencycode":"TRY"},
    {"countrycode":"TT","countrytext":"Trinidad and Tobago","countrydescription":"","currencycode":"TTD"},
    {"countrycode":"TV","countrytext":"Tuvalu","countrydescription":"","currencycode":"AUD"},
    {"countrycode":"TW","countrytext":"Taiwan","countrydescription":"Separate customs territory of Taiwan, Penghu, Kinmen and Matsu","currencycode":"TWD"},
    {"countrycode":"TZ","countrytext":"Tanzania, United Republic of","countrydescription":"Pemba, Zanzibar Island and Tanganyika","currencycode":"TZS"},
    {"countrycode":"UA","countrytext":"Ukraine","countrydescription":"","currencycode":"UAH"},
    {"countrycode":"UG","countrytext":"Uganda","countrydescription":"","currencycode":"UGX"},
    {"countrycode":"UM","countrytext":"United States Minor Outlying Islands","countrydescription":"Including Baker Island, Howland Island, Jarvis Island, Johnston Atoll, Kingman Reef, Midway Islands, Navassa Island, Palmyra Atoll and Wake Island","currencycode":"USD"},
    {"countrycode":"US","countrytext":"United States","countrydescription":"Including Puerto Rico","currencycode":"USD"},
    {"countrycode":"UY","countrytext":"Uruguay","countrydescription":"","currencycode":"UYU"},
    {"countrycode":"UZ","countrytext":"Uzbekistan","countrydescription":"","currencycode":"UZS"},
    {"countrycode":"VA","countrytext":"Holy See (Vatican City State)","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"VC","countrytext":"St Vincent and the Grenadines","countrydescription":"","currencycode":"XCD"},
    {"countrycode":"VE","countrytext":"Venezuela, Bolivarian Republic of","countrydescription":"Often referred to as Venezuela","currencycode":"VEF"},
    {"countrycode":"VG","countrytext":"Virgin Islands, British","countrydescription":"","currencycode":"USD"},
    {"countrycode":"VI","countrytext":"Virgin Islands, United States","countrydescription":"","currencycode":"USD"},
    {"countrycode":"VN","countrytext":"Viet Nam","countrydescription":"","currencycode":"VND"},
    {"countrycode":"VU","countrytext":"Vanuatu","countrydescription":"","currencycode":"VUV"},
    {"countrycode":"WF","countrytext":"Wallis and Futuna","countrydescription":"Including Alofi Island","currencycode":"XPF"},
    {"countrycode":"WS","countrytext":"Samoa","countrydescription":"Formerly known as Western Samoa","currencycode":"WST"},
    {"countrycode":"XC","countrytext":"Ceuta","countrydescription":"","currencycode":"EUR"},
    {"countrycode":"XK","countrytext":"Kosovo","countrydescription":"As defined by United Nations Security Council Resolution 1244 of 10 June 1999","currencycode":"EUR"},
    {"countrycode":"XL","countrytext":"Melilla","countrydescription":"Including Peñón de Vélez de la Gomera, Peñón de Alhucemas and Chafarinas Islands.","currencycode":"EUR"},
    {"countrycode":"XS","countrytext":"Serbia","countrydescription":"","currencycode":"RSD"},
    {"countrycode":"YE","countrytext":"Yemen","countrydescription":"Formerly North Yemen and South Yemen","currencycode":"YER"},
    {"countrycode":"YT","countrytext":"Mayotte","countrydescription":"Grande-Terre and Pamandzi","currencycode":"EUR"},
    {"countrycode":"ZA","countrytext":"South Africa","countrydescription":"","currencycode":"ZAR"},
    {"countrycode":"ZM","countrytext":"Zambia","countrydescription":"","currencycode":"ZMW"},
    {"countrycode":"ZW","countrytext":"Zimbabwe","countrydescription":"","currencycode":"USD"}
],
  "currencies":{
  "AED": {
    "name": "UAE Dirham",
    "fractionSize": 2,
    "symbol": {
      "grapheme": ".د.إ",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": null
  },
  "AFN": {
    "name": "Afghani",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "؋",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": "؋",
      "template": "1 $",
      "rtl": true
    }
  },
  "ALL": {
    "name": "Lek",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "L",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Lek",
      "template": "$1",
      "rtl": false
    }
  },
  "AMD": {
    "name": "Armenian Dram",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "դր.",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "դր.",
      "template": "1 $",
      "rtl": false
    }
  },
  "ANG": {
    "name": "Netherlands Antillean Guilder",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "ƒ",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "NAƒ",
      "template": "$1",
      "rtl": false
    }
  },
  "AOA": {
    "name": "Kwanza",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "ARS": {
    "name": "Argentine Peso",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "AUD": {
    "name": "Australian Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "A$",
      "template": "$1",
      "rtl": false
    }
  },
  "AWG": {
    "name": "Aruban Florin",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "ƒ",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Afl",
      "template": "$1",
      "rtl": false
    }
  },
  "AZN": {
    "name": "Azerbaijanian Manat",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₼",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₼",
      "template": "$1",
      "rtl": false
    }
  },
  "BAM": {
    "name": "Convertible Mark",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "KM",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "KM",
      "template": "$1",
      "rtl": false
    }
  },
  "BBD": {
    "name": "Barbados Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "BDT": {
    "name": "Taka",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "BGN": {
    "name": "Bulgarian Lev",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "лв",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "лв",
      "template": "$1",
      "rtl": false
    }
  },
  "BHD": {
    "name": "Bahraini Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.ب",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ب",
      "template": "1 $",
      "rtl": true
    }
  },
  "BIF": {
    "name": "Burundi Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "BMD": {
    "name": "Bermudian Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "BD$",
      "template": "$1",
      "rtl": false
    }
  },
  "BND": {
    "name": "Brunei Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "BOB": {
    "name": "Boliviano",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Bs.",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Bs.",
      "template": "$1",
      "rtl": false
    }
  },
  "BOV": {
    "name": "Mvdol",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "BRL": {
    "name": "Brazilian Real",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "R$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "R$",
      "template": "$1",
      "rtl": false
    }
  },
  "BSD": {
    "name": "Bahamian Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "BTN": {
    "name": "Ngultrum",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "BWP": {
    "name": "Pula",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "P",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "P",
      "template": "$1",
      "rtl": false
    }
  },
  "BYN": {
    "name": "Belarussian Ruble",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "p.",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "р.",
      "template": "1 $",
      "rtl": false
    }
  },
  "BYR": {
    "name": "Belarussian Ruble",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "p.",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "р.",
      "template": "1 $",
      "rtl": false
    }
  },
  "BZD": {
    "name": "Belize Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "BZ$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "BZ$",
      "template": "$1",
      "rtl": false
    }
  },
  "CAD": {
    "name": "Canadian Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "CA$",
      "template": "$1",
      "rtl": false
    }
  },
  "CDF": {
    "name": "Congolese Franc",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CHE": {
    "name": "WIR Euro",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CHF": {
    "name": "Swiss Franc",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CHW": {
    "name": "WIR Franc",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CLF": {
    "name": "Unidad de Fomento",
    "fractionSize": 4,
    "symbol": null,
    "uniqSymbol": null
  },
  "CLP": {
    "name": "Chilean Peso",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "CNY": {
    "name": "Yuan Renminbi",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "元",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "元",
      "template": "1 $",
      "rtl": false
    }
  },
  "COP": {
    "name": "Colombian Peso",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "COU": {
    "name": "Unidad de Valor Real",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CRC": {
    "name": "Cost Rican Colon",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₡",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₡",
      "template": "$1",
      "rtl": false
    }
  },
  "CUC": {
    "name": "Peso Convertible",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CUP": {
    "name": "Cuban Peso",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$MN",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "$MN",
      "template": "$1",
      "rtl": false
    }
  },
  "CVE": {
    "name": "Cabo Verde Escudo",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "CZK": {
    "name": "Czech Koruna",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Kč",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Kč",
      "template": "1 $",
      "rtl": false
    }
  },
  "DJF": {
    "name": "Djibouti Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "DKK": {
    "name": "Danish Krone",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kr",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "DOP": {
    "name": "Dominican Peso",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "RD$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "RD$",
      "template": "$1",
      "rtl": false
    }
  },
  "DZD": {
    "name": "Algerian Dinar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": ".د.ج",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ج",
      "template": "1 $",
      "rtl": true
    }
  },
  "EEK": {
    "name": "Estonian Kroon",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kr",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "EGP": {
    "name": "Egyptian Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": ".ج.م",
      "template": "1 $",
      "rtl": true
    }
  },
  "ERN": {
    "name": "Nakfa",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "ETB": {
    "name": "Ethiopian Birr",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "EUR": {
    "name": "Euro",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "€",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "€",
      "template": "$1",
      "rtl": false
    }
  },
  "FJD": {
    "name": "Fiji Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "FJ$",
      "template": "$1",
      "rtl": false
    }
  },
  "FKP": {
    "name": "Falkland Islands Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "GBP": {
    "name": "Pound Sterling",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    }
  },
  "GEL": {
    "name": "Lari",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "GGP": {
    "name": "Guernsey Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "GHC": {
    "name": "Ghanaian Cedi",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "¢",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "¢",
      "template": "$1",
      "rtl": false
    }
  },
  "GHS": {
    "name": "Ghan Cedi",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "GIP": {
    "name": "Gibraltar Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "GMD": {
    "name": "Dalasi",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "GNF": {
    "name": "Guine Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "GTQ": {
    "name": "Quetzal",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Q",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Q",
      "template": "$1",
      "rtl": false
    }
  },
  "GYD": {
    "name": "Guyan Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "GY$",
      "template": "$1",
      "rtl": false
    }
  },
  "HKD": {
    "name": "Hong Kong Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "HK$",
      "template": "$1",
      "rtl": false
    }
  },
  "HNL": {
    "name": "Lempira",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "L",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "L",
      "template": "$1",
      "rtl": false
    }
  },
  "HRK": {
    "name": "Croatian Kuna",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kn",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "kn",
      "template": "$1",
      "rtl": false
    }
  },
  "HTG": {
    "name": "Gourde",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "HUF": {
    "name": "Forint",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "Ft",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Ft",
      "template": "$1",
      "rtl": false
    }
  },
  "IDR": {
    "name": "Rupiah",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Rp",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Rp",
      "template": "$1",
      "rtl": false
    }
  },
  "ILS": {
    "name": "New Israeli Sheqel",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₪",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₪",
      "template": "$1",
      "rtl": false
    }
  },
  "IMP": {
    "name": "Manx Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "INR": {
    "name": "Indian Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₹",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₹",
      "template": "$1",
      "rtl": false
    }
  },
  "IQD": {
    "name": "Iraqi Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.ع",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ع",
      "template": "1 $",
      "rtl": true
    }
  },
  "IRR": {
    "name": "Iranian Rial",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "﷼",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".ر.ا",
      "template": "1 $",
      "rtl": true
    }
  },
  "ISK": {
    "name": "Iceland Krona",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kr",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "JEP": {
    "name": "Jersey Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "JMD": {
    "name": "Jamaican Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "J$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "J$",
      "template": "$1",
      "rtl": false
    }
  },
  "JOD": {
    "name": "Jordanian Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.إ",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": null
  },
  "JPY": {
    "name": "Yen",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "¥",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "¥",
      "template": "$1",
      "rtl": false
    }
  },
  "KES": {
    "name": "Kenyan Shilling",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "KSh",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "KSh",
      "template": "$1",
      "rtl": false
    }
  },
  "KGS": {
    "name": "Som",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "сом",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "сом",
      "template": "$1",
      "rtl": false
    }
  },
  "KHR": {
    "name": "Riel",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "៛",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "៛",
      "template": "$1",
      "rtl": false
    }
  },
  "KMF": {
    "name": "Comoro Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "KPW": {
    "name": "North Korean Won",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "₩",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "KRW": {
    "name": "Won",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "₩",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₩",
      "template": "$1",
      "rtl": false
    }
  },
  "KWD": {
    "name": "Kuwaiti Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.ك",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ك",
      "template": "1 $",
      "rtl": true
    }
  },
  "KYD": {
    "name": "Cayman Islands Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "CI$",
      "template": "$1",
      "rtl": false
    }
  },
  "KZT": {
    "name": "Tenge",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₸",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₸",
      "template": "$1",
      "rtl": false
    }
  },
  "LAK": {
    "name": "Kip",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₭",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₭",
      "template": "$1",
      "rtl": false
    }
  },
  "LBP": {
    "name": "Lebanese Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": ".ل.ل",
      "template": "1 $",
      "rtl": true
    }
  },
  "LKR": {
    "name": "Sri Lank Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₨",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "LRD": {
    "name": "Liberian Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "L$",
      "template": "$1",
      "rtl": false
    }
  },
  "LSL": {
    "name": "Loti",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "LTL": {
    "name": "Lithuanian Litas",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Lt",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Lt",
      "template": "$1",
      "rtl": false
    }
  },
  "LVL": {
    "name": "Latvian Lats",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Ls",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Ls",
      "template": "1 $",
      "rtl": false
    }
  },
  "LYD": {
    "name": "Libyan Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.ل",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ل",
      "template": "1 $",
      "rtl": true
    }
  },
  "MAD": {
    "name": "Moroccan Dirham",
    "fractionSize": 2,
    "symbol": {
      "grapheme": ".د.م",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.م",
      "template": "1 $",
      "rtl": true
    }
  },
  "MDL": {
    "name": "Moldovan Leu",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MGA": {
    "name": "Malagasy riary",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MKD": {
    "name": "Denar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "ден",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "ден",
      "template": "$1",
      "rtl": false
    }
  },
  "MMK": {
    "name": "Kyat",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MNT": {
    "name": "Tugrik",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₮",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₮",
      "template": "$1",
      "rtl": false
    }
  },
  "MOP": {
    "name": "Pataca",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MRO": {
    "name": "Ouguiya",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MUR": {
    "name": "Mauritius Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₨",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "MVR": {
    "name": "Rufiyaa",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MWK": {
    "name": "Kwacha",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MXN": {
    "name": "Mexican Peso",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "MXV": {
    "name": "Mexican Unidad de Inversion (UDI)",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "MYR": {
    "name": "Malaysian Ringgit",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "RM",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "RM",
      "template": "$1",
      "rtl": false
    }
  },
  "MZN": {
    "name": "Mozambique Metical",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "MT",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "MT",
      "template": "$1",
      "rtl": false
    }
  },
  "NAD": {
    "name": "Namibi Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "N$",
      "template": "$1",
      "rtl": false
    }
  },
  "NGN": {
    "name": "Naira",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₦",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₦",
      "template": "$1",
      "rtl": false
    }
  },
  "NIO": {
    "name": "Cordob Oro",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "C$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "C$",
      "template": "$1",
      "rtl": false
    }
  },
  "NOK": {
    "name": "Norwegian Krone",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kr",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "NPR": {
    "name": "Nepalese Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₨",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "NZD": {
    "name": "New Zealand Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "NZ$",
      "template": "$1",
      "rtl": false
    }
  },
  "OMR": {
    "name": "Rial Omani",
    "fractionSize": 3,
    "symbol": {
      "grapheme": "﷼",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".ر.ع",
      "template": "1 $",
      "rtl": true
    }
  },
  "PAB": {
    "name": "Balboa",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "B/.",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "B/.",
      "template": "$1",
      "rtl": false
    }
  },
  "PEN": {
    "name": "Nuevo Sol",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "S/",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "S/",
      "template": "$1",
      "rtl": false
    }
  },
  "PGK": {
    "name": "Kina",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "PHP": {
    "name": "Philippine Peso",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₱",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₱",
      "template": "$1",
      "rtl": false
    }
  },
  "PKR": {
    "name": "Pakistan Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₨",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "PLN": {
    "name": "Zloty",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "zł",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "zł",
      "template": "1 $",
      "rtl": false
    }
  },
  "PYG": {
    "name": "Guarani",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "Gs",
      "template": "1$",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Gs",
      "template": "1$",
      "rtl": false
    }
  },
  "QAR": {
    "name": "Qatari Rial",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "﷼",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".ر.ق",
      "template": "1 $",
      "rtl": true
    }
  },
  "RON": {
    "name": "New Romanian Leu",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "lei",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "lei",
      "template": "$1",
      "rtl": false
    }
  },
  "RSD": {
    "name": "Serbian Dinar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Дин.",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Дин.",
      "template": "$1",
      "rtl": false
    }
  },
  "RUB": {
    "name": "Russian Ruble",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₽",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₽",
      "template": "1 $",
      "rtl": false
    }
  },
  "RUR": {
    "name": "Russian Ruble",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₽",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₽",
      "template": "1 $",
      "rtl": false
    }
  },
  "RWF": {
    "name": "Rwand Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "SAR": {
    "name": "Saudi Riyal",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "﷼",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".ر.س",
      "template": "1 $",
      "rtl": true
    }
  },
  "SBD": {
    "name": "Solomon Islands Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "SI$",
      "template": "$1",
      "rtl": false
    }
  },
  "SCR": {
    "name": "Seychelles Rupee",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₨",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "SDG": {
    "name": "Sudanese Pound",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "SEK": {
    "name": "Swedish Krona",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "kr",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "SGD": {
    "name": "Singapore Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "S$",
      "template": "$1",
      "rtl": false
    }
  },
  "SHP": {
    "name": "Saint Helen Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "SLL": {
    "name": "Leone",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "SOS": {
    "name": "Somali Shilling",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "S",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "S",
      "template": "$1",
      "rtl": false
    }
  },
  "SRD": {
    "name": "Surinam Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "SSP": {
    "name": "South Sudanese Pound",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "STD": {
    "name": "Dobra",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "SVC": {
    "name": "El Salvador Colon",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "C",
      "template": "$1",
      "rtl": false
    }
  },
  "SYP": {
    "name": "Syrian Pound",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "£",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": ".ل.س",
      "template": "1 $",
      "rtl": true
    }
  },
  "SZL": {
    "name": "Lilangeni",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "THB": {
    "name": "Baht",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "฿",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "฿",
      "template": "$1",
      "rtl": false
    }
  },
  "TJS": {
    "name": "Somoni",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "TMT": {
    "name": "Turkmenistan New Manat",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "TND": {
    "name": "Tunisian Dinar",
    "fractionSize": 3,
    "symbol": {
      "grapheme": ".د.ت",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".د.ت",
      "template": "1 $",
      "rtl": true
    }
  },
  "TOP": {
    "name": "Pa’anga",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "TRL": {
    "name": "Turkish Lira",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₤",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": null
  },
  "TRY": {
    "name": "Turkish Lira",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₺",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₺",
      "template": "$1",
      "rtl": false
    }
  },
  "TTD": {
    "name": "Trinidad and Tobago Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "TT$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "TT$",
      "template": "$1",
      "rtl": false
    }
  },
  "TWD": {
    "name": "New Taiwan Dollar",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "NT$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "NT$",
      "template": "$1",
      "rtl": false
    }
  },
  "TZS": {
    "name": "Tanzanian Shilling",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "TSh",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "TSh",
      "template": "$1",
      "rtl": false
    }
  },
  "UAH": {
    "name": "Hryvnia",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "₴",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₴",
      "template": "$1",
      "rtl": false
    }
  },
  "UGX": {
    "name": "Ugand Shilling",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "USh",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "USh",
      "template": "$1",
      "rtl": false
    }
  },
  "USD": {
    "name": "US Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    }
  },
  "USN": {
    "name": "US Dollar (Next day)",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "UYI": {
    "name": "Uruguay Peso en Unidades Indexadas (URUIURUI)",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "UYU": {
    "name": "Peso Uruguayo",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "$U",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "$U",
      "template": "$1",
      "rtl": false
    }
  },
  "UZS": {
    "name": "Uzbekistan Sum",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "so’m",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "so’m",
      "template": "$1",
      "rtl": false
    }
  },
  "VEF": {
    "name": "Bolivar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Bs",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Bs",
      "template": "$1",
      "rtl": false
    }
  },
  "VND": {
    "name": "Dong",
    "fractionSize": 0,
    "symbol": {
      "grapheme": "₫",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₫",
      "template": "1 $",
      "rtl": false
    }
  },
  "VUV": {
    "name": "Vatu",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "WST": {
    "name": "Tala",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "XAF": {
    "name": "CF Franc BEAC",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "XCD": {
    "name": "East Caribbean Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "EC$",
      "template": "$1",
      "rtl": false
    }
  },
  "XDR": {
    "name": "SDR (Special Drawing Right)",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "XOF": {
    "name": "CF Franc BCEAO",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "XPF": {
    "name": "CFP Franc",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "XSU": {
    "name": "Sucre",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "XUA": {
    "name": "ADB Unit of Account",
    "fractionSize": 0,
    "symbol": null,
    "uniqSymbol": null
  },
  "YER": {
    "name": "Yemeni Rial",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "﷼",
      "template": "1 $",
      "rtl": true
    },
    "uniqSymbol": {
      "grapheme": ".ر.ي",
      "template": "1 $",
      "rtl": true
    }
  },
  "ZAR": {
    "name": "Rand",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "R",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "R",
      "template": "$1",
      "rtl": false
    }
  },
  "ZMW": {
    "name": "Zambian Kwacha",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "ZWD": {
    "name": "Zimbabwe Dollar",
    "fractionSize": 2,
    "symbol": {
      "grapheme": "Z$",
      "template": "$1",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Z$",
      "template": "$1",
      "rtl": false
    }
  },
  "ZWL": {
    "name": "Zimbabwe Dollar",
    "fractionSize": 2,
    "symbol": null,
    "uniqSymbol": null
  },
  "BTC": {
    "name": "BTC",
    "fractionSize": 4,
    "symbol": {
      "grapheme": "₿",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "₿",
      "template": "1 $",
      "rtl": false
    }
  },
  "ETH": {
    "name": "ETH",
    "fractionSize": 4,
    "symbol": {
      "grapheme": "Ξ",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Ξ",
      "template": "1 $",
      "rtl": false
    }
  },
  "LTC": {
    "name": "LTC",
    "fractionSize": 4,
    "symbol": {
      "grapheme": "Ł",
      "template": "1 $",
      "rtl": false
    },
    "uniqSymbol": {
      "grapheme": "Ł",
      "template": "1 $",
      "rtl": false
    }
  }
}

  })

module.exports = Object.assign({}, {nconf})
