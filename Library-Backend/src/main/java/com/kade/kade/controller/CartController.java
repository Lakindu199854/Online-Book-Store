package com.kade.kade.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.User;
import com.kade.kade.service.CartItemService;
import com.kade.kade.service.CartService;
import com.kade.kade.service.UserService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final CartItemService cartItemService;
    

    @Autowired
    public CartController(CartService cartService,UserService userService,CartItemService cartItemService) {
        this.cartService = cartService;
        this.userService=userService;
        this.cartItemService=cartItemService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> createCart(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        Cart cart = cartService.createCart(user);
        List<CartItem> cartItems = cartItemService.getAllCartItemsByCartId(cart.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("cart", cart);
        response.put("cartItems", cartItems);
    
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{cartId}")
        public ResponseEntity <List<CartItem>> getCartById(@PathVariable Long cartId) {
        Cart cart = cartService.getCartById(cartId);
        List<CartItem> cartItems = cartItemService.getAllCartItemsByCartId(cartId);

        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

       
        return ResponseEntity.ok(cartItems);
    }

    

    @PostMapping("/{cartId}/add")
    public ResponseEntity<List<CartItem>> addItemToCart(@PathVariable Long cartId, @RequestParam Long productId, @RequestParam int quantity) {
        System.out.println(cartId);
        System.out.println(productId);
        System.out.println(quantity);

        Cart cart = cartService.addItemToCart(cartId, productId, quantity);
        List<CartItem> cartItems = cartItemService.getAllCartItemsByCartId(cartId);
        
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
    
        return ResponseEntity.ok(cartItems);
    }

    @PutMapping("/updateCartItem/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemQuantity(@PathVariable Long cartItemId, @RequestParam int newQuantity) {
        CartItem cartItem = cartItemService.updateCartItem(cartItemId, newQuantity);
        if (cartItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/{cartId}/remove/{cartItemId}")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long cartItemId) {
        System.out.println("testing");
        Cart cart = cartService.removeItemFromCart(cartId, cartItemId);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{cartId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }



}