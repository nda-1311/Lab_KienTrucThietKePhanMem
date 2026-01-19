package Bai_4.state;

import Bai_4.Product;

/**
 * Concrete State - Sản phẩm chịu thuế đầy đủ
 */
public class TaxableState implements TaxState {
    @Override
    public double calculatePrice(Product product) {
        // Giá gốc, thuế sẽ được thêm qua Decorator
        return product.getPrice();
    }
    
    @Override
    public String getStateName() {
        return "Chịu thuế đầy đủ";
    }
}
