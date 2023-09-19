package com.kade.kade.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.Book;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.User;
import com.kade.kade.service.CartItemService;

@CrossOrigin(origins="*")

@RestController
@RequestMapping("/api/cartItems")
public class CartItemController {

    private final CartItemService cartItemService;



    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }



    @GetMapping
    public List <CartItem>getAllCartItems(){
        return cartItemService.getAllCartItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity <CartItem> getCartItemByCartItemId(@PathVariable Long id){
        try{
            CartItem cartItem = cartItemService.getCartItemByCartItemId(id);
            return ResponseEntity.status(HttpStatus.OK).body(cartItem);
        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        }
    }    

    

    @PostMapping
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
        CartItem savedCartItem = cartItemService.addCartItem(cartItem);
        return ResponseEntity.ok(savedCartItem);
    }

    @PutMapping
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem) {
        CartItem updatedCartItem = cartItemService.updateCartItem(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }
}