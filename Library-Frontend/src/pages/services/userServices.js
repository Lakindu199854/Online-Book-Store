import axios from "axios";

export const createUser=async(data)=>{
    try{
        const response=await axios.post("http://localhost:9500/users",data)
         return await response.data;
    }catch(error){
        return error;
    }

}

   