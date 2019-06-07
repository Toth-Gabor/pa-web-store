package com.codecool.web.model;

import java.util.Objects;

public class Product extends AbstractModel {
    
    private final String name;
    private final String brand;
    private final String specification;
    private final String description;
    private final int price;
    private final int quantity;
    private final String photoUrl;
    
    public Product(int id, String name, String brand, String specification, String description, int price, int quantity, String photoUrl) {
        super(id);
        this.name = name;
        this.brand = brand;
        this.specification = specification;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.photoUrl = photoUrl;
    }
    
    public String getName() {
        return name;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public String getSpecification() {
        return specification;
    }
    
    public String getDescription() {
        return description;
    }
    
    public int getPrice() {
        return price;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public String getPhotoUrl() {
        return photoUrl;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Product product = (Product) o;
        return price == product.price &&
                quantity == product.quantity &&
                Objects.equals(name, product.name) &&
                Objects.equals(brand, product.brand) &&
                Objects.equals(specification, product.specification) &&
                Objects.equals(description, product.description) &&
                Objects.equals(photoUrl, product.photoUrl);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, brand, specification, description, price, quantity, photoUrl);
    }
}
