import {ReceiptPrinter} from "../receiptPrinter";
import {firstSmell} from "../firstSmell";
import Account = firstSmell.Account;

describe("When settling an account", () => {
    it("should not need settlement if the balance is zero", () => {
        const account = new Account(new ReceiptPrinter());
        expect(() =>
            account.settleAccount("Pay 50", 50)
        ).toThrow(new Error("No balance needs to be paid."))
    });

    it("should have a balance of 10 if 10 is paid from initial 20 balance", () => {
        const account = new Account(new ReceiptPrinter());
        account.debitAccount("new purchase", 20);
        account.settleAccount("Pay 10", 10)

        expect(account.balance).toEqual(10);
    });

    it("should have a balance of 0 if 10 is paid from initial 10 balance", () => {
        const account = new Account(new ReceiptPrinter());
        account.debitAccount("new purchase", 10);
        account.settleAccount("Pay 10", 10)

        expect(account.balance).toEqual(0);
    });

    it("should display a statement of transactions when requested", () => {
        const account = new Account(new ReceiptPrinter());
        account.debitAccount("new purchase", 10);
        account.debitAccount("new purchase", 5);
        account.debitAccount("new purchase", 25);
        expect(account.viewStatement()).toEqual(
            `Balance: 40\nnew purchase: -25\nnew purchase: -5\nnew purchase: -10`
        )
    });
});