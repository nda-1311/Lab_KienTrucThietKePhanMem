package Bai_4.decorator;

import Bai_4.Product;
import Bai_4.state.TaxState;

/**
 * Decorator Pattern - Base Decorator cho sản phẩm
 */
public abstract class ProductDecorator implements Product {
    protected Product product;
    
    public ProductDecorator(Product product) {
        this.product = product;
    }
    
    @Override
    public String getDescription() {
        return product.getDescription();
    }
    
    @Override
    public double getPrice() {
        return product.getPrice();
    }
    
    @Override
    public double calculateTotalPrice() {
        return product.calculateTotalPrice();
    }
    
    @Override
    public void setState(TaxState state) {
        product.setState(state);
    }
    
    @Override
    public TaxState getState() {
        return product.getState();
    }
}
