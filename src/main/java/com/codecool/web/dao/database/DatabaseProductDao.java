package com.codecool.web.dao.database;

import com.codecool.web.dao.ProductDao;
import com.codecool.web.model.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseProductDao extends AbstractDao implements ProductDao {
    
    private String sql;
    
    public DatabaseProductDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Product> findAll() throws SQLException {
        List<Product> products = new ArrayList<>();
        sql = "SELECT product_id, product_name, brand, specification, description, price, quantity, photo_url FROM products ORDER BY product_id ASC ;";
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
        sql = "SELECT product_id, product_name, brand, specification, description, price, quantity, photo_url FROM products WHERE product_id =?;";
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
    public void addProduct(String name, String brand, String specification, String description, int price, int quantity, String photoUrl) throws SQLException {
        sql = "INSERT INTO products (product_name, brand, specification, description, price, quantity, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?);";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, name);
            statement.setString(2, brand);
            statement.setString(3, specification);
            statement.setString(4, description);
            statement.setInt(5, price);
            statement.setInt(6, quantity);
            statement.setString(7, photoUrl);
            statement.execute();
        }
    }
    
    @Override
    public void updateProduct(Product product) throws SQLException {
        sql = "UPDATE products SET product_name = ?, brand = ?, specification = ?, " +
                "description = ?, price = ?, quantity = ?, photo_url = ? WHERE product_id = ?;";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, product.getName());
            statement.setString(2, product.getBrand());
            statement.setString(3, product.getSpecification());
            statement.setString(4, product.getDescription());
            statement.setInt(5, product.getPrice());
            statement.setInt(6, product.getQuantity());
            statement.setString(7, product.getPhotoUrl());
            statement.setInt(8, product.getId());
            statement.execute();
        }
    }
    
    private void buyProduct(int productId) throws SQLException {
        sql = "UPDATE products SET quantity = quantity - 1 WHERE product_id = ?;";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, productId);
            statement.execute();
        }
    }
    
    @Override
    public void buyProduct(int productId, int quantity) throws SQLException {
        for (int i = 0; i < quantity; i++) {
            buyProduct(productId);
        }
    }
    
    private Product fetchProduct(ResultSet resultSet) throws SQLException {
        int productId = resultSet.getInt("product_id");
        String productName = resultSet.getString("product_name");
        String brand = resultSet.getString("brand");
        String specification = resultSet.getString("specification");
        String description = resultSet.getString("description");
        int price = resultSet.getInt("price");
        int quantity = resultSet.getInt("quantity");
        String photoUrl = resultSet.getString("photo_url");
        return new Product(productId, productName, brand, specification, description, price, quantity, photoUrl);
    }
}
