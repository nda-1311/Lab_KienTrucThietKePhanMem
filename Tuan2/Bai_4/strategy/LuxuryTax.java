package Bai_4.strategy;

/**
 * Concrete Strategy - Thuế Đặc Biệt cho Hàng Xa Xỉ 20%
 */
public class LuxuryTax implements TaxStrategy {
    private static final double LUXURY_TAX_RATE = 0.20; // 20%
    
    @Override
    public double calculateTax(double price) {
        return price * LUXURY_TAX_RATE;
    }
    
    @Override
    public String getTaxType() {
        return "Thuế Xa Xỉ (20%)";
    }
}
