package com.kade.kade.service;

import java.util.List;

import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.CartItemInCart;
import com.kade.kade.entity.User;

public interface CartService {

    Cart createCart(User user);


    Cart getCartById(Long cartId);

    Cart addItemToCart(Long cartId, Long productId, int quantity);

    Cart updateCartItemQuantity(Long cartItemId, int newQuantity);

    Cart removeItemFromCart(Long cartId, Long cartItemId);

    void clearCart(Long cartId);


}