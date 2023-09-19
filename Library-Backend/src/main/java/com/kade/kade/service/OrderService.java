package com.kade.kade.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kade.kade.entity.Orders;
@Service
public interface OrderService {
    Orders creatOrder(Orders orders);
    List<Orders> getAllOrders();
    Orders getOrderById(Long id);
}
