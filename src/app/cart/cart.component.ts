import { Component ,OnInit,ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @ViewChild(HeaderComponent)
  myChild:any;
  carts:any =[];
  id:number=0;
  total:any=0;
  user:any=localStorage.getItem('user_id')
  response:any=[]
  cart_byid:any=[]
  list_orders:any=[]
  order:any;
  id_order:any=0;
  user_carts:any=localStorage.getItem('user_cart')
  constructor (private service:ApiService,private router:ActivatedRoute){}
  ngOnInit(): void {
    // this.id=this.router.snapshot.params['id'];
    this.getCarts();
  }
  getCarts(){
    this.service.getCart(this.user).subscribe(data=>{
    this.carts=data;
    for (let i = 0; i < this.carts.length; i++) {
      this.total+=this.carts[i].price*this.carts[i].quantity;
    }
  });
  }
  removeCarts(id:number){

    this.service.getCountCartById(id).subscribe(data=>{
      this.cart_byid=data;
      this.user_carts=Number.parseInt(this.user_carts)-Number.parseInt(this.cart_byid[0].quantity);
        localStorage.setItem('user_cart',this.user_carts)
        this.myChild.countCart=this.user_carts;

      this.service.deleteCart(id).subscribe(res=>{
        alert("Xóa thành công");
        this.total=0;
        this.getCarts();
      })
    });

    
  }
  removeAllCarts(){
    this.service.deleteAllCart(this.user).subscribe(res=>{
      this.user_carts=0;
        localStorage.setItem('user_cart',this.user_carts)
        this.myChild.countCart=this.user_carts;
      this.total=0;
      this.getCarts();
    })
  }
  addOrders(){
    this.service.addOrders(this.user).subscribe(res=>{})
  }
  checkOut(){

    this.service.getIsOrder(this.user).subscribe(res=>{
      this.response=res;
      if(this.response[0]!=null){
        this.getAllOrders();
        this.removeAllCarts();
      }
      else{
        this.service.addOrders(this.user).subscribe(res=>{
          this.getAllOrders();
        })
        this.removeAllCarts();
      }
    })
  }
  
  getAllOrders(){
    this.service.getOrder(this.user).subscribe(res=>{
      this.list_orders=res;
      if(this.list_orders[0]!=null){

        this.order=this.list_orders[0];
        this.id_order=this.order.id;
      }
      else alert("Có lỗi xảy ra vui lòng thử lại")
      

      for (let i = 0; i < this.carts.length; i++) {

        var val={
          orderid:this.id_order,
          productid:this.carts[i].productId,
          name:this.carts[i].name,
          price:this.carts[i].price,
          quantity:this.carts[i].quantity,
        };
        this.service.addOrderDetails(val).subscribe(res=>{

        })
        
      }

    })
  }

}
