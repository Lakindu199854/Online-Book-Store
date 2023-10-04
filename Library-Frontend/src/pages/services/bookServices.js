import axios from "axios";   

const base_url = "http://localhost:9500";
const token = sessionStorage.getItem("token");



export const getBooks = async () => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("http://localhost:9500/books");

    return response.data; // No need for another await here
  } catch (error) {
    if (error.response.status === 401) {
        console.log(error);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username"); 
        sessionStorage.removeItem("userId");
        window.location.href="/login";
    }
  }
};

export const getAllCategories = async () => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`http://localhost:9500/categories`);
    return response.data;
  } catch (error) {
    console.log("There is an error when fetching the categories");
    return error;
  }
};

export const getBookById = async (id) => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("http://localhost:9500/books/" + id);
    return response.data;
  } catch (error) {
    console.log("There is an error when fetching");
    return error;
  }
};

export const createBook = async (data) => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("http://localhost:9500/books", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBookByCategoryId = async (categoryId) => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(
      `http://localhost:9500/books/categories/${categoryId}/books`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
