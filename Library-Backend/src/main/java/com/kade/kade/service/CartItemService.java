package com.kade.kade.service;

import java.util.List;

import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.User;

public interface CartItemService {

    List<CartItem> getAllCartItems();

    CartItem getCartItemByCartItemId(Long cartItemId);

    List<CartItem> getAllCartItemsByCartId(Long cartId);

    CartItem addCartItem(CartItem cartItem);

    CartItem updateCartItem(CartItem cartItem);

    void removeCartItem(Long cartItemId);

    public CartItem updateCartItem(Long cartItemId, int quantity);
       

}