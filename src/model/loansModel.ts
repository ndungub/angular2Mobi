export class LoansModel {
    constructor(
        public retcode: string,
        public retmsg: string,
        //public results: string,
        public results: Results // refer to type Results  below
    ){}
}

export class Results {
    constructor(
        //Loan Balances
        public loanid: number,
        public loanamount: number,
        public loanstatus: string,
        public disbursedon: string,
        public loanbalance: number,
        public nextinstallmentdate: string,
        public isactive: string,
        public loanterm: number,
        public loanrate: number,
        public totalamount: number,
        public loaninterest: number
    ){}
}