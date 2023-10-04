import axios from "axios";

const base_url="http://localhost:9500";
const token=sessionStorage.getItem("token");

//We set this default just after the login aswell,we have to do this because when the page refresh
//states resets,and when the page reloads authentication reset.Thus we will have to say the user to  login
//everytime the page reloads.Thus we do this.


export const createCartByUserId = async (userId) => {
  try {
    const token=sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(
      `http://localhost:9500/api/carts/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("error is :" + error);
    return error;
  }
}

  export const addCartItemToCart = async (cartId, productId) => {
    try {
      const token=sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `http://localhost:9500/api/carts/${cartId}/add?productId=${productId}&quantity=1`
      );
      return response.data;
    } catch (error) {
      console.log("error is :" + error);
      return error;
    }
  };

  export const getCartItemsByCartId =async(cartId)=>{
    try {
      const token=sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          `http://localhost:9500/api/carts/${cartId}`
        );
        return response.data;
      } catch (error) {
        console.log("error is :" + error);
        return error;
      }
  }

  export const updateCartItemQuantity =async(cartItemId,quantity)=>{
    try {
      const token=sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(
          `http://localhost:9500/api/carts/updateCartItem/${cartItemId}?newQuantity=${quantity}`
        );
        return response.data;
      } catch (error) {
        console.log("error in put is :" + error);
        return error;
      }
  }

  export const removeItemFromCart =async(cartId,cartItemId)=>{
    try {
      const token=sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.delete(
          `http://localhost:9500/api/carts/${cartId}/remove/${cartItemId}`
        );
        return response.data;
      } catch (error) {
        console.log("error in delete is :" + error);
        return error;
      }
  }


  


  