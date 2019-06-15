package com.codecool.web.service;

import com.codecool.web.model.Order;

import java.sql.SQLException;
import java.util.List;

public interface OrderService {
    
    List<Order> getAllOrders() throws SQLException;
    
    List<Order> getOrdersByUserId(String userId) throws SQLException;
    
    List<Order> getOrdersByProductId(String productId) throws SQLException;
    
    List<Order> getOrdersByDateWhatFormerThan(String timestamp) throws SQLException;
    
    List<Order> getOrdersByDateWhatLaterThan(String timestamp) throws SQLException;
    
    void cancelOrder(String orderId) throws SQLException;
    
    List<Order> methodSelector(String param, String fetch) throws SQLException;
}