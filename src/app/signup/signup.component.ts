import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  response:any=[]
  username:any;
  email:any;
  password:any;
  constructor(private service:ApiService){}
  ngOnInit(){

  }
  signupUser(){
    var val={
      username:this.username,
      email:this.email,
      password:this.password
    };
    this.service.addUsers(val).subscribe(res=>{
      this.response=res;

      // if(this.response[0]!=null){
        alert("Tạo tài khoản thành công")
      window.location.href="http://localhost:4200/login";
      // }
      // else{
      //   alert("Tạo tài khoản không thành công")
      // }

      
    })

  }
}
