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
    	public fee: number,
    	public interestrate: number,
        public interestratetype: string,
        public interestamount: number,
        public loanterm: number,
        public loantermperiod: string,
        public takehome: number,
        public duedate: string,
        public totalrepayment: number,
        
        public minloanamount: number,
        public maxloanamount: number,
        public minloanterm: number,
        public maxloanterm: number,
    ){}
}