import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  @ViewChild(HeaderComponent)
  myChild:any;
  products:any =[];
  user:any=localStorage.getItem('user_id')
  user_carts:any=localStorage.getItem('user_cart')
  response:any=[]
  productcate:any;
  totalproductcate:any;
  dji_product:any;
  phantom_product:any;
  inspire_product:any;
  constructor (private service:ApiService){}
  ngOnInit(): void {
    this.getListProducts();
    this.getProductByCategorys();
  }

  getListProducts(){
    this.service.getTopProducts().subscribe(data=>{
    this.products=data;
  });
  }
  addToCart(id1:number,name1:string,price1:number){
    if(this.user!=null){
      var val={
        userid:this.user,
        productid:id1,
        name:name1,
        price:price1,
        quantity:1
      };
  
      this.service.getIsCart(this.user,id1).subscribe(res=>{
        this.response=res;
        if(this.response[0]!=null){
          val.quantity=val.quantity+Number.parseInt(this.response[0].quantity);
          this.service.updateCart(val).subscribe(res=>{
            this.response=res;
            
              alert("Thêm giỏ hàng thành công")
            
          })
        }
        else{
          this.service.addCarts(val).subscribe(res=>{
            this.response=res;
            
              alert("Thêm giỏ hàng thành công")
            
          })
        }
        this.user_carts=Number.parseInt(this.user_carts)+1
        localStorage.setItem('user_cart',this.user_carts)
        this.myChild.countCart=this.user_carts;

      });

    }
    else alert("Vui lòng đăng nhập để tiếp tục")
  }
  getProductByCategorys(){
    this.service.getProductByCategory().subscribe(data=>{
      this.productcate=data;
      this.totalproductcate=0;
      for (let i = 0; i < this.productcate.length; i++) {
        if(this.productcate[i].name=="DJI"){
          this.dji_product=this.productcate[i];
 
        }
        else if(this.productcate[i].name=="Phantom"){
          this.phantom_product=this.productcate[i];

        }
        else if(this.productcate[i].name=="Inspire"){
          this.inspire_product=this.productcate[i];
        }
      }
    });
    
  }
}
