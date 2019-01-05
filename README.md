# json-schema-builder

> Generate JSON-Schema schemas via a UI-orientated DSL.

# Why?

If you're building some higher-level, drag-and-drop tooling to produce JSON Schema objects, chances are your internal representation will be more array-like at that time.
This package is intented to take that internal representation and turn it into a valid JSON-Schema schema.

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
        required: true,
        title: 'Unique code of the pizza',
        minLength: 3,
        maxLength: 15
      },
      {
        key: 'label',
        typeHint: 'string',
        required: true,
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
        multiple: true,
        uniqueItems: true,
        title: 'List of allergens present in pizza'
      },
      {
        key: 'availabilityEnd',
        typeHint: 'date',
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
            typeHint: 'string',
            required: true,
            title: 'Who wrote the review'
          },
          {
            key: 'review',
            typeHint: 'string',
            required: true,
            title: 'Something nice to say'
          },
          {
            key: 'rating',
            title: 'Star rating (0=Awful 5=Great)',
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

// Which returns...
// ----------------
//
// {
//   "$schema": "http://json-schema.org/draft-06/schema#",
//   "title": "Pizza",
//   "description": "A model for storing details of a pizza (recipe, price etc.)",
//   "type": "object",
//   "properties": {
//     "code": {
//       "title": "Unique code of the pizza",
//       "type": "string",
//       "minLength": 3,
//       "maxLength": 15
//     },
//     "label": {
//       "title": "Customer-facing label",
//       "type": "string"
//     },
//     "popularitySeq": {
//       "title": "Integer value to order lists by",
//       "type": "integer",
//       "minimum": 1
//     },
//     "imageUri": {
//       "title": "URI to an enticing photo of the pizza",
//       "type": "string",
//       "format": "uri"
//     },
//     "vegetarian": {
//       "title": "Is the pizza suitable for vegetarians?",
//       "default": false,
//       "type": "boolean"
//     },
//     "allergens": {
//       "title": "List of allergens present in pizza",
//       "type": "array",
//       "uniqueItems": true,
//       "items": {
//         "type": "string"
//       }
//     },
//     "availabilityEnd": {
//       "title": "Date when pizza is no longer available.",
//       "type": "string",
//       "format": "date-time"
//     },
//     "reviews": {
//       "title": "Favourable customer reviews",
//       "type": "array",
//       "items": {
//         "type": "object",
//         "properties": {
//           "username": {
//             "title": "Who wrote the review",
//             "type": "string"
//           },
//           "review": {
//             "title": "Something nice to say",
//             "type": "string"
//           },
//           "rating": {
//             "title": "Star rating (0=Awful 5=Great)",
//             "default": 5,
//             "type": "integer",
//             "minimum": 0,
//             "maximum": 5
//           }
//         },
//         "required": [
//           "username",
//           "review",
//           "rating"
//         ]
//       }
//     }
//   },
//   "required": [
//     "code",
//     "label",
//     "popularitySeq",
//     "imageUri",
//     "vegetarian"
//   ]
// }
//
```

## Testing

``` bash
npm test
```


## <a name='license'></a>License
[MIT](https://github.com/wmfs/json-schema-builder/blob/master/LICENSE)
