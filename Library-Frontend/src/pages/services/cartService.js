import axios from "axios";

export const createCartByUserId = async (userId) => {
  try {
    const response = await axios.post(
      `http://localhost:9500/api/carts/${userId}`
    );
    return await response.data;
  } catch (error) {
    console.log("error is :" + error);
    return error;
  }
}

  export const addCartItemToCart = async (cartId, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:9500/api/carts/${cartId}/add?productId=${productId}&quantity=1`
      );
      return await response.data;
    } catch (error) {
      console.log("error is :" + error);
      return error;
    }
  };

  export const getCartItemsByCartId =async(cartId)=>{
    try {
        const response = await axios.get(
          `http://localhost:9500/api/carts/${cartId}`
        );
        return await response.data;
      } catch (error) {
        console.log("error is :" + error);
        return error;
      }
  }

  export const updateCartItemQuantity =async(cartItemId,quantity)=>{
    try {
        const response = await axios.put(
          `http://localhost:9500/api/carts/updateCartItem/${cartItemId}?newQuantity=${quantity}`
        );
        return await response.data;
      } catch (error) {
        console.log("error in put is :" + error);
        return error;
      }
  }

  export const removeItemFromCart =async(cartId,cartItemId)=>{
    try {
        const response = await axios.delete(
          `http://localhost:9500/api/carts/${cartId}/remove/${cartItemId}`
        );
        return await response.data;
      } catch (error) {
        console.log("error in delete is :" + error);
        return error;
      }
  }


  


  