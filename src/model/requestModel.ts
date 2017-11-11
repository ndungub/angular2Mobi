/*export class RequestModel {
   retcode: string;
   retmsg: string;
   //results: string;
   results: Results;
   constructor() {}
   
   export class Results {
	   public name: string;
       public idno: string;
   }
   constructor(){}
} */

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
        public eligibleamount: string
    ){}
}