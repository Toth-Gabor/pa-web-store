package com.codecool.web.dto;

import com.codecool.web.model.Attribute;
import com.codecool.web.model.Product;

import java.util.List;

public class ProductDto {
    
    private Product product;
    private List<Attribute> attributeList;
    
    public ProductDto(Product product, List<Attribute> attributeList) {
        this.product = product;
        this.attributeList = attributeList;
    }
    
    public Product getProduct() {
        return product;
    }
    
    public List<Attribute> getAttributeList() {
        return attributeList;
    }
}
