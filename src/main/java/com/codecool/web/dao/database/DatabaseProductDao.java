package com.codecool.web.dao.database;

import com.codecool.web.dao.ProductDao;
import com.codecool.web.model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseProductDao extends AbstractDao implements ProductDao {
    
    private String sql;
    
    DatabaseProductDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Product> findAll() throws SQLException {
        List<Product> products = new ArrayList<>();
        sql = "SELECT product_id, product_name, brand, specification, description, price, photo_url FROM products;";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                products.add(fetchProduct(resultSet));
            }
            return products;
        }
    }
    
    @Override
    public Product findByProductId(int productId) throws SQLException {
        sql = "SELECT product_id, product_name, brand, specification, description, price, photo_url FROM products WHERE product_id =?;";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, productId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    return fetchProduct(resultSet);
                }
                return null;
            }
        }
    }
    
    @Override
    public void addProduct(String name, String brand, String specification, String description, int price, String photoUrl) throws SQLException {
        sql = "INSERT INTO products (product_name, brand, specification, description, price, photo_url) VALUES (?, ?, ?, ?, ?, ?);";
        try (PreparedStatement statement = connection.prepareStatement(sql)){
            statement.setString(1, name);
            statement.setString(2, brand);
            statement.setString(3, specification);
            statement.setString(4, description);
            statement.setInt(5, price);
            statement.setString(6, photoUrl);
            statement.execute();
        }
    }
    
    @Override
    public void updateProduct(Product product) throws SQLException {
    
    }
    
    @Override
    public void deleteProduct(int productId) throws SQLException {
    
    }
    
    private Product fetchProduct(ResultSet resultSet) throws SQLException {
        int productId = resultSet.getInt("product_id");
        String productName = resultSet.getString("product_name");
        String brand = resultSet.getString("brand");
        String specification = resultSet.getString("specification");
        String description = resultSet.getString("description");
        int price = resultSet.getInt("price");
        String photoUrl = resultSet.getString("");
        return new Product(productId, productName, brand, specification, description, price, photoUrl);
    }
}
