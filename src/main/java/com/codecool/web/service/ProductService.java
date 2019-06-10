package com.codecool.web.service;

import com.codecool.web.dto.ProductDto;
import com.codecool.web.model.Product;

import java.sql.SQLException;
import java.util.List;

public interface ProductService {
    
    List<Product> getAllProducts() throws SQLException;
    
    ProductDto getProductWithAttributes(int productId) throws SQLException;
    
    Product getProduct(int productId) throws SQLException;
}
