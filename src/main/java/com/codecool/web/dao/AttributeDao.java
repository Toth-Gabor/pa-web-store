package com.codecool.web.dao;

import com.codecool.web.model.Attribute;

import java.sql.SQLException;
import java.util.List;

public interface AttributeDao {
    
    List<Attribute> findAllAttributesByProductId(int productId) throws SQLException;
    
    List<String> findAttributeType(int productId) throws SQLException;
    
}
