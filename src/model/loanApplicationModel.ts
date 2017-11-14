export class LoanApplicationModel {
    constructor(
        public retcode: string,
        public retmsg: string,
        //public results: string,
        public results: Results // refer to type Results  below
    ){}
}

export class Results {
    constructor(
    	//Loan application
    	public fee: number,
    	public interestrate: number,
        public interestratetype: string,
        public interestamount: number,
        public loanterm: number,
        public loantermperiod: string,
        public takehome: number,
        public duedate: string,
        public totalrepayment: number,
        
        //Loan product settings
        public minloanamount: number,
        public maxloanamount: number,
        public minloanterm: number,
        public maxloanterm: number,
        
        //Loan Balances
        public loanid: number,
        public loanamount: number,
        public loanstatus: string,
        public disbursedon: string,
        public loanbalance: number,
        public nextinstallmentdate: string
    ){}
}