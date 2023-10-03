import axios from "axios";

const base_url="http://localhost:9500";
const token=localStorage.getItem("token");
axios.defaults.headers.common['Authorization']=`Bearer $(token)`;
//We set this default just after the login aswell,we have to do this because when the page refresh
//states resets,and when the page reloads authentication reset.Thus we will have to say the user to  login
//everytime the page reloads.Thus we do this.

export const getBooks = async () => {
    try {
        console.log(1);
      const response = await axios.get("http://localhost:9500/books");
      console.log(2);
      return response.data; // No need for another await here
    } catch (error) {
       if(error.response.status==401){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            // window.location.href="/login";
          
        }
    }
  }
  

export const getAllCategories=async()=>{
    try{
        const response = await axios.get(`http://localhost:9500/categories`);
        return response.data;
    }catch(error){
        console.log("There is an error when fetching the categories");
        return error;
    }
}



export const getBookById = async (id) => {
    try {
      const response = await axios.get("http://localhost:9500/books/" + id);
      return response.data;
    } catch (error) {
      console.log("There is an error when fetching");
      return error;
    }
  }
  

export const createBook=async(data)=>{
    try{
        const response=await axios.post("http://localhost:9500/books",data)
         return response.data;
    }catch(error){
        return error;
    }

}

export const getBookByCategoryId=async(categoryId)=>{
    try{
        const response = await axios.get(`http://localhost:9500/books/categories/${categoryId}/books`);
        return response.data;
    }catch(error){
        return error;
    }
   
}




