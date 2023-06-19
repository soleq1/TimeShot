import { Redis } from "ioredis";

 const getRedisUrl = () =>{
    if (process.env.REDIS_URL){
        return process.env.REDIS_URL
    }

    throw new Error('url is not defined')

    
}

export const redisCheck = new Redis(getRedisUrl())