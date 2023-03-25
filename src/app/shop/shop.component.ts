import { Component ,OnInit} from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent  implements OnInit {
  products:any =[];

  constructor (private service:ApiService){}
  ngOnInit(): void {
    this.getListProducts();
  }
  getListProducts(){
    this.service.getProducts().subscribe(data=>{
    this.products=data;
  });
  }
}
