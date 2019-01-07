# json-schema-builder

[![Tymly Package](https://img.shields.io/badge/tymly-package-blue.svg)](https://tymly.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@wmfs/json-schema-builder.svg)](https://www.npmjs.com/package/@wmfs/json-schema-builder)
[![Build Status](https://travis-ci.org/wmfs/json-schema-builder.svg?branch=master)](https://travis-ci.org/wmfs/json-schema-builder)
[![codecov](https://codecov.io/gh/wmfs/json-schema-builder/branch/master/graph/badge.svg)](https://codecov.io/gh/wmfs/json-schema-builder)
[![CodeFactor](https://www.codefactor.io/repository/github/wmfs/json-schema-builder/badge)](https://www.codefactor.io/repository/github/wmfs/json-schema-builder)
[![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/json-schema-builder/blob/master/README.md)


> Generate JSON-Schema schemas via a UI-orientated DSL.

# Why?

If you're building some high-level, drag-and-drop tooling to produce JSON Schema objects, chances are your internal representation will be more array-like?
This package is intended to take that internal UI representation and turn it into a valid JSON-Schema schema.

# Installation

``` bash
npm install @wmfs/json-schema-builder --save
```

## <a name="Usage"></a> Usage

``` javascript

const makeJsonSchema = require('@wmfs/json-schema-builder')

const jsonSchema = makeJsonSchema(
  {
    title: 'Pizza',
    description: 'A model for storing details of a pizza (recipe, price etc.)',
    propertyHints: [
      {
        key: 'code',
        typeHint: 'string',
        example: 'CHEESE_TOMATO',
        required: true,
        title: 'Unique code of the pizza',
        minLength: 3,
        maxLength: 15
      },
      {
        key: 'label',
        typeHint: 'string',
        required: true,
        example: 'Cheese & Tomato',
        title: 'Customer-facing label'
      },
      {
        key: 'popularitySeq',
        typeHint: 'integer',
        required: true,
        title: 'Integer value to order lists by',
        minimum: 1
      },
      {
        key: 'imageUri',
        typeHint: 'uri',
        required: true,
        example: 'https://tinyurl.com/y8r5bbu5',
        title: 'URI to an enticing photo of the pizza'
      },
      {
        key: 'vegetarian',
        typeHint: 'boolean',
        required: true,
        default: false,
        title: 'Is the pizza suitable for vegetarians?'
      },
      {
        key: 'allergens',
        typeHint: 'string',
        example: ['Gluten', 'Wheat', 'Milk'],
        multiple: true,
        uniqueItems: true,
        title: 'List of allergens present in pizza'
      },
      {
        key: 'availabilityEnd',
        typeHint: 'date',
        example: '2019-12-31',
        required: false,
        title: 'Date when pizza is no longer available.'
      },
      {
        key: 'reviews',
        typeHint: 'object',
        multiple: true,
        title: 'Favourable customer reviews',
        propertyHints: [
          {
            key: 'username',
            example: 'joebloggs4',
            typeHint: 'string',
            required: true,
            title: 'Who wrote the review'
          },
          {
            key: 'review',
            example: 'Lovely stuff!',
            typeHint: 'string',
            required: true,
            title: 'Something nice to say'
          },
          {
            key: 'rating',
            title: 'Star rating (0=Awful 5=Great)',
            example: 5,
            typeHint: 'integer',
            required: true,
            minimum: 0,
            maximum: 5,
            default: 5
          }
        ]
      }
    ]
  }
)

/*

// Which returns...
// ----------------
//

{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Pizza",
  "description": "A model for storing details of a pizza (recipe, price etc.)",
  "type": "object",
  "properties": {
    "code": {
      "title": "Unique code of the pizza",
      "examples": [
        "CHEESE_TOMATO"
      ],
      "type": "string",
      "minLength": 3,
      "maxLength": 15
    },
    "label": {
      "title": "Customer-facing label",
      "examples": [
        "Cheese & Tomato"
      ],
      "type": "string"
    },
    "popularitySeq": {
      "title": "Integer value to order lists by",
      "type": "integer",
      "minimum": 1
    },
    "imageUri": {
      "title": "URI to an enticing photo of the pizza",
      "examples": [
        "https://tinyurl.com/y8r5bbu5"
      ],
      "type": "string",
      "format": "uri"
    },
    "vegetarian": {
      "title": "Is the pizza suitable for vegetarians?",
      "default": false,
      "type": "boolean"
    },
    "allergens": {
      "title": "List of allergens present in pizza",
      "examples": [
        [
          "Gluten",
          "Wheat",
          "Milk"
        ]
      ],
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    },
    "availabilityEnd": {
      "title": "Date when pizza is no longer available.",
      "examples": [
        "2019-12-31"
      ],
      "type": "string",
      "format": "date-time"
    },
    "reviews": {
      "title": "Favourable customer reviews",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "username": {
            "title": "Who wrote the review",
            "examples": [
              "joebloggs4"
            ],
            "type": "string"
          },
          "review": {
            "title": "Something nice to say",
            "examples": [
              "Lovely stuff!"
            ],
            "type": "string"
          },
          "rating": {
            "title": "Star rating (0=Awful 5=Great)",
            "default": 5,
            "examples": [
              5
            ],
            "type": "integer",
            "minimum": 0,
            "maximum": 5
          }
        },
        "required": [
          "username",
          "review",
          "rating"
        ]
      }
    }
  },
  "required": [
    "code",
    "label",
    "popularitySeq",
    "imageUri",
    "vegetarian"
  ]
}

*/

```

## Testing

``` bash
npm test
```


## <a name='license'></a>License
[MIT](https://github.com/wmfs/json-schema-builder/blob/master/LICENSE)
