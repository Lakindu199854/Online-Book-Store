package com.kade.kade.entity;

import java.util.List;

import lombok.Data;

@Data
public class CartItemInCart {
    List<CartItem> cartItem;
    Cart cart;

    public CartItemInCart(List<CartItem> cartItem,Cart cart){
        this.cart=cart;
        this.cartItem=cartItem;
    }
}
