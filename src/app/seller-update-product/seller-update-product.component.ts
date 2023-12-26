import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from 'src/datatype';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productMessage:undefined|string;
  productData:undefined | product
  constructor(private route:ActivatedRoute, private product:ProductService){}
  ngOnInit(){
    //below code is for populating/prefilling/collecting product information by passing id
    let productId=this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
      this.productData=result;
    })
  }
  submit(data:product){
     console.log(data);
     console.log(data.name);
     console.log(data.description);
     //below if block is for assigning id to data from productdata
     if(this.productData){
      data.id=this.productData.id
     }
     this.product.updateProduct(data).subscribe((result)=>{
         console.warn(result);
         if(result){
           this.productMessage="Product has updated";
         }
     })
     setTimeout(()=>{
       this.productMessage=undefined
     },3000)
  }



}
