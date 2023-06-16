const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const hbs=require('hbs')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, './Temp')
// const publicPath = path.join(__dirname, '../public') //css purpose
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
// app.use(express.static(publicPath)) //css purpose


//db setting
function Connectmongodb(){
  try {
    mongoose.connect(
      "mongodb://localhost:27017/firstdb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Db connected Successfully ');
  } catch (error) {
    console.log(error);
  }
}
Connectmongodb()

const createSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  msg:{
    type:String,
    required:true
  }
})

const CollectionDataSchemaformat = new mongoose.model("Firstcollection",createSchema)

module.exports = CollectionDataSchemaformat

//db setting end

app.get('/',(rq,res,next)=>{
  res.render('template')
})

app.post('/add',async(req,res)=>{
  const checking = await CollectionDataSchemaformat.findOne({ name: req.body.name })
  if (checking?.name === req.body.name) {
    res.send('username exist')
  } else {
    await CollectionDataSchemaformat.insertMany({ name: req.body.name, msg: req.body.msg })
    res.status(200).json('Successfully')
  }
})


app.listen(3000, () => {
  console.log('app is running');
});

