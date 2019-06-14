package com.codecool.web.model;

import java.sql.Timestamp;

public class Order extends AbstractModel {

    private int userId;
    private int productId;
    private int quantity;
    private Timestamp timestamp;
    
    
    public Order(int id, int userId, int productId, int quantity, Timestamp timestamp) {
        super(id);
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.timestamp = timestamp;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public int getProductId() {
        return productId;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public Timestamp getTimestamp() {
        return timestamp;
    }
}
