package com.codecool.web.model;

public class Cart {
    
    private int productId;
    private String name;
    private int price;
    private int Quantity;
    private int userId;
    
    public int getProductId() {
        return productId;
    }
    
    public String getName() {
        return name;
    }
    
    public int getPrice() {
        return price;
    }
    
    public int getQuantity() {
        return Quantity;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public Cart(int productId, String name, int price, int quantity, int userId) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        Quantity = quantity;
        this.userId = userId;
    }
}
