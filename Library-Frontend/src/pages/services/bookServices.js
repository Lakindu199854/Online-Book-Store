import axios from "axios";

export const getBooks =async ()=>{
    try{
        const response=await axios.get("http://localhost:9500/books");
        return await response.data;
    }catch(error){
        console.log("There is an error when fetching the books");
        return error;
    }
}

export const getAllCategories=async()=>{
    try{
        const response = await axios.get(`http://localhost:9500/categories`);
        return await response.data;
    }catch(error){
        console.log("There is an error when fetching the categories");
        return error;
    }
}
   


export const getBookById =async (id)=>{
    try{
        const response=await fetch("http://localhost:9500/books/"+id);
        return await response.json();
    }catch(error){
        console.log("There is an error when fetching");
        return error;
    }
}

export const createBook=async(data)=>{
    try{
        const response=await axios.post("http://localhost:9500/books",data)
         return await response.data;
    }catch(error){
        return error;
    }

}

export const getBookByCategoryId=async(categoryId)=>{
    try{
        const response = await fetch(`http://localhost:9500/books/categories/${categoryId}/books`);
        return await response.json();
    }catch(error){
        return error;
    }
   
}




