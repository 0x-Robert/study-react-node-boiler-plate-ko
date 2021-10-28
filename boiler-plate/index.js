const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { User } = require("./models/User");


const config = require('./config/key');


//application/x-www-form-urlencoded 해석
app.use(bodyParser.urlencoded({extended: true}));

//application/json 해석
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
        // useNewUrlParser: true, 
        // useUnifiedTopology: true, 
        // useCreateIndex: true, 
        // useFindAndModify: false,

}).then(() => console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))





app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 sadfasdfasdfsf' )
})

app.post('/register', (req,res) => {

  //회원 가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


