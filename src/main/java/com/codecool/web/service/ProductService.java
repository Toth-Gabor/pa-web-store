package com.codecool.web.service;

import com.codecool.web.dto.ProductDto;
import com.codecool.web.model.Product;

import java.sql.SQLException;
import java.util.List;

public interface ProductService {
    
    List<Product> getAllProducts() throws SQLException;
    
    ProductDto getProductWithAttributes(String productId) throws SQLException;
    
    Product getProduct(String productId) throws SQLException;
    
    void updateProductInDb(String productId, String name, String brand, String specification, String description,
                           String price, String quantity, String photoUrl) throws SQLException;
    
    void addProductToDb (String name, String brand, String specification, String description,
                         String price, String quantity, String photoUrl) throws SQLException ;
}
