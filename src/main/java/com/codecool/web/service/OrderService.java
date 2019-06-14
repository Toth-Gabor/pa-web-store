package com.codecool.web.service;

import com.codecool.web.model.Order;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

public interface OrderService {
    
    List<Order> getAllOrders() throws SQLException;
    
    List<Order> getOrdersByUserId(int userId) throws SQLException;
    
    List<Order> getOrdersByProductId(int productId) throws SQLException;
    
    List<Order> getOrdersByDateWhatOlderThan(Timestamp timestamp) throws SQLException;
    
    List<Order> getOrdersByDateWhatYoungerThan(Timestamp timestamp) throws SQLException;
    
    void cancelOrder(int orderId) throws SQLException;
    
}
