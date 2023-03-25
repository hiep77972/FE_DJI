import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productcategories:any =[];
  table:any=[]
  countCart:any=0;
  user:any=localStorage.getItem('user_id')
  constructor (private service:ApiService){}
  ngOnInit(): void {
    this.getListProductCategories();
    this.getCount();
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
  }
  getCount(){
    // this.service.getCountCart(1).subscribe(res=>{
    //   this.table=res
    // })
    // alert(this.table);
    // if(this.table[0].count>=1){
    //   this.countCart=this.table[0].Count
    // }else this.countCart=0
  }

}
