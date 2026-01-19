package Bai_4;

import Bai_4.state.TaxState;
import Bai_4.state.TaxableState;

/**
 * Concrete Component - Sản phẩm cơ bản
 */
public class BasicProduct implements Product {
    private String name;
    private double basePrice;
    private TaxState state;
    
    public BasicProduct(String name, double basePrice) {
        this.name = name;
        this.basePrice = basePrice;
        this.state = new TaxableState(); // Mặc định là chịu thuế
    }
    
    @Override
    public String getDescription() {
        return name;
    }
    
    @Override
    public double getPrice() {
        return basePrice;
    }
    
    @Override
    public double calculateTotalPrice() {
        return state.calculatePrice(this);
    }
    
    @Override
    public void setState(TaxState state) {
        this.state = state;
    }
    
    @Override
    public TaxState getState() {
        return state;
    }
}
