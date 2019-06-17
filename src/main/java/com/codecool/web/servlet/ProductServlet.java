package com.codecool.web.servlet;

import com.codecool.web.dao.AttributeDao;
import com.codecool.web.dao.ProductDao;
import com.codecool.web.dao.database.DatabaseAttributeDao;
import com.codecool.web.dao.database.DatabaseProductDao;
import com.codecool.web.service.ProductService;
import com.codecool.web.service.simple.SimpleProductService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet("/product")
public class ProductServlet extends AbstractServlet {
    
    private static final String SQL_ERROR_CODE_UNIQUE_VIOLATION = "23505";
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
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
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = getConnection(req.getServletContext())){
            String productId = req.getParameter("productId");
            String name = req.getParameter("name");
            String brand = req.getParameter("brand");
            String spec = req.getParameter("spec");
            String desc = req.getParameter("desc");
            String price = req.getParameter("price");
            String quantity = req.getParameter("quantity");
            String photoUrl = req.getParameter("photoUrl");
            
            ProductDao productDao = new DatabaseProductDao(connection);
            AttributeDao attributeDao = new DatabaseAttributeDao(connection);
            ProductService productService = new SimpleProductService(productDao, attributeDao);
            
            productService.updateProductInDb(productId, name, brand, spec, desc, price, quantity, photoUrl);
            sendMessage(resp, HttpServletResponse.SC_OK, productId);
        
        } catch (SQLException e) {
            handleSqlError(resp, e);
        }
    }
}
