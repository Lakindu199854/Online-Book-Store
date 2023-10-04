import axios from "axios";

const base_url="http://localhost:9500";
const token=sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization']=`Bearer $(token)`;
//We set this default just after the login aswell,we have to do this because when the page refresh
//states resets,and when the page reloads authentication reset.Thus we will have to say the user to  login
//everytime the page reloads.Thus we do this.


export const createOrder=async(data)=>{
    try{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response=await axios.post("http://localhost:9500/orders",data)
        return response.data;
    }catch(error){
        console.log("error is :"+error)
        return error;
    }

}
