package com.codecool.web.model;

import java.util.Objects;

public final class User extends AbstractModel {
    
    private final String name;
    private final String email;
    private final String password;
    private final Boolean isAdmin;
    
    public User(int id, String name, String email, String password, Boolean isAdmin) {
        super(id);
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    
    public String getName() {
        return name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public Boolean getAdmin() {
        return isAdmin;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(email, user.email) &&
            Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, email, password, isAdmin);
    }
}
