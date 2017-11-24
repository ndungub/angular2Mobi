export class RequestModel {
    constructor(
        public retcode: string,
        public retmsg: string,
        //public results: string,
        public results: Results // refer to type Results  below
    ){}
}

export class Results {
    constructor(
    	public mobileno: string,
    	public name: string,
        public idno: string,
        public idtypedesc: string,
        public medal: string,
        public eligibleamount: string,
        public loanlimit: string,
        public requirepinchange: number
    ){}
}