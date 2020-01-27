/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const expect = require('chai').expect
const jsonSchemaBuilder = require('../lib/json-schema-builder')

const readFile = function (path) {
  return new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, data) => {
    if (err) reject(err)
    else resolve(data)
  }))
}

const convert = function (json, callback) {
  const store = memFs.create()
  const virtualFs = editor.create(store)
  const jsonSchema = jsonSchemaBuilder.dslToJsonSchema(json)
  const outputPath = path.resolve(__dirname, 'output', 'irs-workbook.json')
  virtualFs.writeJSON(outputPath, jsonSchema)

  virtualFs.commit(err => {
    if (err) return callback(err)
    callback(null)
  })
}

describe('Basic builder tests', function () {
  xit('Convert some basic stuff', async () => {
    const file = await readFile(path.resolve(__dirname, 'fixtures', 'irs-workbook.json'))
    const json = JSON.parse(file)
    convert(json, (err) => {
      expect(err).to.eql(null)
    })
  })
})
