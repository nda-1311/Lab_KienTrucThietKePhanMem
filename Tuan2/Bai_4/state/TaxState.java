package Bai_4.state;

import Bai_4.Product;

/**
 * State Pattern - Interface cho trạng thái thuế của sản phẩm
 */
public interface TaxState {
    double calculatePrice(Product product);
    String getStateName();
}
