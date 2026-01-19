package state;

public class PendingState implements PaymentState {
    @Override
    public void handle() {
        System.out.println("⏳ Dang cho thanh toan...");
    }
}
