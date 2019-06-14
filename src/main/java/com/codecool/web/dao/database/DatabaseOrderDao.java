package com.codecool.web.dao.database;

import com.codecool.web.dao.OrderDao;
import com.codecool.web.model.Order;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseOrderDao extends AbstractDao implements OrderDao {
    
    private String sql;
    
    DatabaseOrderDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Order> findAllOrders() throws SQLException {
        List<Order> ordersList = new ArrayList<>();
        sql = "SELECT orders.order_id, user_id, order_date, product_id, quantity FROM orders\n" +
                "    INNER JOIN line_item ON orders.order_id = line_item.order_id;";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                ordersList.add(fetchOrder(resultSet));
            }
            return ordersList;
        }
    }

    @Override
    public List<Order> findOrdersByUserId(int userId) throws SQLException {
        List<Order> ordersList = new ArrayList<>();
        sql = "SELECT orders.order_id, user_id, order_date, product_id, quantity FROM orders\n" +
                "    INNER JOIN line_item ON orders.order_id = line_item.order_id WHERE user_id = ?;";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    ordersList.add(fetchOrder(resultSet));
                }
                return ordersList;
            }
        }
    }
    
    
    
    private Order fetchOrder(ResultSet resultSet) throws SQLException {
        int orderId = resultSet.getInt("order_id");
        int userId = resultSet.getInt("user_id");
        int productId = resultSet.getInt("product_id");
        int quantity = resultSet.getInt("quantity");
        Timestamp timestamp = resultSet.getTimestamp("order_date");
        return new Order(orderId, userId, productId, quantity, timestamp);
    }
}
