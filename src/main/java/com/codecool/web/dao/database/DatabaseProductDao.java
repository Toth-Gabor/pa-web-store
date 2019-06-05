package com.codecool.web.dao.database;

import com.codecool.web.dao.ProductDao;
import com.codecool.web.model.Product;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseProductDao extends AbstractDao implements ProductDao {
    DatabaseProductDao(Connection connection) {
        super(connection);
    }
    
    @Override
    public List<Product> findAll() throws SQLException {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT product_id, product_name, brand, specification, description, price, photo_url FROM products;";
        return null;
    }
    
    @Override
    public Product findByProductId(int productId) throws SQLException {
        return null;
    }
    
    private Product fetchProduct(ResultSet resultSet) throws SQLException{
        int productId = resultSet.getInt("product_id");
        String productName = resultSet.getString("product_name");
        String brand = resultSet.getString("brand");
        String specification = resultSet.getString("specification");
        String description = resultSet.getString("description");
        int price = resultSet.getInt("price");
        String photoUrl = resultSet.getString("");
        return new Product(productId, productName, brand, specification, description, price, photoUrl);
    }
}
