import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  //addProductList:undefined | any[];
  addProductList:undefined | product[];
  productMessage:undefined | string;
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
      console.log("test",id);
      this.product.deleteProductItem(id).subscribe((result)=>{
         if(result){
            this.productMessage="Product is deleted";
            this.list();
            // this.list method is called to call list after deleting item
         }
         setTimeout(()=>(this.productMessage=undefined),3000);
      })
  }
  list(){
    this.product.productList().
    subscribe((result)=>{
        console.warn(result);
        this.addProductList=result;
    })
  }
}
