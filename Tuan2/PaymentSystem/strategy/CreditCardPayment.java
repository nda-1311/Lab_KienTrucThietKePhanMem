package strategy;

public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("💳 Thanh toan bang THE TIN DUNG: " + amount);
    }
}
