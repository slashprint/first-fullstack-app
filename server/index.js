const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { Article } = require('./api')
const app = express()
const PORT = 3000

// req.body - POST 에서 들어온 payload를 받을 수 있다.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Success')
})

app.get('/read', Article.articleRead)
app.get('/read/:id', Article.articleFindOne)
app.post('/create', Article.articleCreate)
app.patch('/update', Article.articleUpdate)
app.delete('/delete/:id', Article.articleDelete)

app.listen(PORT, 'localhost', () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
