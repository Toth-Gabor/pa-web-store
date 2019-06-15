package com.codecool.web.dao;

import com.codecool.web.model.Order;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

public interface OrderDao {
    
    List<Order> findAllOrders() throws SQLException;
    
    List<Order> findOrdersByUserId(int userId) throws SQLException;
    
    List<Order> findOrdersByProductId(int productId) throws SQLException;
    
    List<Order> findOrdersByDateWhatFormerThan(Timestamp timestamp) throws SQLException;
    
    List<Order> findOrdersByDateWhatLaterThan(Timestamp timestamp) throws SQLException;
    
    void deleteOrder(int orderId) throws SQLException;
    
}
