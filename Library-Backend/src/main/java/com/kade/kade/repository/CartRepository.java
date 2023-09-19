package com.kade.kade.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kade.kade.entity.Book;
import com.kade.kade.entity.Cart;
import com.kade.kade.entity.CartItem;

public interface CartRepository extends JpaRepository<Cart, Long>{
     Cart save(Cart cart);
}

