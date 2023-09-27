import axios from "axios";

export const createOrder=async(data)=>{
    try{
        const response=await axios.post("http://localhost:9500/orders",data)
         return await response.data;
    }catch(error){
        console.log("error is :"+error)
        return error;
    }

}
