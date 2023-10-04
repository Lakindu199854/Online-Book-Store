import axios from "axios";

const base_url="http://localhost:9500";
const token=sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization']=`Bearer $(token)`;
//We set this default just after the login aswell,we have to do this because when the page refresh
//states resets,and when the page reloads authentication reset.Thus we will have to say the user to  login
//everytime the page reloads.Thus we do this.

export const  getRequest=async(path)=>{
    try{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response=await axios.get(base_url+path);
        return response;
    }catch(error){
        if(error.response.status===401){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username"); 
            sessionStorage.removeItem("userId");
            window.location.href="/login";
        }
    }
}

export const  postRequest=async(path,data)=>{
    try{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response=await axios.post(base_url+path,data);
        return response;
    }catch(error){
        //When we have a 401 error then the token  is invalid
        if(error.response.status===401){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("userId");
            window.location.href="/login";
        }
    }
}

