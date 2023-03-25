import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  response:any=[]
  username:any;
  email:any;
  password:any;
  
  constructor(private service:ApiService,private router:Router){}
  ngOnInit(){

  }
  loginUser(){
    var val={
      username:this.username,
      password:this.password
    };
    this.service.getUsers(val).subscribe(res=>{
      this.response=res;
      if(this.response[0]!=null){
        alert("Đăng nhập thành công")
        localStorage.setItem('user_id',this.response[0].id)
        this.router.navigate(['/']);
        // window.location.href="http://localhost:4200";
      }
      else{
        alert("Nhập sai tài khoản hoặc mật khẩu")
      }
    })
    
    
  }
}
