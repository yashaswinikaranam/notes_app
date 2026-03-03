if(process.env.NODE_ENV!=='production') {
    require('dotenv').config()
}

const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MONGODB CONNECTED'))
.catch(err=>console.log(err))

app.get('/',(req,res)=> {
    res.send('HOME PAGE')
})

app.listen(process.env.PORT , ()=> {
    console.log('Server running')
})