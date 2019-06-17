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
    public ProductDto getProductWithAttributes(String productId) throws SQLException {
        Product product = productDao.findByProductId(Integer.parseInt(productId));
        List<Attribute> attributeList = attributeDao.findAllAttributesByProductId(Integer.parseInt(productId));
        return new ProductDto(product, attributeList);
    }
    
    @Override
    public Product getProduct(String productId) throws SQLException {
        return productDao.findByProductId(Integer.parseInt(productId));
    }
    
    @Override
    public void updateProductInDb(String productId, String name, String brand, String specification,
                                  String description, String price, String quantity, String photoUrl) throws SQLException {
        productDao.updateProduct(new Product(Integer.parseInt(productId), name, brand, specification,
                                        description, Integer.parseInt(price), Integer.parseInt(quantity), photoUrl));
    }
    
    
}
