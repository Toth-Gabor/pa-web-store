package com.codecool.web.service.simple;

import com.codecool.web.dao.OrderDao;
import com.codecool.web.model.Order;
import com.codecool.web.service.OrderService;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

public class SimpleOrderService implements OrderService {
    
    private final OrderDao orderDao;
    
    public SimpleOrderService(OrderDao orderDao) {
        this.orderDao = orderDao;
    }
    
    @Override
    public List<Order> getAllOrders() throws SQLException {
        return orderDao.findAllOrders();
    }
    
    @Override
    public List<Order> getOrdersByUserId(String userId) throws SQLException {
        return orderDao.findOrdersByUserId(Integer.parseInt(userId));
    }
    
    @Override
    public List<Order> getOrdersByProductId(String productId) throws SQLException {
        return orderDao.findOrdersByProductId(Integer.parseInt(productId));
    }
    
    @Override
    public List<Order> getOrdersByDateWhatOlderThan(String timestamp) throws SQLException {
        return orderDao.findOrdersByDateWhatOlderThan(Timestamp.valueOf(timestamp));
    }
    
    @Override
    public List<Order> getOrdersByDateWhatYoungerThan(String timestamp) throws SQLException {
        return orderDao.findOrdersByDateWhatYoungerThan(Timestamp.valueOf(timestamp));
    }
    
    @Override
    public void cancelOrder(String orderId) throws SQLException {
        orderDao.deleteOrder(Integer.parseInt(orderId));
    }
    
    @Override
    public List<Order> methodSelector(String param, String fetch) throws SQLException {
        switch (fetch) {
            case "userId":
                return getOrdersByUserId(param);
            case "productId":
                return getOrdersByProductId(param);
            case "older":
                return getOrdersByDateWhatOlderThan(param);
            case "younger":
                return getOrdersByDateWhatYoungerThan(param);
            default:
                return null;
        }
    }
}
