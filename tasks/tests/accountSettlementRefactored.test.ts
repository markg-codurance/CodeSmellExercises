import {ReceiptPrinter} from "../receiptPrinter";
import {firstRefactor} from "../firstRefactor";

module refactoredTests {
    import Account = firstRefactor.Account;
    import PaymentDetails = firstRefactor.PaymentDetails;
    describe("When settling an account (refactored)", () => {
        it("should not need settlement if the balance is zero", () => {
            const account = new Account(new ReceiptPrinter());
            let paymentDetails = new PaymentDetails("Pay 50", 50);
            expect(() =>
                account.settleAccount(paymentDetails)
            ).toThrow(new Error("No balance needs to be paid."))
        });

        it("should have a balance of 10 if 10 is paid from initial 20 balance (refactored)", () => {
            const account = new Account(new ReceiptPrinter());
            account.debitAccount(new PaymentDetails("new purchase", 20));
            account.creditAccount(new PaymentDetails("Pay 10", 10));

            expect(account.balance).toEqual(10);
        });

        it("should have a balance of 0 if 10 is paid from initial 10 balance (refactored)", () => {
            const account = new Account(new ReceiptPrinter());
            account.debitAccount(new PaymentDetails("new purchase", 10));
            account.settleAccount(new PaymentDetails("Pay 10", 10))

            expect(account.balance).toEqual(0);
        });

        it("should display a statement of transactions when requested (refactored)", () => {
            const account = new Account(new ReceiptPrinter());
            account.debitAccount(new PaymentDetails("new purchase", 10));
            account.debitAccount(new PaymentDetails("new purchase", 5));
            account.debitAccount(new PaymentDetails("new purchase", 25));
            expect(account.viewStatement()).toEqual(
                `Balance: 40\nnew purchase: -25\nnew purchase: -5\nnew purchase: -10`
            )
        });
    });
}