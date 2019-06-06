package com.codecool.web.dao;

import com.codecool.web.model.Product;

import java.sql.SQLException;
import java.util.List;

public interface ProductDao {
    
    List<Product> findAll() throws SQLException;
    
    Product findByProductId(int productId) throws SQLException;
    
    void addProduct(String name,String brand, String specification, String description, int price, String photoUrl) throws SQLException;
    
    void updateProduct(Product product) throws SQLException;
    
    void deleteProduct(int productId) throws SQLException;
    
}
