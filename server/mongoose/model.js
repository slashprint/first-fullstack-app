const mongoose = require('mongoose')
const schema = require('./schema')
const { MONGO_ID, MONGO_PW } = process.env

const db = mongoose.connection
const model = (() => {
  db.on('error', console.error)
  db.on('open', () => {
    console.log('Connecting mongodb!')
  })

  // Atlas mongodb cluster와 연결
  const uri = `mongodb+srv://${MONGO_ID}:${MONGO_PW}@cluster0.7anl7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  /**
   * Schema 연결
   * Loop 반복문은 Schema가 여러가지일 경우를 상정해서 사용함
   */
  const model = {}
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key])
  }
  return model
})()

module.exports = model
