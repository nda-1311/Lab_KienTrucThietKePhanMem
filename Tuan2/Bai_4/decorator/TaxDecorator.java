package Bai_4.decorator;

import Bai_4.Product;
import Bai_4.strategy.TaxStrategy;

/**
 * Concrete Decorator - Thêm tính năng tính thuế cho sản phẩm
 */
public class TaxDecorator extends ProductDecorator {
    private TaxStrategy taxStrategy;
    
    public TaxDecorator(Product product, TaxStrategy taxStrategy) {
        super(product);
        this.taxStrategy = taxStrategy;
    }
    
    @Override
    public String getDescription() {
        return product.getDescription() + " + " + taxStrategy.getTaxType();
    }
    
    @Override
    public double calculateTotalPrice() {
        double baseTotal = product.calculateTotalPrice();
        double tax = taxStrategy.calculateTax(baseTotal);
        return baseTotal + tax;
    }
    
    public double getTaxAmount() {
        return taxStrategy.calculateTax(product.calculateTotalPrice());
    }
}
