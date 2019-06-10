package com.codecool.web.dao.database;

import com.codecool.web.dao.AttributeDao;
import com.codecool.web.model.Attribute;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseAttributeDao extends AbstractDao implements AttributeDao {
    
    private String sql;
    
    DatabaseAttributeDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Attribute> findAllAttributesByProductId(int productId) throws SQLException {
        sql = "SELECT att_name, text, num, bool FROM attributes_table WHERE product_id = ?;";
        List<Attribute> attributeList = new ArrayList<>();
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, productId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    attributeList.add(fetchAttribute(resultSet));
                }
            }
        }
        return attributeList;
    }
    
    // Not used yet
    @Override
    public List<String> findAttributeType(int productId) throws SQLException {
        sql = "SELECT type FROM attributes_table WHERE product_id = ?";
        List<String> attributesTypeList = new ArrayList<>();
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, productId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    attributesTypeList.add(resultSet.getString("type"));
                }
            }
        }
        return attributesTypeList;
    }
    
    private Attribute fetchAttribute(ResultSet resultSet) throws SQLException{
        int attId = resultSet.getInt("attribute_id");
        String name = resultSet.getString("att_name");
        String text = resultSet.getString("text");
        int num = resultSet.getInt("num");
        String bool = resultSet.getString("bool");
        return new Attribute(attId, name, text, num, bool);
    }
}
