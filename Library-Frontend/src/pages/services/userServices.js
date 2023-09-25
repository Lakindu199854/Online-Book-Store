import axios from "axios";

export const createUser=async(data)=>{
    try{
        const response=await axios.post("http://localhost:9500/users",data)
         return await response.data;
    }catch(error){
        console.log("error is :"+error)
        return error;
    }

}

export const getAllusers =async ()=>{
    try{
        const response=await axios.get("http://localhost:9500/users");
        return await response.data;
    }catch(error){
        console.log("Error when fetching the users");
        return error;
    }
}

   