package com.codecool.web.service.simple;

import com.codecool.web.dao.AttributeDao;
import com.codecool.web.dao.ProductDao;
import com.codecool.web.dto.ProductDto;
import com.codecool.web.model.Attribute;
import com.codecool.web.model.Product;
import com.codecool.web.service.ProductService;

import java.sql.SQLException;
import java.util.List;

public class SimpleProductService implements ProductService {
    
    private final ProductDao productDao;
    private final AttributeDao attributeDao;
    
    public SimpleProductService(ProductDao productDao, AttributeDao attributeDao) {
        this.productDao = productDao;
        this.attributeDao = attributeDao;
    }
    
    @Override
    public List<Product> getAllProducts() throws SQLException {
        return productDao.findAll();
    }
    
    @Override
    public ProductDto getProductWithAttributes(int productId) throws SQLException {
        Product product = productDao.findByProductId(productId);
        List<Attribute> attributeList = attributeDao.findAllAttributesByProductId(productId);
        return new ProductDto(product, attributeList);
    }
}
