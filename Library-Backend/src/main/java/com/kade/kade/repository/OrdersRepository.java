package com.kade.kade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kade.kade.entity.Orders;
@Repository
public interface OrdersRepository extends JpaRepository<Orders,Long> {
     Orders save(Orders order);
}
