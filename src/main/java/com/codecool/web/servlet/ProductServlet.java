package com.codecool.web.servlet;

import com.codecool.web.dao.AttributeDao;
import com.codecool.web.dao.ProductDao;
import com.codecool.web.dao.database.DatabaseAttributeDao;
import com.codecool.web.dao.database.DatabaseProductDao;
import com.codecool.web.dto.ProductDto;
import com.codecool.web.model.Attribute;
import com.codecool.web.model.Product;
import com.codecool.web.service.ProductService;
import com.codecool.web.service.simple.SimpleProductService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/product")
public class ProductServlet extends  AbstractServlet {
    
    private static final String SQL_ERROR_CODE_UNIQUE_VIOLATION = "23505";
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = getConnection(req.getServletContext())){
            String productId = req.getParameter("productId");
            ProductDao productDao = new DatabaseProductDao(connection);
            AttributeDao attributeDao = new DatabaseAttributeDao(connection);
            ProductService productService = new SimpleProductService(productDao, attributeDao);
            sendMessage(resp, HttpServletResponse.SC_OK, productService.getProductWithAttributes(productId));
        
        } catch (SQLException e) {
            handleSqlError(resp, e);
        }
    }
}
