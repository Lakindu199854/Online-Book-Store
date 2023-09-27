package com.kade.kade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kade.kade.entity.Book;
import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.Orders;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

       @Query ("SELECT i FROM CartItem i WHERE i.cart.id=:cartId")
      List<CartItem> findCartItemsByCartId(@Param ("cartId") Long cartId);
      
       CartItem save(CartItem cartItem);

       
      
}