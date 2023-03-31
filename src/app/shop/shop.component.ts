import { Component ,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  implements OnInit {
  @ViewChild(HeaderComponent)
  myChild:any;
  products:any =[];
  searchCategory:any=[]
  user:any=localStorage.getItem('user_id')
  response:any=[]
  productname:any;
  productcate:any;
  totalsearchCategory:any=0
  selectedItems:number[]=new Array<number>();
  tot:any=""
  p:any=1;
  itemsPerPage:any=9;
  totalproduct:any;
  user_carts:any=localStorage.getItem('user_cart')
  // checks:any=true
  constructor (private service:ApiService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.router.paramMap.subscribe((param)=>{
      this.productname=param.get('keyword');
      if(this.productname!=null){
        if(this.productname.includes('_')){
          this.productcate=this.productname.replace('_', '')
          this.tot="("+this.productcate+")"
          this.service.getProductByCatName(this.tot).subscribe(data=>{
            this.products=data;
            this.totalproduct=this.products.length;
          });
          this.getProductByCategorys();
        }
        else{
          this.getListProducts();
          this.getProductByCategorys();
        }
      }
      else {
        this.getListProducts();
        this.getProductByCategorys();
      }
    });

  }
  getListProducts(){
    if(this.productname!=null){
      this.service.getProductByName(this.productname).subscribe(data=>{
        this.products=data;
        this.totalproduct=this.products.length;
      });
    }
    else{
      this.service.getProducts().subscribe(data=>{
        this.products=data;
        this.totalproduct=this.products.length;
      });
    }
    
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
  searchProduct(){
    this.service.getProductByName(this.productname).subscribe(data=>{
      this.products=data;
      this.totalproduct=this.products.length;
    });
  }
  getProductByCategorys(){
    this.service.getProductByCategory().subscribe(data=>{
      this.searchCategory=data;
      this.totalsearchCategory=0;
      for (let i = 0; i < this.searchCategory.length; i++) {
        this.totalsearchCategory+=this.searchCategory[i].sosanpham;
      }
    });
    
  }
  onChangeCat(e:any,id:any){
    if(e.target.checked){
      this.selectedItems.push(id)
    }
    else{
      this.selectedItems=this.selectedItems.filter(m=>m!=id)
    } 
    this.tot=""
    for (let i = 0; i < this.selectedItems.length; i++) {
      if(i==this.selectedItems.length-1)
      this.tot+=this.selectedItems[i];
      else this.tot+=this.selectedItems[i]+",";
    }
    if(this.tot!="")
    this.tot="("+this.tot+")"
    this.service.getProductByCatName(this.tot).subscribe(data=>{
      this.products=data;
      this.totalproduct=this.products.length;
    });
  }
  // bulk(e:any){
  //   if(e.target.checked==true) this.checks=true;
  //   else this.checks=false;
  // }
}
