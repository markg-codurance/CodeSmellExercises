import {ReceiptPrinter} from "./receiptPrinter";

export module firstRefactor {
    export class PaymentDetails {
        amount: number;
        narrative: string;

        constructor(narrative: string, amount: number) {
            this.amount = amount;
            this.narrative = narrative;
        }
    }

    class Transaction {
        narrative: string;
        amount: number;

        constructor(narrative: string, amount: number) {
            this.narrative = narrative;
            this.amount = amount;
        }
    }

    export class Account {
        number: string = '';
        name: string = '';
        balance: number = 0;

        transactions: Array<Transaction> = new Array<Transaction>();
        private receiptPrinter: ReceiptPrinter;

        constructor(receiptPrinter:ReceiptPrinter) {
            this.receiptPrinter = receiptPrinter;
        }

        settleAccount(paymentDetails : PaymentDetails) {
            this.checkAccountIsSettled();
            this.updateBalance(paymentDetails);
            this.creditAccount(paymentDetails);
            this.printReceipt();
        }

        creditAccount({narrative, amount}:PaymentDetails) {
            this.transactions.push(new Transaction(narrative, amount));
            this.balance -= amount;
        }

        debitAccount({narrative, amount}:PaymentDetails) {
            this.transactions.push(new Transaction(narrative, -amount));
            this.balance += amount;
        }

        viewStatement() {
            let statement =
                this.transactions
                    .map(({narrative, amount})=> `${narrative}: ${amount}`)
                    .reverse()
                    .join('\n');
            return `Balance: ${this.balance}\n${statement}`;
        }

        private checkAccountIsSettled() {
            if (this.IsAccountAlreadySettled()) {
                throw new Error("No balance needs to be paid.");
            }
        }

        private updateBalance(paymentDetails:PaymentDetails) {
            let remainingBalance = this.getRemainingBalance(paymentDetails);
            if (this.hasOverPaid(paymentDetails.amount)) {
                this.registerRefund(remainingBalance);
                return;
            }

        }

        private printReceipt() {
            console.log(`Date: ${this.name}
                         Name: ${this.name}
                         Number: ${this.number}
                         Balance: ${0}
                         Account Settled`);
        }

        private hasOverPaid(amountPaid: number) {
            return this.balance < amountPaid;
        }

        private getRemainingBalance({amount}:PaymentDetails) {
            return this.balance - amount;
        }

        private IsAccountAlreadySettled() {
            return this.balance <= 0;
        }

        private registerRefund(remainingBalance: number) {
            this.transactions.push(new Transaction("Refund issued", remainingBalance));
            this.balance += remainingBalance;
        }
    }
}