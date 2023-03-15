import { Component } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
   
  
  getDataemp:any;
   formvalue !:FormGroup
   showAdd!:boolean;
   updateShow!:boolean;
   employeeModelObj: EmployeeModel =new EmployeeModel()
   constructor(private fb:FormBuilder, private api:ApiService){}

   ngOnInit(){
    this.getEmp();
     this.formvalue = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
     })
   }

   clickAddEmp(){
    this.formvalue.reset();
    this.showAdd =true;
    this.updateShow = false;
   }
   postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formvalue.value.firstName;
    this.employeeModelObj.lastName = this.formvalue.value.lastName;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.salary = this.formvalue.value.salary;

    this.api.postEmployee(this.formvalue.value).subscribe(res=>{
      console.log(res);
      alert('employee added successfuly!')
      this.formvalue.reset();
      this.getEmp();
     let ref = document.getElementById('cancel')
     ref?.click()
    }, err=>{
      alert('something is went wrong')
    })
   }

   getEmp(){
    this.api.getEmployee().subscribe(res=>{
      this.getDataemp = res;
    })
   }
   deleteEmp(emp:any){
    this.api.deleteEmployee(emp.id).subscribe(res=>{
      alert('emp deleted')
      this.getEmp();
    })
   }
   onEdit(row:any){
    this.showAdd =false;
    this.updateShow = true;

    this.employeeModelObj.id =row.id;
     this.formvalue.controls['firstName'].setValue(row.firstName);
     this.formvalue.controls['lastName'].setValue(row.lastName);
     this.formvalue.controls['email'].setValue(row.email);
     this.formvalue.controls['mobile'].setValue(row.mobile);
     this.formvalue.controls['salary'].setValue(row.salary);
   }

   updateEmployeeDetails(){
    
    this.employeeModelObj.firstName = this.formvalue.value.firstName;
    this.employeeModelObj.lastName = this.formvalue.value.lastName;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.salary = this.formvalue.value.salary;

    this.api.udpateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{

      alert('udpated succeffulys');
      this.formvalue.reset();
      this.getEmp();
     let ref = document.getElementById('cancel')
     ref?.click()
    })
   }
}
