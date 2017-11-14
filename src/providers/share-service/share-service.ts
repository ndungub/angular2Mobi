import { Injectable } from '@angular/core';

/*
Generated class for the ShareServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
*/

@Injectable()
export class ShareServiceProvider {
     
    loginSessionMobileNo: string;
    isloginSession: boolean;
	
	fullNames: string;
	idno: string;
	idtypedesc: string;
	medal: string;
	eligibleamount: number;

	loanid: number;
	loanamount: number;
	loanstatus: string;
	disbursedon: string;
	loanbalance: number;
	nextinstallmentdate: string;
 
    constructor() {
        this.loginSessionMobileNo = '';
        this.isloginSession = false;
        this.idno = '';
        this.idtypedesc = '';
        this.medal = '';
        this.eligibleamount = 0;
    }
  
    //Session Mobile Number
    setLoginSessionMobileNo(loginSessionMobileNo) {
        this.loginSessionMobileNo = loginSessionMobileNo;      
    }
  
    getLoginSessionMobileNo() {
        return this.loginSessionMobileNo;
    }
    
    //is Login active
    setIsloginSession(isloginSession) {
        this.isloginSession = isloginSession;      
    }
  
    getIsloginSession() {
        return this.isloginSession;
    }  
    
    //Get full names
    setFullNames(fullNames) {
        this.fullNames = fullNames;       
    }
  
    getFullNames() {
        return this.fullNames;
    }  
    
    //get ID number
    setIdno(idno) {
        this.idno = idno;       
    }
  
    getIdno() {
        return this.idno;
    }  
    
    //Identification type
    setIdTypeDesc(idtypedesc) {
        this.idtypedesc = idtypedesc;       
    }
  
    getIdTypeDesc() {
        return this.idtypedesc;
    }  
    
    //customer medal
    setMedal(medal) {
        this.medal = medal;       
    }
  
    getMedal() {
        return this.medal;
    }  
    
    //Eligibility Amount
    setEligibleAmount(eligibleamount) {
        this.eligibleamount = eligibleamount;       
    }
  
    getEligibleAmount() {
        return this.eligibleamount;
    }  

 
    //Loan ID
    setLoanid(loanid) {
        this.loanid = loanid;       
    }
  
    getLoanid() {
        return this.loanid;
    }  
    //loan Balance Amount
    setLoanamount(loanamount) {
        this.loanamount = loanamount;       
    }
  
    getLoanamount() {
        return this.loanamount;
    }  
    //Loan Balance Status
    setLoanstatus(loanstatus) {
        this.loanstatus = loanstatus;       
    }
  
    getLoanstatus() {
        return this.loanstatus;
    }  
    //loan balance disbursed on
    setDisbursedon(disbursedon) {
        this.disbursedon = disbursedon;       
    }
  
    getDisbursedon() {
        return this.disbursedon;
    }  
    //Loan balance
    setLoanbalance(loanbalance) {
        this.loanbalance = loanbalance;       
    }
  
    getLoanbalance() {
        return this.loanbalance;
    }  
    //Next installment
    setNextInstallmentDate(nextinstallmentdate) {
        this.nextinstallmentdate = nextinstallmentdate;       
    }
  
    getNextInstallmentDate() {
        return this.nextinstallmentdate;
    }  
}