package Bai_4.strategy;

/**
 * Concrete Strategy - Thuế Tiêu Thụ 5%
 */
public class ConsumptionTax implements TaxStrategy {
    private static final double CONSUMPTION_TAX_RATE = 0.05; // 5%
    
    @Override
    public double calculateTax(double price) {
        return price * CONSUMPTION_TAX_RATE;
    }
    
    @Override
    public String getTaxType() {
        return "Thuế Tiêu Thụ (5%)";
    }
}
