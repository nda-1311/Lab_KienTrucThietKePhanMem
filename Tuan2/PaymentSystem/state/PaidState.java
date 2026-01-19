package state;

public class PaidState implements PaymentState {
    @Override
    public void handle() {
        System.out.println("✅ Thanh toan thanh cong!");
    }
}
