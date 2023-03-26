import { Component ,OnInit} from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  implements OnInit {
  products:any =[];
  user:any=localStorage.getItem('user_id')
  response:any=[]
  constructor (private service:ApiService){}
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts(){
    this.service.getProducts().subscribe(data=>{
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
      });
    }
    else alert("Vui lòng đăng nhập để tiếp tục")
  }
}
