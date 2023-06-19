import { PrismaClient } from '@prisma/client'
import express, { urlencoded } from 'express';
import { redisCheck } from './redis.js';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import mongoose from 'mongoose';
const app = express();
app.use(cors())
const prisma = new PrismaClient()

app.use(express.json());

const ProductSchema = new mongoose.Schema(
  {name:{
    required: true,
    type: String
  },
  image: {
    requried: true,
    type: String
  },
  cost: {
    required: true,
    type: String
  }
  });



app.get('/api/data/', async (req,res) =>{
  
  try {
    const cachedValue = await redisCheck.get('Items')

    
    if (cachedValue){
      
      console.log('cached value')
      res.json(JSON.parse(cachedValue))
    }
    
    if (!cachedValue){

      const items = await prisma.items.findMany()
      await redisCheck.set('Items',JSON.stringify(items))
      console.log('non cached value')
      res.json(items)
    }
  }catch (error){
    return new Response('Error')
  }
  

})

app.post('/Admin',async (req,res) =>{
  const {name,image,cost} = req.body
  console.log(name,image,cost)

    try{
      const newProduct = await prisma.items.create({
        data:{
          objectname: name,
          cost: cost,
          image: image,
        },
      })
      
      const items = await prisma.items.findMany();
      await redisCheck.set('Items',JSON.stringify(items))
      res.status(200).json(newPost)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }finally{
      await prisma.$disconnect();
    }

})




mongoose.set('strictQuery',true)
const uri = process.env.DATABASE_URL
mongoose.connect(uri)
.then(() =>{
    app.listen(3000, () => {
        console.log("server started on port 3000");
        });
        
})
.catch((error) =>{
    console.log(error)
});
