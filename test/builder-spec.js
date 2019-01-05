/* eslint-env mocha */

const expect = require('chai').expect
const makeJsonSchema = require('../lib/json-schema-builder')

describe('Basic builder tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  it('Convert some basic stuff', () => {
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
    console.log(JSON.stringify(jsonSchema, null, 2))

    expect(jsonSchema).to.eql(
      {
        $schema: 'http://json-schema.org/draft-06/schema#',
        title: 'Pizza',
        description: 'A model for storing details of a pizza (recipe, price etc.)',
        type: 'object',
        properties: {
          code: {
            title: 'Unique code of the pizza',
            type: 'string',
            minLength: 3,
            maxLength: 15
          },
          label: {
            title: 'Customer-facing label',
            type: 'string'
          },
          popularitySeq: {
            title: 'Integer value to order lists by',
            type: 'integer',
            minimum: 1
          },
          imageUri: {
            title: 'URI to an enticing photo of the pizza',
            type: 'string',
            format: 'uri'
          },
          vegetarian: {
            title: 'Is the pizza suitable for vegetarians?',
            default: false,
            type: 'boolean'
          },
          allergens: {
            title: 'List of allergens present in pizza',
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string'
            }
          },
          availabilityEnd: {
            title: 'Date when pizza is no longer available.',
            type: 'string',
            format: 'date-time'
          },
          reviews: {
            title: 'Favourable customer reviews',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                username: {
                  title: 'Who wrote the review',
                  type: 'string'
                },
                review: {
                  title: 'Something nice to say',
                  type: 'string'
                },
                rating: {
                  title: 'Star rating (0=Awful 5=Great)',
                  default: 5,
                  type: 'integer',
                  minimum: 0,
                  maximum: 5
                }
              },
              required: [
                'username',
                'review',
                'rating'
              ]
            }
          }
        },
        required: [
          'code',
          'label',
          'popularitySeq',
          'imageUri',
          'vegetarian'
        ]
      }
    )
  })
})
