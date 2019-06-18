package com.codecool.web.dao;

import com.codecool.web.model.Product;

import java.sql.SQLException;
import java.util.List;

public interface CartDao {
    
    List<Product> findProductsByUserId(int userId) throws SQLException;
    
    void addProduct(int productId, int quantity, int userId) throws SQLException;
    
    void updateProductQuantity(int productId, int quantity, int userId) throws SQLException;
    
    void deleteFromCart(int productId, int userId) throws SQLException;
    
    
}
