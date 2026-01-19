package Bai_4;

import Bai_4.decorator.*;
import Bai_4.state.*;
import Bai_4.strategy.*;

/**
 * Demo class minh họa việc sử dụng các Design Patterns:
 * - Strategy Pattern: Các chiến lược tính thuế khác nhau
 * - Decorator Pattern: Thêm các tính năng (thuế, giảm giá, bảo hành) cho sản phẩm
 * - State Pattern: Quản lý trạng thái thuế của sản phẩm
 */
public class TaxCalculationDemo {
    
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("HỆ THỐNG TÍNH THUẾ SẢN PHẨM");
        System.out.println("========================================\n");
        
        // Test Case 1: Sản phẩm thông thường với VAT
        demonstrateCase1();
        
        // Test Case 2: Sản phẩm xa xỉ với thuế đặc biệt
        demonstrateCase2();
        
        // Test Case 3: Sản phẩm với nhiều decorators
        demonstrateCase3();
        
        // Test Case 4: Thay đổi trạng thái thuế
        demonstrateCase4();
        
        // Test Case 5: Kết hợp tất cả patterns
        demonstrateCase5();
        
        System.out.println("\n========================================");
        System.out.println("KẾT LUẬN");
        System.out.println("========================================");
        printConclusion();
    }
    
    private static void demonstrateCase1() {
        System.out.println("--- CASE 1: Sản phẩm thông thường với VAT ---");
        
        Product laptop = new BasicProduct("Laptop Dell", 15000000);
        System.out.println("Sản phẩm: " + laptop.getDescription());
        System.out.println("Giá gốc: " + formatMoney(laptop.getPrice()));
        System.out.println("Trạng thái: " + laptop.getState().getStateName());
        
        // Áp dụng thuế VAT 10%
        TaxDecorator laptopWithVAT = new TaxDecorator(laptop, new VATTax());
        System.out.println("\nSau khi áp dụng thuế:");
        System.out.println("Mô tả: " + laptopWithVAT.getDescription());
        System.out.println("Tiền thuế: " + formatMoney(laptopWithVAT.getTaxAmount()));
        System.out.println("Tổng tiền: " + formatMoney(laptopWithVAT.calculateTotalPrice()));
        System.out.println();
    }
    
    private static void demonstrateCase2() {
        System.out.println("--- CASE 2: Sản phẩm xa xỉ với thuế đặc biệt ---");
        
        Product rolex = new BasicProduct("Đồng hồ Rolex", 500000000);
        System.out.println("Sản phẩm: " + rolex.getDescription());
        System.out.println("Giá gốc: " + formatMoney(rolex.getPrice()));
        
        // Áp dụng thuế xa xỉ 20%
        TaxDecorator rolexWithLuxuryTax = new TaxDecorator(rolex, new LuxuryTax());
        System.out.println("\nSau khi áp dụng thuế xa xỉ:");
        System.out.println("Mô tả: " + rolexWithLuxuryTax.getDescription());
        System.out.println("Tiền thuế: " + formatMoney(rolexWithLuxuryTax.getTaxAmount()));
        System.out.println("Tổng tiền: " + formatMoney(rolexWithLuxuryTax.calculateTotalPrice()));
        System.out.println();
    }
    
    private static void demonstrateCase3() {
        System.out.println("--- CASE 3: Sản phẩm với nhiều decorators ---");
        
        Product tv = new BasicProduct("Smart TV Samsung", 20000000);
        System.out.println("Sản phẩm: " + tv.getDescription());
        System.out.println("Giá gốc: " + formatMoney(tv.getPrice()));
        
        // Áp dụng nhiều decorators
        Product tvWithWarranty = new WarrantyDecorator(tv, 3, 1000000);
        Product tvWithDiscount = new DiscountDecorator(tvWithWarranty, 0.10);
        TaxDecorator tvFinal = new TaxDecorator(tvWithDiscount, new VATTax());
        
        System.out.println("\nSau khi áp dụng: Bảo hành + Giảm giá + VAT:");
        System.out.println("Mô tả: " + tvFinal.getDescription());
        System.out.println("Tổng tiền: " + formatMoney(tvFinal.calculateTotalPrice()));
        System.out.println();
    }
    
    private static void demonstrateCase4() {
        System.out.println("--- CASE 4: Thay đổi trạng thái thuế ---");
        
        Product book = new BasicProduct("Sách giáo khoa", 100000);
        System.out.println("Sản phẩm: " + book.getDescription());
        System.out.println("Giá gốc: " + formatMoney(book.getPrice()));
        
        // Ban đầu chịu thuế đầy đủ
        TaxDecorator bookWithTax = new TaxDecorator(book, new ConsumptionTax());
        System.out.println("\n1. Trạng thái: " + book.getState().getStateName());
        System.out.println("   Thuế tiêu thụ: " + formatMoney(bookWithTax.getTaxAmount()));
        System.out.println("   Tổng tiền: " + formatMoney(bookWithTax.calculateTotalPrice()));
        
        // Chuyển sang miễn thuế (sách giáo khoa được miễn thuế)
        book.setState(new TaxExemptState());
        System.out.println("\n2. Trạng thái: " + book.getState().getStateName());
        System.out.println("   Tổng tiền: " + formatMoney(book.calculateTotalPrice()));
        
        // Chuyển sang giảm thuế
        book.setState(new ReducedTaxState());
        book.setState(new TaxableState()); // Chuyển lại để tính thuế
        TaxDecorator bookReduced = new TaxDecorator(book, new ConsumptionTax());
        System.out.println("\n3. Quay lại chịu thuế:");
        System.out.println("   Tổng tiền: " + formatMoney(bookReduced.calculateTotalPrice()));
        System.out.println();
    }
    
    private static void demonstrateCase5() {
        System.out.println("--- CASE 5: Kết hợp tất cả patterns ---");
        
        // Tạo sản phẩm
        Product smartphone = new BasicProduct("iPhone 15 Pro", 30000000);
        System.out.println("Sản phẩm: " + smartphone.getDescription());
        System.out.println("Giá gốc: " + formatMoney(smartphone.getPrice()));
        System.out.println("Trạng thái ban đầu: " + smartphone.getState().getStateName());
        
        // Scenario 1: Khách hàng thông thường
        System.out.println("\n▶ Scenario 1: Khách hàng thông thường");
        Product scenario1 = new WarrantyDecorator(smartphone, 2, 2000000);
        TaxDecorator scenario1WithTax = new TaxDecorator(scenario1, new VATTax());
        System.out.println("   Bảo hành 2 năm + VAT 10%");
        System.out.println("   Tổng tiền: " + formatMoney(scenario1WithTax.calculateTotalPrice()));
        
        // Scenario 2: Khách hàng VIP (giảm giá)
        System.out.println("\n▶ Scenario 2: Khách hàng VIP");
        Product scenario2 = new WarrantyDecorator(smartphone, 2, 2000000);
        Product scenario2Discount = new DiscountDecorator(scenario2, 0.15);
        TaxDecorator scenario2WithTax = new TaxDecorator(scenario2Discount, new VATTax());
        System.out.println("   Bảo hành 2 năm + Giảm giá 15% + VAT 10%");
        System.out.println("   Tổng tiền: " + formatMoney(scenario2WithTax.calculateTotalPrice()));
        
        // Scenario 3: Sản phẩm miễn thuế (khuyến mãi đặc biệt)
        System.out.println("\n▶ Scenario 3: Chương trình miễn thuế đặc biệt");
        smartphone.setState(new TaxExemptState());
        Product scenario3 = new WarrantyDecorator(smartphone, 1, 1000000);
        System.out.println("   Bảo hành 1 năm + Miễn thuế");
        System.out.println("   Trạng thái: " + smartphone.getState().getStateName());
        System.out.println("   Tổng tiền: " + formatMoney(scenario3.calculateTotalPrice()));
        
        System.out.println();
    }
    
    private static void printConclusion() {
        System.out.println("Qua hệ thống tính thuế sản phẩm, ta thấy:\n");
        
        System.out.println("1. STRATEGY PATTERN:");
        System.out.println("   ✓ Cho phép chuyển đổi linh hoạt giữa các chiến lược tính thuế");
        System.out.println("   ✓ Dễ dàng thêm loại thuế mới (VATTax, ConsumptionTax, LuxuryTax)");
        System.out.println("   ✓ Mỗi strategy độc lập, dễ bảo trì và mở rộng");
        
        System.out.println("\n2. DECORATOR PATTERN:");
        System.out.println("   ✓ Thêm tính năng động cho sản phẩm (thuế, giảm giá, bảo hành)");
        System.out.println("   ✓ Có thể kết hợp nhiều decorator theo thứ tự bất kỳ");
        System.out.println("   ✓ Không làm thay đổi code của lớp gốc (BasicProduct)");
        System.out.println("   ✓ Tuân thủ Open/Closed Principle");
        
        System.out.println("\n3. STATE PATTERN:");
        System.out.println("   ✓ Quản lý trạng thái thuế của sản phẩm (Chịu thuế, Miễn thuế, Giảm thuế)");
        System.out.println("   ✓ Thay đổi hành vi tính toán dựa trên trạng thái");
        System.out.println("   ✓ Code rõ ràng, dễ hiểu, tránh if-else phức tạp");
        
        System.out.println("\n4. KẾT HỢP CÁC PATTERNS:");
        System.out.println("   ✓ Hệ thống linh hoạt, có thể xử lý nhiều tình huống phức tạp");
        System.out.println("   ✓ Dễ dàng mở rộng với yêu cầu mới");
        System.out.println("   ✓ Code sạch, tuân thủ SOLID principles");
        System.out.println("   ✓ Phù hợp với hệ thống thương mại điện tử thực tế");
        
        System.out.println("\n5. ỨNG DỤNG THỰC TẾ:");
        System.out.println("   • Hệ thống bán hàng đa quốc gia (thuế khác nhau)");
        System.out.println("   • E-commerce với nhiều chương trình khuyến mãi");
        System.out.println("   • Quản lý sản phẩm có các chính sách thuế đặc biệt");
        System.out.println("   • Tính toán giá linh hoạt cho từng loại khách hàng");
    }
    
    private static String formatMoney(double amount) {
        return String.format("%,.0f VNĐ", amount);
    }
}
