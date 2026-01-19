package Bai_4.strategy;

/**
 * Concrete Strategy - Thuế Giá Trị Gia Tăng (VAT) 10%
 */
public class VATTax implements TaxStrategy {
    private static final double VAT_RATE = 0.10; // 10%
    
    @Override
    public double calculateTax(double price) {
        return price * VAT_RATE;
    }
    
    @Override
    public String getTaxType() {
        return "VAT (10%)";
    }
}
