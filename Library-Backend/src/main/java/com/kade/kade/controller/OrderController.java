package com.kade.kade.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.Orders;
import com.kade.kade.service.OrderService;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins="*")

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

       @Autowired
        public OrderController(OrderService orderService){
             this.orderService=orderService;
        }

        @GetMapping
        public ResponseEntity <List<Orders>> getAllOrders(){
            List<Orders> orders=orderService.getAllOrders();
            return ResponseEntity.status(HttpStatus.OK).body(orders);
        }
        
        @GetMapping("/{id}")
        public ResponseEntity <Orders> getOrderById(@PathVariable Long id){
            try{
                 Orders order=orderService.getOrderById(id);
                 return ResponseEntity.status(HttpStatus.OK).body(order);
            }catch(NoSuchElementException e){
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
          
        }

        @PostMapping
        public ResponseEntity <Orders> creatOrder(@RequestBody Orders order){
             try{
                 Orders orderCreated=orderService.creatOrder(order);
                 return ResponseEntity.status(HttpStatus.CREATED).body(orderCreated);
            }catch(NoSuchElementException e){
                 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        
        

    }

