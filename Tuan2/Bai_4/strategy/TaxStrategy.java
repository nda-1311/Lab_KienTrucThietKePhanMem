package Bai_4.strategy;

/**
 * Strategy Pattern - Interface cho các chiến lược tính thuế
 */
public interface TaxStrategy {
    double calculateTax(double price);
    String getTaxType();
}
