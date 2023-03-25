import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
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
    });


  }
}
