package Bai_4.decorator;

import Bai_4.Product;

/**
 * Concrete Decorator - Thêm tính năng bảo hành cho sản phẩm
 */
public class WarrantyDecorator extends ProductDecorator {
    private int warrantyYears;
    private double warrantyCost;
    
    public WarrantyDecorator(Product product, int warrantyYears, double warrantyCost) {
        super(product);
        this.warrantyYears = warrantyYears;
        this.warrantyCost = warrantyCost;
    }
    
    @Override
    public String getDescription() {
        return product.getDescription() + " + Bảo hành " + warrantyYears + " năm";
    }
    
    @Override
    public double calculateTotalPrice() {
        return product.calculateTotalPrice() + warrantyCost;
    }
}
