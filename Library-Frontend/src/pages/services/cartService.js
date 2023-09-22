import axios from "axios";

export const createCartByUserId=async(userId)=>{
    try{
        const response=await axios.post(`http://localhost:9500/api/carts/${userId}`)
         return await response.data;
    }catch(error){
        console.log("error is :"+error)
        return error;
    }

}

   