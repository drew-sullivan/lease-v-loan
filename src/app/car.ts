export class Car {

    constructor(
        public totalPrice: number,
        public downPayment: number,
        public loanTermLength: number,
        public leaseTermLength: number,
        public leaseDeal: number,
        public timeFrame: number,
        public interestRate: number,
        public age: string,
        public gender: string
    ) { }
}
