package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;
import com.kade.kade.repository.CartItemRepository;
import com.kade.kade.repository.CartRepository;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

   

    @Autowired
    public CartItemServiceImpl(CartItemRepository cartItemRepository,CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository=cartRepository;
    }


      @Override
    public CartItem getCartItemByCartItemId(Long cartItemId) {
       return cartItemRepository.findById(cartItemId).orElseThrow(()-> new NoSuchElementException("CartId Not Found"+cartItemId));
        
    }

    @Override
    public CartItem addCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

     @Override
    public CartItem updateCartItem(Long cartItemId, int quantity) {
        CartItem existingCartItem=getCartItemByCartItemId(cartItemId);
        existingCartItem.setQuantity(quantity);
        cartItemRepository.save(existingCartItem);
        return existingCartItem;
    }

   
    
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }


    @Override
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    @Override
    public List<CartItem> getAllCartItemsByCartId(Long cartId) {
       return cartItemRepository.findCartItemsByCartId(cartId);
    }

   

    

    
}