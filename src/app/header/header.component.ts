import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService } from '../services/product-categories.service';
import { ProductCategories } from '../models/product-categories';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productcategories:Array<ProductCategories> =new Array<ProductCategories>();
  constructor (private pc2:ProductCategoriesService){}
  ngOnInit(): void {
    this.pc2.getProductCategories().subscribe(res=>{
      this.productcategories=res;
    })
  }
}
