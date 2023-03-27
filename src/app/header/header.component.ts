import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productcategories:any =[];
  table:any=[]
  countCart:any=0;
  productname:any
  user:any=localStorage.getItem('user_id')
  user_carts:any=localStorage.getItem('user_cart')

  constructor (private service:ApiService,private router:Router){}
  ngOnInit(): void {
    this.getListProductCategories();
    if(this.user!=null){
      this.getCount();
    }

    
  }

  getListProductCategories(){
    this.service.getProductCategories().subscribe(data=>{
    this.productcategories=data;
  });
  }

  get_session_user_id(){
    return localStorage.getItem('user_id');
  }
  remove_session_user_id(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  getCount(){
    this.countCart=this.user_carts
    // this.service.getCountCart(1).subscribe(res=>{
    //   this.table=res
    // })
    // alert(this.table);
    // if(this.table[0].count>=1){
    //   this.countCart=this.table[0].Count
    // }else this.countCart=0
  }
  searchProduct(){
    // this.router.navigate(['/shop/'+this.productname]);
    this.router.navigate(['/shop']);
  }
}
