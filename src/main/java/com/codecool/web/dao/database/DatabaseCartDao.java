package com.codecool.web.dao.database;

import com.codecool.web.dao.CartDao;
import com.codecool.web.model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseCartDao extends AbstractDao implements CartDao {
    
    private String sql;
    
    DatabaseCartDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Product> findProductsByUserId(int userId) throws SQLException {
        List<Product> cartProductList = new ArrayList<>();
        sql = "SELECT product_id, product_name, product_price, product_quantity, user_id FROM cart WHERE user_id =?;";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    cartProductList.add(fetchCartProduct(resultSet));
                }
            }
        }
        return cartProductList;
    }
    
    
    @Override
    public void addProduct(int productId, int quantity, int userId) throws SQLException {
    }
    
    @Override
    public void updateProductQuantity(int productId, int quantity, int userId) throws SQLException {
    
    }
    
    @Override
    public void deleteFromCart(int productId, int userId) throws SQLException {
    
    }
    
    private Product fetchCartProduct(ResultSet resultSet) throws SQLException {
        int productId = resultSet.getInt("product_id");
        String productName = resultSet.getString("product_name");
        int price = resultSet.getInt("price");
        int quantity = resultSet.getInt("quantity");
        return new Product(productId, productName, null, null, null, price, quantity, null);
        
    }
}