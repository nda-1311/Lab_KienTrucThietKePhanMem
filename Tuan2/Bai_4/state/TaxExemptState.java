package Bai_4.state;

import Bai_4.Product;

/**
 * Concrete State - Sản phẩm miễn thuế
 */
public class TaxExemptState implements TaxState {
    @Override
    public double calculatePrice(Product product) {
        // Sản phẩm miễn thuế - chỉ trả giá gốc
        return product.getPrice();
    }
    
    @Override
    public String getStateName() {
        return "Miễn thuế";
    }
}
