package Bai_4;

import Bai_4.state.TaxState;

/**
 * Component Interface cho Decorator Pattern
 */
public interface Product {
    String getDescription();
    double getPrice();
    double calculateTotalPrice();
    void setState(TaxState state);
    TaxState getState();
}
