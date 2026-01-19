package Bai_4.state;

import Bai_4.Product;

/**
 * Concrete State - Sản phẩm giảm thuế 50%
 */
public class ReducedTaxState implements TaxState {
    private static final double TAX_REDUCTION = 0.50; // Giảm 50%
    
    @Override
    public double calculatePrice(Product product) {
        // Giá gốc - thuế sẽ được giảm 50% khi áp dụng qua Decorator
        return product.getPrice();
    }
    
    @Override
    public String getStateName() {
        return "Giảm thuế 50%";
    }
    
    public double getTaxReduction() {
        return TAX_REDUCTION;
    }
}
