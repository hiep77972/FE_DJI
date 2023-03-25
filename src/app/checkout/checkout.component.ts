import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit{
  user:any=localStorage.getItem('user_id')
  user_order:any=[]
  total:any=0
  response:any=[]
  customername:any;
  customeraddress:any;
  customeremail:any;
  customerphone:any;
  payment:any;
  constructor (private service:ApiService,private router:Router){}
  ngOnInit(): void {
    this.getUserOrders();
  }
  getUserOrders(){
    this.service.getUserOrder(this.user).subscribe(data=>{
      this.user_order=data;

      for (let i = 0; i < this.user_order.length; i++) {
        this.total+=this.user_order[i].price*this.user_order[i].quantity;
      }

    });
  }
  placeOrder(){
    var val={
      userid:this.user,
      customername:this.customername,
      customeraddress:this.customeraddress,
      customeremail:this.customeremail,
      customerphone:this.customerphone,
      payment:this.payment,
    };
    
    this.service.updateOrder(val).subscribe(res=>{
      this.response=res;
        alert("Thanh toán thành công")
        this.router.navigate(['/']);
    })

  }
}
