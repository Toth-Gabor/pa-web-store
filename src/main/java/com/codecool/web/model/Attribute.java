package com.codecool.web.model;

public class Attribute extends AbstractModel{
    
    private String name;
    private String text;
    private int num;
    private String bool;
    
    
    public Attribute(int id, String name, String text, int num, String bool) {
        super(id);
        this.name = name;
        this.text = text;
        this.num = num;
        this.bool = bool;
    }
    
    public String getName() {
        return name;
    }
    
    public String getText() {
        return text;
    }
    
    public int getNum() {
        return num;
    }
    
    public String getBool() {
        return bool;
    }
}
