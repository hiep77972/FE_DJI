import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  @ViewChild(HeaderComponent)
  myChild:any;
  detailproduct:any;
  listdetailproduct:any=[]
  id:number=0;
  listother:any=[]
  user:any=localStorage.getItem('user_id')
  product=0
  name:any=""
  price:any=0
  quantity:any=0
  response:any=[]
  user_carts:any=localStorage.getItem('user_cart')
  constructor (private service:ApiService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.getDetailProduct();
    this.getOtherProducts();
  }

  getDetailProduct(){
    this.service.getDeTailProduct(this.id).subscribe(res=>{
      this.listdetailproduct=res;
      this.detailproduct=this.listdetailproduct[0];
    })
  }
  getOtherProducts(){
    this.service.getProducts().subscribe(data=>{
    this.listother=data;
  });
  }

  AddCart(){ 
    if(this.user!=null){
    var val={
      userid:this.user,
      productid:this.detailproduct.id,
      name:this.detailproduct.name,
      price:this.detailproduct.price,
      quantity:this.quantity
    };

    this.service.getIsCart(this.user,this.detailproduct.id).subscribe(res=>{
      this.response=res;
      if(this.response[0]!=null){
        val.quantity=Number.parseInt(val.quantity)+Number.parseInt(this.response[0].quantity);
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
      this.user_carts=Number.parseInt(this.user_carts)+Number.parseInt(this.quantity)
        localStorage.setItem('user_cart',this.user_carts)
        this.myChild.countCart=this.user_carts;
    });
  }
  else alert("Vui lòng đăng nhập để tiếp tục")
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
  getOtherDetail(id1:number){
    this.service.getDeTailProduct(id1).subscribe(res=>{
      this.listdetailproduct=res;
      this.detailproduct=this.listdetailproduct[0];
    })
  }
}
