package com.kade.kade.service;

import java.util.List;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kade.kade.entity.Book;
import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.CartItemInCart;
import com.kade.kade.entity.User;
import com.kade.kade.repository.BookRepository;
import com.kade.kade.repository.CartItemRepository;
import com.kade.kade.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final CartItemService cartItemService;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, BookRepository bookRepository,CartItemService cartItemService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.bookRepository = bookRepository;
        this.cartItemService=cartItemService;
    }

    @Override
    @Transactional
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }

    @Override
    @Transactional
    public Cart addItemToCart(Long cartId, Long productId, int quantity) {
        Cart cart = getCartById(cartId);
        if (cart != null){
            Book book = bookRepository.findById(productId).orElse(null);
          
            
            if(book!=null){
                List<CartItem> cartItems = cartItemService.getAllCartItemsByCartId(cartId);
                for (CartItem cartItem : cartItems) {
                    if (cartItem.getBook().getId().equals(productId)) {
                        
                        int newQuantity = cartItem.getQuantity() + quantity;
                        cartItem.setQuantity(newQuantity);
                        cartItemService.updateCartItem(cartItem); // Assuming you have an updateCartItem method

                        return (getCartById(cartId));
                    }
                } 

                CartItem cartItem = new CartItem();

                cartItem.setCart(cart);
                cartItem.setBook(book);
                cartItem.setQuantity(quantity);
                
                cartItemRepository.save(cartItem);
                cartRepository.save(cart);
              

            }
        }
        return cart;
    }

 
    @Override
    @Transactional
    public Cart updateCartItemQuantity(Long cartItemId, int newQuantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
        if (cartItem != null) {
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
            return cartItem.getCart();
        }
        return null;
    }

   
    @Override
    @Transactional
    public Cart removeItemFromCart(Long cartId, Long cartItemId) {
        Cart cart = getCartById(cartId);
    
        if (cart != null) {
            List<CartItem> cartItems = cartItemService.getAllCartItemsByCartId(cartId); 
            
             for (CartItem cartItem : cartItems) {
                    if (cartItem.getId().equals(cartItemId)) {
                        
                        cartItemService.removeCartItem(cartItemId);
                        // cartItemService.updateCartItem(cartItem); // Assuming you have an updateCartItem method

                        return (getCartById(cartId));
                    }
                } 
        }
    
        return cart;
    }

    @Override
    public void clearCart(Long cartId) {
        try{
            cartRepository.deleteById(cartId);
        }catch(Exception e){
            System.out.println(e);
        }
       
    }
    
}