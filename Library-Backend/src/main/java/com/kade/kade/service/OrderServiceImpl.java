package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.kade.kade.entity.Orders;
import com.kade.kade.repository.OrdersRepository;
@Service
public class OrderServiceImpl implements OrderService{
    private OrdersRepository orderRepository;

    public OrderServiceImpl(OrdersRepository orderRepository){
        this.orderRepository=orderRepository;
    }

    @Override
    public Orders creatOrder(Orders orders) {
      return orderRepository.save(orders);
     
    }

    @Override
    public List<Orders> getAllOrders() {
       return orderRepository.findAll();
    }

    @Override
    public Orders getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User Not Found"+id));
    }
    
}
