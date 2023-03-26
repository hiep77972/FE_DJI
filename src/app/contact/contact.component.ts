import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  response:any=[]
  name:any;
  email:any;
  subject:any;
  message:any;
  constructor(private service:ApiService){}
  ngOnInit(){

  }
  addContacts(){
    var val={
      name:this.name,
      email:this.email,
      subject:this.subject,
      message:this.message
    };
    alert(this.name+" "+this.email+" "+this.subject+" "+this.message)
    this.service.addContact(val).subscribe(res=>{
      this.response=res;
        alert("cảm ơn bạn đã gửi hỗ trợ")

    })
  }
}
