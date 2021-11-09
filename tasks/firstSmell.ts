import {ReceiptPrinter} from "./receiptPrinter";

export module firstSmell {
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
        private transactions: Array<Transaction> = new Array<Transaction>();
        private receiptPrinter: ReceiptPrinter;

        constructor(receiptPrinter:ReceiptPrinter){
            this.receiptPrinter = receiptPrinter;
        }

        settleAccount(narrative:string, amountPaid:number) {

            if (this.balance > 0) {
                //   10                20             10 or
                //  -10                20             30
                let remainingBalance = this.balance - amountPaid;

                // check if the account has been overpaid
                if (this.balance < amountPaid) {
                    this.registerRefund( Math.abs(remainingBalance) );
                } else {
                    this.transactions.push(new Transaction(narrative, amountPaid));
                    this.balance -= amountPaid
                }

                // print receipt
                this.receiptPrinter.print(`Date: ${this.name}
                         Name: ${this.name}
                         Number: ${this.number}
                         Balance: ${this.balance}
                         ${ this.balance === 0 ? "Account Settled" : "Account Open"}`);
            } else {
                throw new Error("No balance needs to be paid.");
            }
        }

        debitAccount(narrative:string, amountDebited:number) {
            this.transactions.push(new Transaction(narrative, -amountDebited));
            this.balance += amountDebited;
        }

        viewStatement() {

            let statement =
                this.transactions
                    .map(({narrative, amount})=> `${narrative}: ${amount}`)
                    .reverse()
                    .join('\n');
            return `Balance: ${this.balance}\n${statement}`;
        }

        private registerRefund(remainingBalance: number) {
            this.transactions.push(new Transaction("Refund issued", remainingBalance));
            this.balance += remainingBalance;
        }
    }
}