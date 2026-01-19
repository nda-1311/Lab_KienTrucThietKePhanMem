package Bai_4.decorator;

import Bai_4.Product;

/**
 * Concrete Decorator - Thêm tính năng giảm giá cho sản phẩm
 */
public class DiscountDecorator extends ProductDecorator {
    private double discountPercentage;
    
    public DiscountDecorator(Product product, double discountPercentage) {
        super(product);
        this.discountPercentage = discountPercentage;
    }
    
    @Override
    public String getDescription() {
        return product.getDescription() + " - Giảm giá " + (discountPercentage * 100) + "%";
    }
    
    @Override
    public double calculateTotalPrice() {
        double baseTotal = product.calculateTotalPrice();
        return baseTotal * (1 - discountPercentage);
    }
    
    public double getDiscountAmount() {
        return product.calculateTotalPrice() * discountPercentage;
    }
}
