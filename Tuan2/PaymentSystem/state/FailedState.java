package state;

public class FailedState implements PaymentState {
    @Override
    public void handle() {
        System.out.println("❌ Thanh toan that bai!");
    }
}
