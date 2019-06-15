package com.codecool.web.servlet;

import com.codecool.web.dao.OrderDao;
import com.codecool.web.dao.database.DatabaseOrderDao;
import com.codecool.web.service.OrderService;
import com.codecool.web.service.simple.SimpleOrderService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class OrdersServlet extends AbstractServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (Connection connection = getConnection(req.getServletContext())){
            OrderDao orderDao = new DatabaseOrderDao(connection);
            OrderService orderService = new SimpleOrderService(orderDao);
            sendMessage(resp, HttpServletResponse.SC_OK, orderService.getAllOrders());
        } catch (SQLException e) {
            handleSqlError(resp, e);
        }
    }
    
    
}
