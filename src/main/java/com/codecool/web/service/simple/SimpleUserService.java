package com.codecool.web.service.simple;

import com.codecool.web.dao.UserDao;
import com.codecool.web.service.UserService;

import java.sql.SQLException;

public class SimpleUserService implements UserService {
    
    private final UserDao userDao;
    
    public SimpleUserService(UserDao userDao) {
        this.userDao = userDao;
    }
    
    @Override
    public void registerUser(String name, String email, String password) throws SQLException {
        userDao.registerUser(name, email, password);
    }
}
